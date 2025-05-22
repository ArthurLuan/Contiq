import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import { Configuration, OpenAIApi } from "npm:openai@4.24.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ScriptRequest {
  topic: string;
  platform: string;
  videoLength: number;
  tone: string;
  contentStyle: string;
  references: Array<{
    type: string;
    url: string;
    title: string;
  }>;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { topic, platform, videoLength, tone, contentStyle, references } = await req.json() as ScriptRequest;

    // Basic input validation
    if (!topic || !platform || !videoLength || !tone || !contentStyle) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Create the prompt for the script
    const prompt = `Create a ${videoLength} second video script for ${platform} with the following details:

Topic: ${topic}
Tone: ${tone}
Content Style: ${contentStyle}

${references.length > 0 ? `Reference materials:\n${references.map(ref => `- ${ref.title}: ${ref.url}`).join('\n')}` : ''}

Please provide a well-structured script that includes:
1. Hook/Opening
2. Main content
3. Call to action
4. Suggested visuals/transitions

Make it engaging and optimized for ${platform}'s format.`;

    // For demo purposes, return a mock response
    // In production, you would integrate with OpenAI or another AI service
    const mockScript = `[HOOK]
"Ever wondered how to make viral content that actually converts? Let's break it down!"

[MAIN CONTENT]
"First up - it's all about the hook. You've got 3 seconds to grab attention.
*Show quick cuts of viral videos*

Next, deliver value immediately. No fluff.
*Display key statistics on screen*

The secret sauce? Pattern interrupts.
*Demonstrate with quick transition*

[CALL TO ACTION]
"Want more content tips? Hit that follow button and turn on notifications!
Drop a 🔥 if you're ready to go viral!"

[VISUALS/TRANSITIONS]
- Open with fast-paced montage
- Use text overlays for key points
- Implement pattern interrupts every 7-10 seconds
- Close with animated CTA`;

    return new Response(
      JSON.stringify({ script: mockScript }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});