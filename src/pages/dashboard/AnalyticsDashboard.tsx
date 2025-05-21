import { useState } from 'react';
import { 
  Calendar, TrendingUp, Users, Eye, Award, Filter,
  Zap, ArrowUp, ArrowDown, PieChart, Activity,
  Target, TrendingDown, Share2, UserPlus
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Analytics Overview</h1>
          <p className="text-white/60">Performance insights and metrics</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <QuickStatCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Audience Demographics</h3>
            <select className="bg-lighter-gray/30 border border-white/10 rounded-lg p-1 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-neon-red/50">
              <option>All Platforms</option>
              <option>Website</option>
              <option>Social Media</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {demographicStats.map((stat, index) => (
              <CircleChart key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Content Performance</h3>
            <select className="bg-lighter-gray/30 border border-white/10 rounded-lg p-1 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-neon-red/50">
              <option>All Content</option>
              <option>Blog Posts</option>
              <option>Social Media</option>
            </select>
          </div>

          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <PerformanceBar key={index} {...metric} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Growth Trends</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-red"></div>
                <span className="text-sm text-white/70">Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-white/70">Engagement</span>
              </div>
            </div>
          </div>

          <div className="h-64 relative">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-md px-2 py-1 flex items-center gap-1">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-500">+15.8%</span>
            </div>
            
            <div className="w-full h-full flex items-end justify-between gap-2">
              {growthData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-1">
                    <div 
                      className="w-full bg-neon-red/40 rounded-sm" 
                      style={{ height: `${item.followers}%` }}
                    ></div>
                    <div 
                      className="w-full bg-blue-500/40 rounded-sm" 
                      style={{ height: `${item.engagement}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold mb-6">Platform Distribution</h3>
          <div className="space-y-4">
            {platformStats.map((platform, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${platform.bgColor} flex items-center justify-center`}>
                  {platform.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{platform.name}</span>
                    <span className="text-sm text-white/70">{platform.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${platform.barColor} rounded-full`}
                      style={{ width: `${platform.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickStat {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const QuickStatCard = ({ stat }: { stat: QuickStat }) => (
  <div className="glass-card p-5 rounded-xl border border-white/10">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
        {stat.icon}
      </div>
      <div className={`flex items-center gap-1 text-sm ${
        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
      }`}>
        {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        <span>{Math.abs(stat.change)}%</span>
      </div>
    </div>
    <h3 className="text-white/70 text-sm mb-1">{stat.title}</h3>
    <div className="text-2xl font-bold">{stat.value}</div>
  </div>
);

interface CircleChartProps {
  title: string;
  percentage: number;
  subtitle: string;
  color: string;
}

const CircleChart = ({ title, percentage, subtitle, color }: CircleChartProps) => (
  <div className="flex flex-col items-center">
    <div className="relative w-32 h-32 mb-4">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="60"
          className="stroke-white/10"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r="60"
          className={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${percentage * 3.77} 377`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
    <h4 className="font-medium text-center mb-1">{title}</h4>
    <p className="text-sm text-white/60 text-center">{subtitle}</p>
  </div>
);

interface PerformanceMetric {
  title: string;
  value: number;
  total: number;
  color: string;
}

const PerformanceBar = ({ title, value, total, color }: PerformanceMetric) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="font-medium">{title}</span>
      <span className="text-white/70">{value}/{total}</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full`}
        style={{ width: `${(value / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

const quickStats: QuickStat[] = [
  {
    title: "Total Reach",
    value: "2.4M",
    change: 12.5,
    trend: 'up',
    icon: <Share2 size={20} className="text-white" />,
    color: "bg-purple-500/20"
  },
  {
    title: "New Followers",
    value: "12.8K",
    change: 8.2,
    trend: 'up',
    icon: <UserPlus size={20} className="text-white" />,
    color: "bg-blue-500/20"
  },
  {
    title: "Engagement Rate",
    value: "6.2%",
    change: 3.1,
    trend: 'down',
    icon: <Activity size={20} className="text-white" />,
    color: "bg-neon-red/20"
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: 5.7,
    trend: 'up',
    icon: <Target size={20} className="text-white" />,
    color: "bg-green-500/20"
  }
];

const demographicStats: CircleChartProps[] = [
  {
    title: "Age 25-34",
    percentage: 65,
    subtitle: "Primary Audience",
    color: "stroke-neon-red"
  },
  {
    title: "Mobile Users",
    percentage: 82,
    subtitle: "Platform Usage",
    color: "stroke-blue-500"
  },
  {
    title: "Returning Users",
    percentage: 45,
    subtitle: "Loyalty Rate",
    color: "stroke-purple-500"
  },
  {
    title: "Goal Completion",
    percentage: 73,
    subtitle: "Success Rate",
    color: "stroke-green-500"
  }
];

const performanceMetrics: PerformanceMetric[] = [
  {
    title: "Content Views",
    value: 85420,
    total: 100000,
    color: "bg-neon-red"
  },
  {
    title: "Social Shares",
    value: 12350,
    total: 20000,
    color: "bg-blue-500"
  },
  {
    title: "Comments",
    value: 3200,
    total: 5000,
    color: "bg-purple-500"
  }
];

const growthData = [
  { label: "Mon", followers: 45, engagement: 35 },
  { label: "Tue", followers: 55, engagement: 45 },
  { label: "Wed", followers: 65, engagement: 55 },
  { label: "Thu", followers: 60, engagement: 50 },
  { label: "Fri", followers: 75, engagement: 65 },
  { label: "Sat", followers: 85, engagement: 75 },
  { label: "Sun", followers: 80, engagement: 70 }
];

const platformStats = [
  {
    name: "Instagram",
    percentage: 45,
    icon: <PieChart size={20} className="text-white" />,
    bgColor: "bg-pink-500/20",
    barColor: "bg-pink-500"
  },
  {
    name: "Twitter",
    percentage: 30,
    icon: <Activity size={20} className="text-white" />,
    bgColor: "bg-blue-500/20",
    barColor: "bg-blue-500"
  },
  {
    name: "LinkedIn",
    percentage: 25,
    icon: <Target size={20} className="text-white" />,
    bgColor: "bg-purple-500/20",
    barColor: "bg-purple-500"
  }
];

export default AnalyticsDashboard;