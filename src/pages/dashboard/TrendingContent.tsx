import { useState } from 'react';
import { TrendingUp, Search, Filter, ArrowUp, BarChart2, MessageSquare, Share2, Eye, Globe, Youtube, RefreshCw, ThumbsUp, SortAsc } from 'lucide-react';
import { useYouTubeTrending, YOUTUBE_CATEGORIES, COUNTRIES, SORT_OPTIONS, YouTubeVideo } from '../../lib/youtube';
import { motion } from 'framer-motion';

const TrendingContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [sortBy, setSortBy] = useState('relevance');

  const { videos, loading, error } = useYouTubeTrending(
    selectedCountry,
    selectedCategory,
    searchQuery,
    sortBy
  );

  const formatNumber = (num: string) => {
    const n = parseInt(num || '0');
    if (n >= 1000000) {
      return `${(n / 1000000).toFixed(1)}M`;
    }
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}K`;
    }
    return n.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getTotalStats = () => {
    return videos.reduce((acc, video) => {
      return {
        views: acc.views + parseInt(video.viewCount || '0'),
        comments: acc.comments + parseInt(video.commentCount || '0'),
        likes: acc.likes + parseInt(video.likeCount || '0')
      };
    }, { views: 0, comments: 0, likes: 0 });
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trending Content</h1>
          <p className="text-white/60">Discover trending topics and content ideas</p>
        </div>

        {/* Platform Selection */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedPlatform('youtube')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedPlatform === 'youtube'
                ? 'bg-red-500/20 text-red-500 border border-red-500/20'
                : 'bg-lighter-gray/20 text-white/70 border border-white/10 hover:bg-lighter-gray/30'
            }`}
          >
            <Youtube size={20} />
            YouTube
          </button>
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lighter-gray/20 text-white/30 border border-white/10 cursor-not-allowed"
          >
            <MessageSquare size={20} />
            Twitter
            <span className="text-xs">(Coming Soon)</span>
          </button>
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lighter-gray/20 text-white/30 border border-white/10 cursor-not-allowed"
          >
            <Globe size={20} />
            TikTok
            <span className="text-xs">(Coming Soon)</span>
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trends..."
              className="w-full bg-lighter-gray/30 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>

          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full appearance-none bg-lighter-gray/30 border border-white/10 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white cursor-pointer"
            >
              {COUNTRIES.map(country => (
                <option key={country.code} value={country.code} className="bg-rich-black text-white py-2 hover:bg-lighter-gray/50">
                  {country.name}
                </option>
              ))}
            </select>
            <Globe size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-lighter-gray/30 border border-white/10 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white cursor-pointer"
            >
              {YOUTUBE_CATEGORIES.map(category => (
                <option key={category.id} value={category.id} className="bg-rich-black text-white py-2 hover:bg-lighter-gray/50">
                  {category.name}
                </option>
              ))}
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-lighter-gray/30 border border-white/10 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white cursor-pointer"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.id} value={option.id} className="bg-rich-black text-white py-2 hover:bg-lighter-gray/50">
                  {option.name}
                </option>
              ))}
            </select>
            <SortAsc size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="glass-card p-5 rounded-xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/70 text-sm">Total Views</h3>
            <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
              <Eye size={16} className="text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{formatNumber(stats.views.toString())}</div>
        </motion.div>

        <motion.div 
          className="glass-card p-5 rounded-xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/70 text-sm">Total Comments</h3>
            <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{formatNumber(stats.comments.toString())}</div>
        </motion.div>

        <motion.div 
          className="glass-card p-5 rounded-xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/70 text-sm">Total Likes</h3>
            <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
              <ThumbsUp size={16} className="text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{formatNumber(stats.likes.toString())}</div>
        </motion.div>
      </div>

      {/* Content Section */}
      {error ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-2"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <RefreshCw size={32} className="animate-spin text-neon-red mx-auto mb-4" />
          <p className="text-white/70">Loading trending content...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="glass-card rounded-xl overflow-hidden hover:border-neon-red/20 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-neon-red transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{video.channelTitle}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-blue-500">{formatDate(video.publishedAt)}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Eye size={14} className="text-purple-500" />
                        <span className="text-red-500">{formatNumber(video.viewCount)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={14} className="text-green-500" />
                        <span className="text-red-500">{formatNumber(video.likeCount)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} className="text-yellow-500" />
                        <span className="text-red-500">{formatNumber(video.commentCount)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingContent;

export default TrendingContent