import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Home, MessageSquare, PenTool, BarChart3, 
  Calendar, Image, Settings, HelpCircle, LogOut, Zap,
  TrendingUp, FileText, FolderOpen
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
  const location = useLocation();
  
  return (
    <AnimatePresence>
      <motion.aside
        className={`bg-rich-black border-r border-white/5 h-full flex flex-col ${
          isOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 relative z-10`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 truncate">
            <div className="bg-neon-red rounded-md p-1 shrink-0">
              <Zap size={isOpen ? 20 : 24} className="text-rich-black" />
            </div>
            {isOpen && <span className="font-bold text-lg">Contiq</span>}
          </Link>
          
          <button
            onClick={toggleSidebar}
            className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronLeft size={20} className={`transform transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <span className="shrink-0">{link.icon}</span>
                  {isOpen && <span>{link.label}</span>}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-10 px-2">
            <div className="border-t border-white/5 pt-4 pb-2">
              {isOpen && <div className="px-3 text-xs text-white/40 uppercase font-medium mb-2">Settings & Support</div>}
            </div>
            
            <nav className="space-y-1">
              {bottomLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="sidebar-link"
                >
                  <span className="shrink-0">{link.icon}</span>
                  {isOpen && <span>{link.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t border-white/5">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-lighter-gray overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="User profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="truncate">
                <div className="font-medium">Michael Scott</div>
                <div className="text-white/50 text-xs">Premium Plan</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-lighter-gray overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="User profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

const navLinks = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <Home size={20} />
  },
  {
    label: 'Trending Content',
    path: '/dashboard/trending',
    icon: <TrendingUp size={20} />
  },
  {
    label: 'Script Generator',
    path: '/dashboard/scripts',
    icon: <PenTool size={20} />
  },
  {
    label: 'Analyze Content',
    path: '/dashboard/content-analyzer',
    icon: <FileText size={20} />
  },
  {
    label: 'Banner Creator',
    path: '/dashboard/banners',
    icon: <Image size={20} />
  },
  {
    label: 'Social Media',
    path: '/dashboard/social-media',
    icon: <Calendar size={20} />
  },
  {
    label: 'Analytics',
    path: '/dashboard/analytics',
    icon: <BarChart3 size={20} />
  },
  {
    label: 'Your Content',
    path: '/dashboard/your-content',
    icon: <FolderOpen size={20} />
  }
];

const bottomLinks = [
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: <Settings size={20} />
  },
  {
    label: 'Help & Support',
    path: '/dashboard/help',
    icon: <HelpCircle size={20} />
  },
  {
    label: 'Logout',
    path: '/logout',
    icon: <LogOut size={20} />
  }
];

export default DashboardSidebar;