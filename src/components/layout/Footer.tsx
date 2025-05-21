import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rich-black border-t border-white/5 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-neon-red rounded-md p-1">
                <Zap size={24} className="text-rich-black" />
              </div>
              <span className="text-xl font-bold">Contiq</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              Contiq transforms content creation with AI-powered tools that help you create, optimize, and schedule amazing content across all platforms.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={20} />} href="https://facebook.com" label="Facebook" />
              <SocialLink icon={<Twitter size={20} />} href="https://twitter.com" label="Twitter" />
              <SocialLink icon={<Instagram size={20} />} href="https://instagram.com" label="Instagram" />
              <SocialLink icon={<Linkedin size={20} />} href="https://linkedin.com" label="LinkedIn" />
              <SocialLink icon={<Github size={20} />} href="https://github.com" label="GitHub" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <FooterLinks 
              links={[
                { text: 'Features', href: '/#features' },
                { text: 'Pricing', href: '/#pricing' },
                { text: 'Roadmap', href: '/roadmap' },
                { text: 'Request a feature', href: '/feature-request' },
              ]} 
            />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <FooterLinks 
              links={[
                { text: 'Blog', href: '/blog' },
                { text: 'Documentation', href: '/docs' },
                { text: 'Community', href: '/community' },
                { text: 'Help Center', href: '/help' },
              ]} 
            />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <FooterLinks 
              links={[
                { text: 'About', href: '/about' },
                { text: 'Careers', href: '/careers' },
                { text: 'Contact', href: '/contact' },
                { text: 'Legal', href: '/legal' },
              ]} 
            />
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Contiq. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-white/50 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/50 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-white/50 text-sm hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialLink = ({ icon, href, label }: SocialLinkProps) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-lighter-gray/20 flex items-center justify-center text-white/70 hover:bg-neon-red hover:text-white transition-all"
    >
      {icon}
    </a>
  );
};

interface FooterLinksProps {
  links: { text: string; href: string }[];
}

const FooterLinks = ({ links }: FooterLinksProps) => {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.text}>
          <Link 
            to={link.href} 
            className="text-white/70 hover:text-white transition-colors"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Footer;