import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-rich-black/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <motion.div 
              className="absolute inset-0 bg-neon-red rounded-md"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <Zap size={32} className="relative text-rich-black" />
          </div>
          <span className="text-xl font-bold">Contiq</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-white/90 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="btn-outline"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white/90 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </nav>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 right-0 bg-rich-black/95 backdrop-blur-md shadow-lg py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <NavLinks mobile setMobileMenuOpen={setMobileMenuOpen} />
            </div>
            <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-white/90 hover:text-white transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="btn-outline text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white/90 hover:text-white transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn-primary text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

const NavLinks = ({ mobile, setMobileMenuOpen }: NavLinksProps) => {
  const links = [
    { text: 'Features', href: '/#features' },
    { text: 'Pricing', href: '/#pricing' },
    { text: 'Blog', href: '/blog' },
    { text: 'About', href: '/about' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.text}
          to={link.href}
          className={`text-white/90 hover:text-white transition-colors ${mobile ? 'py-2' : ''}`}
          onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
        >
          {link.text}
        </Link>
      ))}
    </>
  );
};

export default Navbar;