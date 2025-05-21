import { motion } from 'framer-motion';
import { 
  Facebook, Twitter, Instagram, Linkedin, Youtube, CheckCircle 
} from 'lucide-react';

const SocialIntegrationSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-rich-black to-dark-gray relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-neon-red/5 rounded-full filter blur-[150px] -z-10" />
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-neon-red/10 text-neon-red text-sm font-medium border border-neon-red/20 mb-4">
              Social Media Integration
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with Your Audience Everywhere
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Seamlessly publish, schedule, and analyze your content across all major social media platforms from a single dashboard.
            </p>
            
            <div className="space-y-4 mb-8">
              {socialFeatures.map((feature, index) => (
                <motion.div 
                  key={feature}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle size={20} className="text-neon-red shrink-0 mt-1" />
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <button className="btn-primary">
              Connect Your Accounts
            </button>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-glow">
              <div className="flex justify-between mb-8">
                <h3 className="text-2xl font-semibold">Connected Platforms</h3>
                <button className="text-neon-red text-sm hover:underline">Manage</button>
              </div>
              
              <div className="space-y-5">
                {socialPlatforms.map((platform, index) => (
                  <motion.div 
                    key={platform.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-lighter-gray/20 border border-white/5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.bgColor}`}>
                        {platform.icon}
                      </div>
                      <div>
                        <p className="font-medium">{platform.name}</p>
                        <p className="text-white/50 text-sm">{platform.account}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${platform.connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm text-white/70">
                        {platform.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 rounded-lg bg-lighter-gray/40 hover:bg-lighter-gray/60 transition-colors text-white font-medium">
                Connect New Platform
              </button>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-5 -right-5 glass-card p-3 rounded-lg border border-white/10 shadow-sm hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
                <span className="text-sm">Post published successfully</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-5 -left-5 glass-card p-3 rounded-lg border border-white/10 shadow-sm hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neon-red/10 flex items-center justify-center">
                  <BarChart size={16} className="text-neon-red" />
                </div>
                <span className="text-sm">Analytics updated</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BarChart = ({ size, className }: { size: number, className: string }) => (
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
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const socialFeatures = [
  'Schedule posts across multiple platforms simultaneously',
  'Optimize content for each social network automatically',
  'Track engagement and performance metrics in real-time',
  'Analyze audience demographics and behavior',
  'Reuse and repurpose content efficiently'
];

const socialPlatforms = [
  {
    name: 'Facebook',
    account: '@contiqofficial',
    icon: <Facebook size={20} className="text-white" />,
    bgColor: 'bg-blue-600',
    connected: true
  },
  {
    name: 'Twitter',
    account: '@contiq',
    icon: <Twitter size={20} className="text-white" />,
    bgColor: 'bg-sky-500',
    connected: true
  },
  {
    name: 'Instagram',
    account: '@contiq',
    icon: <Instagram size={20} className="text-white" />,
    bgColor: 'bg-pink-600',
    connected: true
  },
  {
    name: 'LinkedIn',
    account: 'Contiq Official',
    icon: <Linkedin size={20} className="text-white" />,
    bgColor: 'bg-blue-700',
    connected: false
  },
  {
    name: 'YouTube',
    account: 'Contiq',
    icon: <Youtube size={20} className="text-white" />,
    bgColor: 'bg-red-600',
    connected: true
  }
];

export default SocialIntegrationSection;