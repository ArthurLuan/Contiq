import { useState, useRef, useEffect } from 'react';
import {
  FileText, Search, Filter, ArrowUp, ArrowDown, AlertCircle,
  CheckCircle, RefreshCw, Sparkles, BarChart2, Book, Globe,
  MessageSquare, ThumbsUp, Share2, Eye, Clock, Target,
  Upload, X, File, ChevronDown, Plus, Link as LinkIcon
} from 'lucide-react';

interface ExampleInput {
  id: string;
  type: 'link' | 'image';
  url: string;
  title: string;
}

const platforms = [
  { id: 'youtube', name: 'YouTube', icon: '🎥' },
  { id: 'tiktok', name: 'TikTok', icon: '📱' },
  { id: 'instagram', name: 'Instagram Reels', icon: '📸' },
  { id: 'facebook', name: 'Facebook', icon: '👥' }
];

const toneOptions = [
  { id: 'casual', label: 'Casual', description: 'Relaxed and informal tone' },
  { id: 'professional', label: 'Professional', description: 'Formal and business-like' },
  { id: 'humorous', label: 'Humorous', description: 'Light-hearted and funny' },
  { id: 'serious', label: 'Serious', description: 'Formal and authoritative' },
  { id: 'inspirational', label: 'Inspirational', description: 'Motivating and uplifting' },
  { id: 'informative', label: 'Informative', description: 'Educational and detailed' }
];

const contentStyles = [
  { id: 'educational', label: 'Educational', icon: '📚' },
  { id: 'entertaining', label: 'Entertaining', icon: '🎭' },
  { id: 'promotional', label: 'Promotional', icon: '📢' },
  { id: 'storytelling', label: 'Storytelling', icon: '📖' },
  { id: 'tutorial', label: 'Tutorial', icon: '📝' },
  { id: 'vlog', label: 'Vlog', icon: '🎬' }
];

const ScriptGenerator = () => {
  const [scriptTopic, setScriptTopic] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [videoLength, setVideoLength] = useState(60);
  const [selectedTone, setSelectedTone] = useState('casual');
  const [selectedContentStyle, setSelectedContentStyle] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToneDropdownOpen, setIsToneDropdownOpen] = useState(false);
  const [exampleInputs, setExampleInputs] = useState<ExampleInput[]>([]);
  const [inputUrl, setInputUrl] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toneDropdownRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (toneDropdownRef.current && !toneDropdownRef.current.contains(event.target as Node)) {
        setIsToneDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddExample = (type: 'link' | 'image') => {
    if (!inputUrl.trim()) return;

    const newExample: ExampleInput = {
      id: Date.now().toString(),
      type,
      url: inputUrl,
      title: inputTitle || inputUrl
    };

    setExampleInputs([...exampleInputs, newExample]);
    setInputUrl('');
    setInputTitle('');
  };

  const handleRemoveExample = (id: string) => {
    setExampleInputs(exampleInputs.filter(example => example.id !== id));
  };

  const handleGenerateScript = async () => {
    if (!scriptTopic || !selectedPlatform || !selectedTone || !selectedContentStyle) {
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        topic: scriptTopic,
        platform: selectedPlatform,
        videoLength,
        tone: selectedTone,
        contentStyle: selectedContentStyle,
        references: exampleInputs
      };

      const response = await fetch('https://n8n-fc4c0o0swcokkww040kcswoc.erickto.dev/webhook-test/90937f5c-cdd2-4e0a-b41f-3d09cd9ff642', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.text();
      setGeneratedScript(data);
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-1">Script Generator</h1>
        <p className="text-white/60">Create engaging scripts powered by AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Script Topic */}
          <div className="glass-card p-6 rounded-xl relative z-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-neon-red" />
              Script Topic
            </h2>
            <textarea
              value={scriptTopic}
              onChange={(e) => setScriptTopic(e.target.value)}
              placeholder="Enter your script topic or main idea..."
              className="w-full h-32 bg-lighter-gray/20 border border-white/10 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white resize-none"
            />
          </div>

          {/* Platform Selection */}
          <div className="glass-card p-6 rounded-xl relative z-40">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-neon-red" />
              Platform
            </h2>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-neon-red/50"
              >
                <span className="flex items-center gap-2">
                  {selectedPlatform ? (
                    <>
                      <span>{platforms.find(p => p.id === selectedPlatform)?.icon}</span>
                      <span>{platforms.find(p => p.id === selectedPlatform)?.name}</span>
                    </>
                  ) : (
                    'Select platform'
                  )}
                </span>
                <ChevronDown size={18} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-lighter-gray border border-white/10 rounded-lg shadow-lg overflow-hidden">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-2 hover:bg-white/5 transition-colors"
                    >
                      <span>{platform.icon}</span>
                      <span>{platform.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Video Length */}
          <div className="glass-card p-6 rounded-xl relative z-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock size={20} className="text-neon-red" />
              Video Length
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">1:00</span>
                <span className="text-sm font-medium">{formatTime(videoLength)}</span>
                <span className="text-sm text-white/70">60:00</span>
              </div>
              
              <input
                type="range"
                min="60"
                max="3600"
                step="60"
                value={videoLength}
                onChange={(e) => setVideoLength(parseInt(e.target.value))}
                className="w-full h-2 bg-lighter-gray/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-neon-red [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          {/* Tone Selection */}
          <div className="glass-card p-6 rounded-xl relative z-30">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-neon-red" />
              Tone
            </h2>
            
            <div className="relative" ref={toneDropdownRef}>
              <button
                onClick={() => setIsToneDropdownOpen(!isToneDropdownOpen)}
                className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-neon-red/50"
              >
                <span className="capitalize">
                  {toneOptions.find(t => t.id === selectedTone)?.label || 'Select tone'}
                </span>
                <ChevronDown size={18} className={`transition-transform ${isToneDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToneDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-lighter-gray border border-white/10 rounded-lg shadow-lg overflow-hidden">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => {
                        setSelectedTone(tone.id);
                        setIsToneDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="font-medium capitalize">{tone.label}</div>
                      <div className="text-sm text-white/60">{tone.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Style */}
          <div className="glass-card p-6 rounded-xl relative z-20">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-neon-red" />
              Content Style
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {contentStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedContentStyle(style.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedContentStyle === style.id
                      ? 'border-neon-red bg-neon-red/10'
                      : 'border-white/10 bg-lighter-gray/20 hover:bg-lighter-gray/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{style.icon}</span>
                    <span className="text-sm font-medium">{style.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reference Examples */}
          <div className="glass-card p-6 rounded-xl relative z-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-neon-red" />
              Reference Examples
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Enter URL or upload image..."
                  className="flex-1 bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
                />
                <button
                  onClick={() => handleAddExample('link')}
                  className="btn-primary px-4 py-2"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Title (optional)"
                className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
              />
            </div>

            {exampleInputs.length > 0 && (
              <div className="space-y-3 mt-4">
                {exampleInputs.map((example) => (
                  <div 
                    key={example.id}
                    className="flex items-center gap-3 bg-lighter-gray/20 p-3 rounded-lg"
                  >
                    {example.type === 'link' ? (
                      <LinkIcon size={20} className="text-blue-400" />
                    ) : (
                      <File size={20} className="text-purple-400" />
                    )}
                    <div className="flex-1 truncate">
                      <p className="font-medium truncate">{example.title}</p>
                      <p className="text-sm text-white/50 truncate">{example.url}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveExample(example.id)}
                      className="text-white/50 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleGenerateScript}
            disabled={isGenerating || !scriptTopic || !selectedPlatform || !selectedTone || !selectedContentStyle}
            className={`w-full btn-primary py-4 flex items-center justify-center gap-2 ${
              (isGenerating || !scriptTopic || !selectedPlatform || !selectedTone || !selectedContentStyle) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Generating Script...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Script
              </>
            )}
          </button>
        </div>

        {/* Generated Script Panel */}
        <div className="glass-card p-6 rounded-xl relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} className="text-neon-red" />
              Generated Script
            </h2>
          </div>

          {generatedScript ? (
            <textarea
              value={generatedScript}
              onChange={(e) => setGeneratedScript(e.target.value)}
              className="w-full h-[500px] bg-lighter-gray/20 border border-white/10 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white resize-none font-mono"
            />
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center text-center p-6 bg-lighter-gray/20 rounded-lg border border-white/10">
              <Sparkles size={48} className="text-white/20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Script Generated Yet</h3>
              <p className="text-white/60 max-w-md">
                Fill in the script topic, select platform and duration, choose your tone and content style to generate an engaging script.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;