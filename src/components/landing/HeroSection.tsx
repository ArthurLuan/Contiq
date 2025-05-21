import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ChevronDown, MessageSquare, BarChart3, Zap, Code, Sparkles, Brain } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection = ({ scrollToFeatures }: HeroSectionProps) => {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-red/20 rounded-full filter blur-[120px] -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-neon-red/10 rounded-full filter blur-[100px] -z-10" />
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="px-4 py-1 rounded-full bg-neon-red/10 text-neon-red text-sm font-medium border border-neon-red/20">
              Revolutionizing Content Creation
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Create Better Content
            </span>
            <br />
            <span className="bg-gradient-to-r from-neon-red to-neon-red/80 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/70 mb-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Transform your content creation process with Contiq's AI-powered platform. 
            Create, optimize, and schedule amazing content across all your platforms.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link to="/dashboard" className="btn-primary">
              Start creating for free
            </Link>
            <button className="btn-outline flex items-center justify-center gap-2">
              <Play size={16} className="fill-neon-red" />
              Watch demo
            </button>
          </motion.div>
        </motion.div>
        
        {/* Platform Preview */}
        <motion.div 
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-lighter-gray/30 via-lighter-gray/20 to-transparent p-1 rounded-2xl backdrop-blur-xl shadow-glow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-red/10 to-transparent rounded-2xl" />
            <div className="relative bg-rich-black/40 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Brain size={24} />,
                    title: "AI-Powered Writing",
                    description: "Generate engaging content with our advanced AI writing assistant.",
                    gradient: "from-purple-500/20 to-neon-red/20",
                    iconGradient: "from-purple-500 to-neon-red",
                    hoverGradient: "from-purple-500/40 to-neon-red/40"
                  },
                  {
                    icon: <Sparkles size={24} />,
                    title: "Smart Optimization",
                    description: "Automatically optimize your content for maximum engagement and reach.",
                    gradient: "from-blue-500/20 to-cyan-500/20",
                    iconGradient: "from-blue-500 to-cyan-500",
                    hoverGradient: "from-blue-500/40 to-cyan-500/40"
                  },
                  {
                    icon: <Code size={24} />,
                    title: "Cross-Platform",
                    description: "Publish and manage content across all major platforms seamlessly.",
                    gradient: "from-emerald-500/20 to-green-500/20",
                    iconGradient: "from-emerald-500 to-green-500",
                    hoverGradient: "from-emerald-500/40 to-green-500/40"
                  }
                ].map((card, index) => (
                  <div key={index} className="group relative perspective-1000">
                    <motion.div 
                      className="relative transform-gpu transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2"
                      whileHover={{ rotateX: 5, rotateY: 5 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                      <div className="relative bg-rich-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconGradient} mb-6 flex items-center justify-center transform-gpu transition-transform duration-500 group-hover:scale-110`}>
                          <div className="text-white">{card.icon}</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                          {card.title}
                        </h3>
                        <p className="text-white/70">{card.description}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Feature Cards */}
          <motion.div 
            className="absolute -top-8 -left-4 md:-left-16 bg-gradient-to-r from-neon-red/10 to-transparent p-4 rounded-xl backdrop-blur-md border border-white/10 transform-gpu hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-red to-neon-red/60 flex items-center justify-center transform-gpu transition-transform duration-300 group-hover:scale-110">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">AI Suggestions</h4>
                <p className="text-xs text-white/70">Real-time content ideas</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-8 -right-4 md:-right-16 bg-gradient-to-l from-neon-red/10 to-transparent p-4 rounded-xl backdrop-blur-md border border-white/10 transform-gpu hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-500/60 flex items-center justify-center transform-gpu transition-transform duration-300 group-hover:scale-110">
                <BarChart3 size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">Analytics</h4>
                <p className="text-xs text-white/70">Track performance</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.button 
          className="flex flex-col items-center justify-center w-full text-white/50 hover:text-white transition-colors cursor-pointer mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={scrollToFeatures}
        >
          <span className="text-sm mb-2">Explore features</span>
          <ChevronDown size={20} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;