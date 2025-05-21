import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-red/5 to-neon-red/10 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-red/5 filter blur-[120px] -z-10" />
      
      <div className="container">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="relative inline-block mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-neon-red/20 rounded-full mx-auto flex items-center justify-center">
              <Zap size={32} className="text-neon-red" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-neon-red/20 animate-ping" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ready to Transform Your Content Creation?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join thousands of content creators, marketers, and businesses using Contiq to create better content faster.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link 
              to="/dashboard" 
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg"
            >
              Get Started for Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline px-8 py-4 text-lg">
              Contact Sales
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;