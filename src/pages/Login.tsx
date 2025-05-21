import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';
import { getAuthErrorMessage } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signIn(email.trim(), password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-rich-black flex">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <motion.div 
                className="relative w-10 h-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-neon-red rounded-lg" />
                <Zap size={40} className="relative text-rich-black" />
              </motion.div>
              <span className="text-2xl font-bold">Contiq</span>
            </Link>
          </div>

          <motion.div 
            className="glass-card p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-white/60 mb-8">
              Sign in to continue to your dashboard
            </p>
            
            {error && (
              <motion.div 
                className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-red/50 transition-all"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-red/50 transition-all"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center mt-6 text-white/60">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-neon-red hover:text-neon-red/80 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Decorative section */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-neon-red/5 to-neon-red/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-rich-black via-transparent to-transparent" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Create Better Content with AI
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto">
                Join thousands of content creators using Contiq to create, optimize, and schedule amazing content across all platforms.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}