import { useState } from 'react';
import { 
  Calendar, TrendingUp, Users, Eye, Award, Filter,
  Zap, ArrowUp, ArrowDown
} from 'lucide-react';

const DashboardHome = () => {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-white/60">Welcome back, Michael!</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-lighter-gray/30 border border-white/10 rounded-lg p-2 pl-9 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-neon-red/50"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
              <option>All time</option>
            </select>
            <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
          
          <button className="bg-lighter-gray/30 border border-white/10 rounded-lg p-2 flex items-center gap-2 hover:bg-lighter-gray/50 transition-colors">
            <Filter size={16} />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>
      </div>
      
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Content Performance</h3>
            <select className="bg-lighter-gray/30 border border-white/10 rounded-lg p-1 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-neon-red/50">
              <option>All Content</option>
              <option>Blog Posts</option>
              <option>Social Media</option>
              <option>Videos</option>
            </select>
          </div>
          
          <div className="h-64 w-full flex items-end justify-between gap-2">
            {performanceData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="w-12 bg-gradient-to-t from-neon-red/40 to-neon-red rounded-t-sm" 
                  style={{ height: `${item.value}%` }}
                ></div>
                <span className="text-xs text-white/60 whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Audience Growth</h3>
            <select className="bg-lighter-gray/30 border border-white/10 rounded-lg p-1 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-neon-red/50">
              <option>All Platforms</option>
              <option>Facebook</option>
              <option>Twitter</option>
              <option>Instagram</option>
              <option>LinkedIn</option>
            </select>
          </div>
          
          <div className="h-64 relative">
            <svg viewBox="0 0 400 200" className="h-full w-full">
              <path
                d="M0,200 L20,180 L40,190 L60,150 L80,140 L100,160 L120,140 L140,130 L160,120 L180,100 L200,110 L220,90 L240,80 L260,70 L280,60 L300,50 L320,40 L340,20 L360,30 L380,10 L400,0"
                fill="none"
                stroke="#FF1744"
                strokeWidth="2"
              />
              <path
                d="M0,200 L20,180 L40,190 L60,150 L80,140 L100,160 L120,140 L140,130 L160,120 L180,100 L200,110 L220,90 L240,80 L260,70 L280,60 L300,50 L320,40 L340,20 L360,30 L380,10 L400,0"
                fill="url(#gradient)"
                fillOpacity="0.2"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF1744" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF1744" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-md px-2 py-1 flex items-center gap-1">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-500">+12.5%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top performing content */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Top Performing Content</h3>
          <button className="text-neon-red text-sm hover:underline">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-semibold text-white/70">Title</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-white/70">Type</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-white/70">Views</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-white/70">Engagement</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-white/70">Conversion</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-white/70">Published</th>
              </tr>
            </thead>
            <tbody>
              {topContentData.map((content, index) => (
                <tr 
                  key={content.id} 
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    index === topContentData.length - 1 ? 'border-none' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center ${getContentTypeColor(content.type)}`}>
                        {getContentTypeIcon(content.type)}
                      </div>
                      <div>
                        <div className="font-medium">{content.title}</div>
                        <div className="text-white/50 text-xs">{content.platform}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-white/70">{content.type}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="font-medium">{content.views}</div>
                    <div className={`text-xs flex items-center justify-center gap-1 ${
                      content.viewsChange > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {content.viewsChange > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {Math.abs(content.viewsChange)}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="font-medium">{content.engagement}%</div>
                    <div className={`text-xs flex items-center justify-center gap-1 ${
                      content.engagementChange > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {content.engagementChange > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {Math.abs(content.engagementChange)}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="font-medium">{content.conversion}%</div>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-white/70">{content.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface Stat {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface StatCardProps {
  stat: Stat;
}

const StatCard = ({ stat }: StatCardProps) => {
  return (
    <div className="glass-card p-5 rounded-xl border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white/70 text-sm">{stat.title}</h3>
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${stat.color}`}>
          {stat.icon}
        </div>
      </div>
      
      <div className="text-2xl font-bold mb-2">{stat.value}</div>
      
      <div className={`flex items-center gap-1 text-sm ${
        stat.change > 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        {stat.change > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        <span>{Math.abs(stat.change)}% from last period</span>
      </div>
    </div>
  );
};

const statsData: Stat[] = [
  {
    title: "Total Views",
    value: "124,853",
    change: 12.5,
    icon: <Eye size={16} className="text-white" />,
    color: "bg-blue-500/20"
  },
  {
    title: "Subscribers",
    value: "8,642",
    change: 7.2,
    icon: <Users size={16} className="text-white" />,
    color: "bg-green-500/20"
  },
  {
    title: "Engagement Rate",
    value: "5.23%",
    change: -2.1,
    icon: <Zap size={16} className="text-white" />,
    color: "bg-neon-red/20"
  },
  {
    title: "Conversions",
    value: "1,248",
    change: 18.7,
    icon: <Award size={16} className="text-white" />,
    color: "bg-purple-500/20"
  }
];

const performanceData = [
  { label: "Mon", value: 35 },
  { label: "Tue", value: 60 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 75 },
  { label: "Fri", value: 90 },
  { label: "Sat", value: 60 },
  { label: "Sun", value: 40 }
];

interface ContentItem {
  id: number;
  title: string;
  type: string;
  platform: string;
  views: string;
  viewsChange: number;
  engagement: number;
  engagementChange: number;
  conversion: number;
  published: string;
}

const topContentData: ContentItem[] = [
  {
    id: 1,
    title: "10 AI Tools Every Marketer Needs in 2025",
    type: "Blog Post",
    platform: "Website",
    views: "45.2K",
    viewsChange: 12.5,
    engagement: 8.7,
    engagementChange: 2.3,
    conversion: 3.2,
    published: "3 days ago"
  },
  {
    id: 2,
    title: "How to Create Viral Content with AI",
    type: "Video",
    platform: "YouTube",
    views: "32.8K",
    viewsChange: 8.9,
    engagement: 12.4,
    engagementChange: 5.7,
    conversion: 2.8,
    published: "1 week ago"
  },
  {
    id: 3,
    title: "The Future of Content Creation [Infographic]",
    type: "Image",
    platform: "Instagram",
    views: "28.5K",
    viewsChange: -3.2,
    engagement: 9.5,
    engagementChange: -1.2,
    conversion: 1.9,
    published: "2 weeks ago"
  },
  {
    id: 4,
    title: "5-Minute Content Optimization Guide",
    type: "Social Post",
    platform: "LinkedIn",
    views: "19.7K",
    viewsChange: 15.3,
    engagement: 7.8,
    engagementChange: 3.1,
    conversion: 4.5,
    published: "3 weeks ago"
  }
];

const getContentTypeColor = (type: string) => {
  switch (type) {
    case "Blog Post": return "bg-blue-500/20";
    case "Video": return "bg-red-500/20";
    case "Image": return "bg-purple-500/20";
    case "Social Post": return "bg-green-500/20";
    default: return "bg-lighter-gray/30";
  }
};

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "Blog Post": return <Document size={16} className="text-blue-500" />;
    case "Video": return <Video size={16} className="text-red-500" />;
    case "Image": return <Image size={16} className="text-purple-500" />;
    case "Social Post": return <MessageSquare size={16} className="text-green-500" />;
    default: return <File size={16} className="text-white/70" />;
  }
};

const Document = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const Video = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const Image = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const MessageSquare = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const File = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

export default DashboardHome;