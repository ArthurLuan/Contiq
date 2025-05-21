import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  return (
    <section id="pricing" className="py-16 md:py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-neon-red/10 rounded-full filter blur-[120px] -z-10" />
      
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-neon-red/10 text-neon-red text-sm font-medium border border-neon-red/20 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose the Perfect Plan for Your Needs
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Flexible plans designed to help you create amazing content at any scale.
          </p>
          
          <div className="inline-flex items-center bg-lighter-gray/20 p-1 rounded-full">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? 'bg-neon-red text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual ? 'bg-neon-red text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual <span className="text-xs opacity-80">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={plan.title}
              plan={plan}
              isAnnual={isAnnual}
              isPrimary={index === 1}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-white/70 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <a href="#compare" className="text-neon-red hover:underline">
            See full plan comparison
          </a>
        </div>
      </div>
    </section>
  );
};

interface PricingPlan {
  title: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  ctaText: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  isPrimary: boolean;
  index: number;
}

const PricingCard = ({ plan, isAnnual, isPrimary, index }: PricingCardProps) => {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  
  return (
    <motion.div 
      className={`glass-card p-8 rounded-2xl h-full flex flex-col ${
        isPrimary ? 'border-neon-red/40 shadow-glow' : 'border-white/5'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {isPrimary && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-neon-red text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
      <p className="text-white/70 mb-6">{plan.description}</p>
      
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-white/70 ml-1">/month</span>
        {isAnnual && (
          <p className="text-xs text-neon-red mt-1">
            Billed annually (${price * 12}/year)
          </p>
        )}
      </div>
      
      <ul className="space-y-4 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check size={18} className="text-neon-red shrink-0 mt-1" />
            <span className="text-white/90">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isPrimary 
            ? 'bg-neon-red hover:bg-neon-red/90 text-white' 
            : 'bg-lighter-gray/40 hover:bg-lighter-gray/60 text-white'
        }`}
      >
        {plan.ctaText}
      </button>
    </motion.div>
  );
};

const pricingPlans: PricingPlan[] = [
  {
    title: 'Starter',
    description: 'Perfect for individuals and small content creators',
    monthlyPrice: 9,
    annualPrice: 7,
    features: [
      'Access to Script Generator',
      'Basic Content Analytics',
      'Social Media Scheduling',
      'Up to 20 content pieces per month',
      'Email support'
    ],
    ctaText: 'Start Free Trial'
  },
  {
    title: 'Professional',
    description: 'Ideal for professional content creators and small teams',
    monthlyPrice: 29,
    annualPrice: 23,
    features: [
      'All Starter features',
      'Advanced Content Analytics',
      'Banner Creator',
      'Unlimited content pieces',
      'AI Content Suggestions',
      'Priority support'
    ],
    ctaText: 'Start Free Trial'
  },
  {
    title: 'Enterprise',
    description: 'For agencies and large content teams',
    monthlyPrice: 79,
    annualPrice: 63,
    features: [
      'All Professional features',
      'Custom integrations',
      'Team collaboration tools',
      'Advanced security features',
      'Content library management',
      'Dedicated account manager'
    ],
    ctaText: 'Contact Sales'
  }
];

export default PricingSection;