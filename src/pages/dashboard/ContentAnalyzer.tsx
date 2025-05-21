import { useState, useRef } from 'react';
import {
  FileText, Search, Filter, ArrowUp, ArrowDown, AlertCircle,
  CheckCircle, RefreshCw, Sparkles, BarChart2, Book, Globe,
  MessageSquare, ThumbsUp, Share2, Eye, Clock, Target,
  Upload, X, File
} from 'lucide-react';

interface ContentMetrics {
  readability: {
    score: number;
    level: string;
    suggestions: string[];
  };
  seo: {
    score: number;
    issues: string[];
    improvements: string[];
  };
  engagement: {
    score: number;
    metrics: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
    };
  };
}

interface ContentItem {
  id: string;
  title: string;
  type: string;
  platform: string;
  status: 'analyzing' | 'completed' | 'error';
  metrics: ContentMetrics;
  lastAnalyzed: string;
}

const ContentAnalyzer = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'analyze'>('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [contentToAnalyze, setContentToAnalyze] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [contentItems, setContentItems] = useState<ContentItem[]>(sampleContentItems);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleAnalyzeContent = async () => {
    if (!contentToAnalyze.trim() && uploadedFiles.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newContentItem: ContentItem = {
        id: Date.now().toString(),
        title: contentToAnalyze.split('\n')[0] || uploadedFiles[0]?.name || 'Untitled Content',
        type: uploadedFiles.length > 0 ? 'Document' : 'Text',
        platform: 'All Platforms',
        status: 'completed',
        metrics: {
          readability: {
            score: 85,
            level: 'Advanced',
            suggestions: [
              'Consider breaking longer paragraphs',
              'Use more transition words',
              'Vary sentence length for better flow'
            ]
          },
          seo: {
            score: 92,
            issues: [],
            improvements: [
              'Add more relevant keywords',
              'Include meta description',
              'Optimize title length'
            ]
          },
          engagement: {
            score: 78,
            metrics: {
              likes: 0,
              comments: 0,
              shares: 0,
              views: 0
            }
          }
        },
        lastAnalyzed: new Date().toISOString()
      };

      setContentItems([newContentItem, ...contentItems]);
      setContentToAnalyze('');
      setUploadedFiles([]);
      setIsAnalyzing(false);
      setActiveTab('content');
    }, 2000);
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || item.platform.toLowerCase() === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Content Analyzer</h1>
          <p className="text-white/60">Analyze and optimize your content performance</p>
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
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-lighter-gray/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
          >
            <option value="all">All Platforms</option>
            <option value="website">Website</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>

          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-lighter-gray/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'content' ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
        >
          Content Library
          {activeTab === 'content' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-red"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('analyze')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'analyze' ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
        >
          Analyze New Content
          {activeTab === 'analyze' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-red"></div>
          )}
        </button>
      </div>

      {activeTab === 'content' ? (
        <div className="space-y-4">
          {filteredContent.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      ) : (
        <div className="glass-card p-6 rounded-xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">New Content Analysis</h2>
            <p className="text-white/60">Paste your content or upload files to analyze their performance potential</p>
          </div>

          <div className="space-y-4">
            <textarea
              value={contentToAnalyze}
              onChange={(e) => setContentToAnalyze(e.target.value)}
              placeholder="Paste your content here..."
              className="w-full h-64 bg-lighter-gray/20 border border-white/10 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white resize-none"
            />

            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-neon-red/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
                <Upload size={32} className="mx-auto mb-4 text-white/60" />
                <p className="text-white/60 mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-white/40">Supports PDF, DOCX, TXT, and more</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-lighter-gray/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <File size={20} className="text-white/60" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-white/60 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyzeContent}
              disabled={(!contentToAnalyze.trim() && uploadedFiles.length === 0) || isAnalyzing}
              className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${
                (!contentToAnalyze.trim() && uploadedFiles.length === 0) || isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze Content
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface ContentCardProps {
  content: ContentItem;
}

const ContentCard = ({ content }: ContentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-semibold mb-1">{content.title}</h3>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <span>{content.type}</span>
            <span>•</span>
            <span>{content.platform}</span>
            <span>•</span>
            <span>Last analyzed: {formatDate(content.lastAnalyzed)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={content.status} />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-lighter-gray/30 hover:bg-lighter-gray/50 transition-colors"
          >
            {isExpanded ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6 mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Readability"
              score={content.metrics.readability.score}
              icon={<Book size={20} className="text-blue-400" />}
              details={[
                { label: 'Level', value: content.metrics.readability.level },
                ...content.metrics.readability.suggestions.map(s => ({ label: '•', value: s }))
              ]}
            />

            <MetricCard
              title="SEO Score"
              score={content.metrics.seo.score}
              icon={<Globe size={20} className="text-green-400" />}
              details={[
                ...content.metrics.seo.improvements.map(s => ({ label: '•', value: s }))
              ]}
            />

            <MetricCard
              title="Engagement Potential"
              score={content.metrics.engagement.score}
              icon={<BarChart2 size={20} className="text-purple-400" />}
              details={[
                { label: 'Views', value: formatNumber(content.metrics.engagement.metrics.views) },
                { label: 'Likes', value: formatNumber(content.metrics.engagement.metrics.likes) },
                { label: 'Comments', value: formatNumber(content.metrics.engagement.metrics.comments) },
                { label: 'Shares', value: formatNumber(content.metrics.engagement.metrics.shares) }
              ]}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button className="btn-outline px-4 py-2 text-sm">
              Export Report
            </button>
            <button className="btn-primary px-4 py-2 text-sm">
              Re-analyze Content
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  details: Array<{ label: string; value: string | number }>;
}

const MetricCard = ({ title, score, icon, details }: MetricCardProps) => (
  <div className="p-4 bg-lighter-gray/20 rounded-lg">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="text-2xl font-bold">{score}</div>
    </div>

    <div className="space-y-2">
      {details.map((detail, index) => (
        <div key={index} className="flex items-start gap-2 text-sm">
          <span className="text-white/60">{detail.label}</span>
          <span className="text-white/90">{detail.value}</span>
        </div>
      ))}
    </div>
  </div>
);

interface StatusBadgeProps {
  status: ContentItem['status'];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'analyzing':
        return 'bg-blue-500/20 text-blue-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'error':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-white/20 text-white/60';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'analyzing':
        return <RefreshCw size={14} className="animate-spin" />;
      case 'completed':
        return <CheckCircle size={14} />;
      case 'error':
        return <AlertCircle size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusStyles()}`}>
      {getStatusIcon()}
      <span className="text-sm capitalize">{status}</span>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: num > 9999 ? 'compact' : 'standard',
    compactDisplay: 'short'
  }).format(num);
};

const sampleContentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Top 10 Digital Marketing Trends for 2025',
    type: 'Blog Post',
    platform: 'Website',
    status: 'completed',
    metrics: {
      readability: {
        score: 92,
        level: 'Professional',
        suggestions: [
          'Consider adding more examples',
          'Break down complex terms',
          'Add a summary section'
        ]
      },
      seo: {
        score: 88,
        issues: [],
        improvements: [
          'Add more internal links',
          'Optimize meta description',
          'Include more relevant keywords'
        ]
      },
      engagement: {
        score: 85,
        metrics: {
          likes: 245,
          comments: 32,
          shares: 128,
          views: 1520
        }
      }
    },
    lastAnalyzed: '2025-02-15T14:30:00Z'
  },
  {
    id: '2',
    title: 'How AI is Transforming Content Creation',
    type: 'Article',
    platform: 'LinkedIn',
    status: 'analyzing',
    metrics: {
      readability: {
        score: 85,
        level: 'Advanced',
        suggestions: [
          'Simplify technical terms',
          'Add more subheadings',
          'Include practical examples'
        ]
      },
      seo: {
        score: 90,
        issues: [],
        improvements: [
          'Add more industry-specific keywords',
          'Include expert quotes',
          'Optimize title length'
        ]
      },
      engagement: {
        score: 78,
        metrics: {
          likes: 156,
          comments: 24,
          shares: 89,
          views: 876
        }
      }
    },
    lastAnalyzed: '2025-02-14T09:15:00Z'
  },
  {
    id: '3',
    title: 'Social Media Strategy Guide 2025',
    type: 'Guide',
    platform: 'All Platforms',
    status: 'error',
    metrics: {
      readability: {
        score: 88,
        level: 'Intermediate',
        suggestions: [
          'Use more bullet points',
          'Add case studies',
          'Include action items'
        ]
      },
      seo: {
        score: 85,
        issues: [],
        improvements: [
          'Add more platform-specific keywords',
          'Include trend analysis',
          'Optimize for featured snippets'
        ]
      },
      engagement: {
        score: 82,
        metrics: {
          likes: 312,
          comments: 45,
          shares: 167,
          views: 2340
        }
      }
    },
    lastAnalyzed: '2025-02-13T16:45:00Z'
  }
];

export default ContentAnalyzer;