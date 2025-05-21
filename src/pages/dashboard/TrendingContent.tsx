import { useState } from 'react';
import { TrendingUp, Search, Filter, ArrowUp, BarChart2, MessageSquare, Share2, Eye, Globe, Youtube, RefreshCw } from 'lucide-react';
import { useYouTubeTrending, YOUTUBE_CATEGORIES, COUNTRIES, YouTubeVideo } from '../../lib/youtube';
import { motion } from 'framer-motion';

const TrendingContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');

  const { videos, loading, error } = useYouTubeTrending(
    selectedCountry,
    selectedCategory,
    searchQuery
  );

  const formatNumber = (num: string) => {
    const n = parseInt(num);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Trending Content</h1>
          <p className="text-white/60">Discover trending topics and content ideas</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trends..."
              className="w-full bg-lighter-gray/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-lighter-gray/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
          >
            {COUNTRIES.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-lighter-gray/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
          >
            {YOUTUBE_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

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
                  <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-neon-red transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{video.channelTitle}</p>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {formatNumber(video.viewCount)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        {formatNumber(video.commentCount)}
                      </span>
                    </div>
                    <span>{formatDate(video.publishedAt)}</span>
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