import { useState, useEffect } from 'react';
import { Search, Filter, FolderOpen, Grid, List, MoreVertical, FileText, Image as ImageIcon, Video, File, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface ContentItem {
  id: string;
  title: string;
  type: 'script' | 'document' | 'image' | 'video' | 'other';
  created_at: string;
  updated_at: string;
  platform?: string;
  content?: string;
  video_length?: number;
  tone?: string;
  content_style?: string;
}

const YourContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch scripts
        const { data: scripts, error: scriptsError } = await supabase
          .from('scripts')
          .select('*')
          .eq('user_id', user?.id);

        if (scriptsError) throw scriptsError;

        const formattedScripts = scripts.map(script => ({
          ...script,
          type: 'script' as const
        }));

        // Fetch other content types from content_items table
        const { data: otherContent, error: contentError } = await supabase
          .from('content_items')
          .select('*')
          .eq('user_id', user?.id);

        if (contentError) throw contentError;

        setContent([...formattedScripts, ...(otherContent || [])]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchContent();
    }
  }, [user]);

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'script', label: 'Scripts' },
    { value: 'document', label: 'Documents' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'other', label: 'Others' }
  ];

  const getFileIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'document':
        return <FileText size={24} className="text-blue-400" />;
      case 'image':
        return <ImageIcon size={24} className="text-purple-400" />;
      case 'video':
        return <Video size={24} className="text-red-400" />;
      case 'script':
        return <FileText size={24} className="text-green-400" />;
      default:
        return <File size={24} className="text-white/70" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <RefreshCw size={32} className="animate-spin text-neon-red" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (filteredContent.length === 0) {
      return (
        <div className="text-center p-8">
          <p className="text-white/60">No content found</p>
        </div>
      );
    }

    return viewMode === 'grid' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredContent.map((item) => (
          <div key={item.id} className="glass-card p-4 rounded-xl hover:border-neon-red/20 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              {getFileIcon(item.type)}
              <button className="text-white/60 hover:text-white p-1">
                <MoreVertical size={18} />
              </button>
            </div>
            <h3 className="font-medium mb-1 truncate">{item.title}</h3>
            <div className="text-sm text-white/60">
              <p>Modified {formatDate(item.updated_at)}</p>
              {item.type === 'script' && (
                <p className="mt-1">Platform: {item.platform}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Name</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Type</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Platform</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Modified</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-white/70"></th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {getFileIcon(item.type)}
                    <span className="font-medium">{item.title}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-sm capitalize">
                    {item.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-center text-white/70">
                  {item.type === 'script' ? item.platform : '-'}
                </td>
                <td className="py-4 px-6 text-center text-white/70">{formatDate(item.updated_at)}</td>
                <td className="py-4 px-6 text-right">
                  <button className="text-white/60 hover:text-white p-1">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Your Content</h1>
          <p className="text-white/60">Manage and organize your content library</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content..."
              className="w-full bg-lighter-gray/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-lighter-gray/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <div className="flex items-center gap-1 bg-lighter-gray/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default YourContent;