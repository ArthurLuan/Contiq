import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1);
  };
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
  };
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-red/5 rounded-full filter blur-[150px] -z-10" />
      
      <div className="container max-w-5xl relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-neon-red/10 text-neon-red text-sm font-medium border border-neon-red/20 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Users Say
          </h2>
        </div>
        
        <div className="relative">
          <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 shadow-glow min-h-[320px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 20,
                  position: activeIndex === index ? 'relative' : 'absolute'
                }}
                transition={{ duration: 0.5 }}
                className={`${activeIndex !== index ? 'top-12 left-12 h-0 overflow-hidden' : ''}`}
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={`${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'}`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl mb-6 italic text-white/90">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-white/60 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button 
              className="w-10 h-10 rounded-full bg-lighter-gray/30 flex items-center justify-center text-white hover:bg-neon-red/20 transition-colors"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index ? 'w-6 bg-neon-red' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => handleIndicatorClick(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="w-10 h-10 rounded-full bg-lighter-gray/30 flex items-center justify-center text-white hover:bg-neon-red/20 transition-colors"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Marketing Director at TechFlow",
    quote: "Contiq transformed our content strategy. We've increased engagement by 147% and reduced production time by half. The AI suggestions are spot-on!",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Michael Rodriguez",
    title: "Content Creator & YouTuber",
    quote: "As a solo creator, Contiq is like having a full production team. The script generator and social scheduler have completely streamlined my workflow.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Emily Chen",
    title: "Digital Strategist at GrowthFirm",
    quote: "The analytics capabilities are incredible. We can finally see which content performs best across all channels and optimize accordingly.",
    rating: 4,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default TestimonialSection;