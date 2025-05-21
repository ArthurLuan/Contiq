import { motion } from 'framer-motion';
import { 
  PenTool, MessageSquare, BarChart3, Calendar, 
  Image, Zap, LayoutGrid, Clock 
} from 'lucide-react';

const FeatureSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon-red/10 rounded-full filter blur-[120px] -z-10" />
      
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-neon-red/10 text-neon-red text-sm font-medium border border-neon-red/20 mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Create Content Like Never Before
          </h2>
          <p className="text-xl text-white/70">
            Everything you need to ideate, create, optimize, and publish content across all platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const renderIcon = (iconName: string) => {
    const iconProps = { size: 24, className: "text-neon-red" };
    
    switch (iconName) {
      case 'PenTool': return <PenTool {...iconProps} />;
      case 'MessageSquare': return <MessageSquare {...iconProps} />;
      case 'BarChart3': return <BarChart3 {...iconProps} />;
      case 'Calendar': return <Calendar {...iconProps} />;
      case 'Image': return <Image {...iconProps} />;
      case 'Zap': return <Zap {...iconProps} />;
      case 'LayoutGrid': return <LayoutGrid {...iconProps} />;
      case 'Clock': return <Clock {...iconProps} />;
      default: return <Zap {...iconProps} />;
    }
  };

  return (
    <motion.div 
      className="feature-card h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-12 h-12 rounded-lg bg-neon-red/10 flex items-center justify-center mb-6">
        {renderIcon(feature.icon)}
      </div>
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-white/70">{feature.description}</p>
    </motion.div>
  );
};

const features: Feature[] = [
  {
    icon: 'PenTool',
    title: 'Script Generator',
    description: 'Generate engaging scripts for videos, podcasts, or presentations with our AI-powered script generator.'
  },
  {
    icon: 'MessageSquare',
    title: 'Content Analyzer',
    description: 'Analyze your content for readability, SEO optimization, and engagement potential.'
  },
  {
    icon: 'Image',
    title: 'Banner Creator',
    description: 'Create eye-catching banners and graphics for social media, blogs, and more.'
  },
  {
    icon: 'Calendar',
    title: 'Social Media Scheduler',
    description: 'Schedule and automate posts across all your social media platforms from one dashboard.'
  },
  {
    icon: 'BarChart3',
    title: 'Analytics Dashboard',
    description: 'Track content performance with detailed analytics and actionable insights.'
  },
  {
    icon: 'LayoutGrid',
    title: 'Media Library',
    description: 'Organize and manage all your media assets in one centralized library.'
  },
  {
    icon: 'Clock',
    title: 'Time-Saving Automation',
    description: 'Automate repetitive tasks and focus on creating better content faster.'
  },
  {
    icon: 'Zap',
    title: 'AI Content Suggestions',
    description: 'Get real-time content suggestions and improvements powered by advanced AI.'
  },
  {
    icon: 'MessageSquare',
    title: 'Cross-Platform Publishing',
    description: 'Publish and optimize content for multiple platforms with a single click.'
  }
];

export default FeatureSection;