import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, MessageSquare, PenTool, BarChart3, Calendar, Image, Laptop, 
  Facebook, Twitter, Instagram, Linkedin, Youtube 
} from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import PricingSection from '../components/landing/PricingSection';
import SocialIntegrationSection from '../components/landing/SocialIntegrationSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import CtaSection from '../components/landing/CtaSection';

const LandingPage = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection scrollToFeatures={() => scrollToSection(featuresRef)} />
        
        <div ref={featuresRef}>
          <FeatureSection />
        </div>
        
        <SocialIntegrationSection />
        
        <TestimonialSection />
        
        <div ref={pricingRef}>
          <PricingSection />
        </div>
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;