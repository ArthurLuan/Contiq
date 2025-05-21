import { useState } from 'react';
import { Search, Filter, FolderOpen, Grid, List, MoreVertical, FileText, Image as ImageIcon, Video, File } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'document' | 'image' | 'video' | 'other';
  size: string;
  modified: string;
  author: string;
}

const YourContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'document':
        return <FileText size={24} className="text-blue-400" />;
      case 'image':
        return <ImageIcon size={24} className="text-purple-400" />;
      case 'video':
        return <Video size={24} className="text-red-400" />;
      default:
        return <File size={24} className="text-white/70" />;
    }
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
            <option value="all">All Types</option>
            <option value="document">Documents</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="other">Others</option>
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

      {viewMode === 'grid' ? (
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
                <p>Modified {item.modified}</p>
                <p>Size: {item.size}</p>
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
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Size</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Modified</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Author</th>
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
                  <td className="py-4 px-6 text-center text-white/70">{item.size}</td>
                  <td className="py-4 px-6 text-center text-white/70">{item.modified}</td>
                  <td className="py-4 px-6 text-center text-white/70">{item.author}</td>
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
      )}
    </div>
  );
};

const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "Q1 Marketing Strategy.docx",
    type: "document",
    size: "2.4 MB",
    modified: "2 hours ago",
    author: "Michael Scott"
  },
  {
    id: "2",
    title: "Product Launch Banner.png",
    type: "image",
    size: "4.8 MB",
    modified: "Yesterday",
    author: "Michael Scott"
  },
  {
    id: "3",
    title: "Company Overview Video.mp4",
    type: "video",
    size: "128 MB",
    modified: "3 days ago",
    author: "Michael Scott"
  },
  {
    id: "4",
    title: "Social Media Calendar.xlsx",
    type: "document",
    size: "1.2 MB",
    modified: "1 week ago",
    author: "Michael Scott"
  },
  {
    id: "5",
    title: "Brand Guidelines.pdf",
    type: "document",
    size: "5.6 MB",
    modified: "2 weeks ago",
    author: "Michael Scott"
  }
];

export default YourContent;