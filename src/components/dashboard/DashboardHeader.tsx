import { useState } from 'react';
import { 
  Bell, Search, Menu, X, ChevronDown, MessageSquare, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  toggleSuggestionPanel: () => void;
  isSuggestionPanelOpen: boolean;
}

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

const Settings = ({ size, className }: { size: number, className: string }) => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const HelpCircle = ({ size, className }: { size: number, className: string }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const LogOut = ({ size, className }: { size: number, className: string }) => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const notifications = [
  {
    id: 1,
    message: "Your social post has been published successfully",
    time: "Just now",
    read: false,
    icon: <Bell size={18} className="text-neon-red" />
  },
  {
    id: 2,
    message: "New content suggestion available",
    time: "10 minutes ago",
    read: false,
    icon: <MessageSquare size={18} className="text-neon-red" />
  },
  {
    id: 3,
    message: "Weekly analytics report is ready",
    time: "2 hours ago",
    read: true,
    icon: <BarChart size={18} className="text-white/70" />
  },
  {
    id: 4,
    message: "Your subscription will renew in 3 days",
    time: "Yesterday",
    read: true,
    icon: <Bell size={18} className="text-white/70" />
  }
];

const userMenuItems = [
  {
    label: "Profile",
    icon: <User size={16} className="text-white/70" />
  },
  {
    label: "Settings",
    icon: <Settings size={16} className="text-white/70" />
  },
  {
    label: "Help & Support",
    icon: <HelpCircle size={16} className="text-white/70" />
  },
  {
    label: "Logout",
    icon: <LogOut size={16} className="text-white/70" />
  }
];

const DashboardHeader = ({ 
  toggleSidebar, 
  toggleSuggestionPanel,
  isSuggestionPanelOpen
}: DashboardHeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <header className="h-16 bg-rich-black border-b border-white/5 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <AnimatePresence>
          {searchOpen ? (
            <motion.div 
              className="relative md:w-96"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors hidden md:flex items-center gap-2"
              aria-label="Open search"
            >
              <Search size={18} />
              <span className="text-white/50">Search...</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSuggestionPanel}
          className={`p-2 rounded-md transition-colors relative ${
            isSuggestionPanelOpen 
              ? 'bg-neon-red/20 text-neon-red' 
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
          aria-label="AI Suggestions"
        >
          <MessageSquare size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-neon-red rounded-full"></span>
        </button>
        
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUserMenuOpen(false);
            }}
            className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-neon-red rounded-full"></span>
          </button>
          
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-80 rounded-lg bg-lighter-gray border border-white/10 shadow-lg overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-medium">Notifications</h3>
                  <button className="text-xs text-neon-red hover:underline">
                    Mark all as read
                  </button>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.read ? 'bg-lighter-gray/30' : 'bg-neon-red/10'}`}>
                          {notification.icon}
                        </div>
                        <div>
                          <p className={`text-sm mb-1 ${notification.read ? 'text-white/70' : 'text-white'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-white/50">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-neon-red rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t border-white/10 text-center">
                  <button className="text-sm text-neon-red hover:underline">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative ml-2">
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-white/5 transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-lighter-gray overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                alt="User profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden md:block text-sm font-medium">Michael Scott</span>
            <ChevronDown size={16} className="hidden md:block text-white/70" />
          </button>
          
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 rounded-lg bg-lighter-gray border border-white/10 shadow-lg overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 border-b border-white/10">
                  <p className="font-medium">Michael Scott</p>
                  <p className="text-xs text-white/50">Premium Plan</p>
                </div>
                
                <div>
                  {userMenuItems.map((item) => (
                    <button
                      key={item.label}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;