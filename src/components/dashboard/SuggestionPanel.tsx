import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

interface SuggestionPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuggestionPanel = ({ isOpen, onClose }: SuggestionPanelProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-lighter-gray border-l border-white/10 z-20 overflow-hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-semibold flex items-center gap-2">
              <Lightbulb size={18} className="text-neon-red" />
              AI Suggestions
            </h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close suggestion panel"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 space-y-6 h-[calc(100%-4rem)] overflow-y-auto">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/70">Current Project</h4>
              <p className="text-xs text-white/50">Based on your content about "Digital Marketing Trends"</p>
            </div>
            
            {suggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface Suggestion {
  id: number;
  type: string;
  title: string;
  content: string;
}

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neon-red/20 flex items-center justify-center">
            <Lightbulb size={14} className="text-neon-red" />
          </div>
          <span className="text-sm font-medium">{suggestion.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            className="p-1 rounded-md text-white/50 hover:text-white/80 transition-colors"
            aria-label="Like suggestion"
          >
            <ThumbsUp size={14} />
          </button>
          <button 
            className="p-1 rounded-md text-white/50 hover:text-white/80 transition-colors"
            aria-label="Dislike suggestion"
          >
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>
      
      <h4 className="text-sm font-medium mb-2">{suggestion.title}</h4>
      <p className="text-xs text-white/70 mb-3">{suggestion.content}</p>
      
      <div className="flex justify-end">
        <button className="flex items-center gap-1 text-xs text-neon-red hover:text-neon-red/80 transition-colors">
          <Copy size={12} />
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

const suggestions = [
  {
    id: 1,
    type: "Content Idea",
    title: "Add section on AI in marketing",
    content: "Your audience might be interested in a section about how AI is transforming content marketing strategies in 2025."
  },
  {
    id: 2,
    type: "SEO Suggestion",
    title: "Optimize for 'digital marketing AI'",
    content: "This keyword has high search volume and low competition. Consider incorporating it more prominently."
  },
  {
    id: 3,
    type: "Engagement Tip",
    title: "Add interactive poll",
    content: "Boost engagement by adding a poll asking readers which digital marketing trend they're most excited about."
  },
  {
    id: 4,
    type: "Style Improvement",
    title: "Shorten paragraphs",
    content: "Some paragraphs exceed 4-5 sentences. Consider breaking them up for better readability on mobile devices."
  },
  {
    id: 5,
    type: "Content Expansion",
    title: "Add case study",
    content: "Including a brief case study of a successful digital marketing campaign would strengthen your points."
  }
];

export default SuggestionPanel;