/*
  # Content Management System Tables

  1. New Tables
    - `content_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `content` (text)
      - `type` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `content_analytics`
      - `id` (uuid, primary key)
      - `content_id` (uuid, references content_items)
      - `views` (integer)
      - `likes` (integer)
      - `shares` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own content
*/

-- Content Items Table
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Content Analytics Table
CREATE TABLE IF NOT EXISTS content_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for content_items
CREATE POLICY "Users can create their own content"
  ON content_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own content"
  ON content_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own content"
  ON content_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content"
  ON content_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for content_analytics
CREATE POLICY "Users can view analytics for their content"
  ON content_analytics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM content_items
      WHERE content_items.id = content_analytics.content_id
      AND content_items.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update analytics for their content"
  ON content_analytics
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM content_items
      WHERE content_items.id = content_analytics.content_id
      AND content_items.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM content_items
      WHERE content_items.id = content_analytics.content_id
      AND content_items.user_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE TRIGGER set_content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_content_analytics_updated_at
  BEFORE UPDATE ON content_analytics
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Trigger to create analytics entry when content is created
CREATE OR REPLACE FUNCTION create_analytics_for_content()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.content_analytics (content_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_analytics_after_content_creation
  AFTER INSERT ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION create_analytics_for_content();