import { useState } from 'react';
import { TrendingUp, Search, Filter, ArrowUp, BarChart2, MessageSquare, Share2, Eye } from 'lucide-react';

interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  growth: number;
  volume: number;
  engagement: number;
  sentiment: number;
}

const TrendingContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const filteredTopics = trendingTopics.filter(topic => {
    const matchesSearch = topic.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-lighter-gray/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="lifestyle">Lifestyle</option>
          </select>

          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-lighter-gray/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingMetrics.map((metric) => (
          <div key={metric.title} className="glass-card p-5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                {metric.icon}
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUp size={14} />
                <span>{metric.growth}%</span>
              </div>
            </div>
            <h3 className="text-white/70 text-sm mb-1">{metric.title}</h3>
            <div className="text-2xl font-bold">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold">Trending Topics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Topic</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Category</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Growth</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Volume</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Engagement</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-white/70">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {filteredTopics.map((topic) => (
                <tr key={topic.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium">{topic.topic}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                      {topic.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1 text-green-500">
                      <ArrowUp size={14} />
                      <span>{topic.growth}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">{topic.volume}K</td>
                  <td className="py-4 px-6 text-center">{topic.engagement}%</td>
                  <td className="py-4 px-6 text-center">
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${topic.sentiment}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const trendingMetrics = [
  {
    title: "Trending Topics",
    value: "2,847",
    growth: 12.5,
    icon: <TrendingUp size={20} className="text-white" />,
    bgColor: "bg-blue-500/20"
  },
  {
    title: "Total Mentions",
    value: "1.2M",
    growth: 8.2,
    icon: <MessageSquare size={20} className="text-white" />,
    bgColor: "bg-purple-500/20"
  },
  {
    title: "Engagement Rate",
    value: "6.8%",
    growth: 15.3,
    icon: <BarChart2 size={20} className="text-white" />,
    bgColor: "bg-neon-red/20"
  },
  {
    title: "Social Reach",
    value: "8.4M",
    growth: 10.7,
    icon: <Share2 size={20} className="text-white" />,
    bgColor: "bg-green-500/20"
  }
];

const trendingTopics: TrendingTopic[] = [
  {
    id: "1",
    topic: "AI-Powered Content Creation",
    category: "technology",
    growth: 156,
    volume: 450,
    engagement: 78,
    sentiment: 85
  },
  {
    id: "2",
    topic: "Sustainable Business Practices",
    category: "business",
    growth: 89,
    volume: 320,
    engagement: 65,
    sentiment: 92
  },
  {
    id: "3",
    topic: "Virtual Reality Entertainment",
    category: "entertainment",
    growth: 134,
    volume: 280,
    engagement: 82,
    sentiment: 88
  },
  {
    id: "4",
    topic: "Digital Wellness",
    category: "lifestyle",
    growth: 67,
    volume: 195,
    engagement: 71,
    sentiment: 90
  },
  {
    id: "5",
    topic: "Quantum Computing",
    category: "technology",
    growth: 112,
    volume: 150,
    engagement: 69,
    sentiment: 82
  }
];

export default TrendingContent;