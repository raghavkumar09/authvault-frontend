import { Link } from 'react-router-dom';
import { Shield, Users, Lock, Zap, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Navigation */}
      <nav className="container h-[80px] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">AuthVault</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign In</Link>
          <Button onClick={() => window.location.href = '/register'}>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-8 animate-fadeIn">
            <Zap size={16} />
            <span>Production-Ready MERN Stack</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tight animate-slideUp">
            Master Your <span className="text-gradient">Identity</span> Management
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.1s' }}>
            A secure, scalable, and stunningly beautiful authentication platform.
            Built with JWT rotation, Redis caching, and RBAC.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" className="px-8 py-4 text-lg" onClick={() => window.location.href = '/register'}>
              Start Free Trial <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg" onClick={() => window.location.href = '/login'}>
              Live Demo
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 stagger-children">
          <div className="glass-card p-8 group hover:border-purple-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Advanced Security</h3>
            <p className="text-gray-400">JWT Refresh Token rotation and reuse detection to keep your users' data safe.</p>
          </div>

          <div className="glass-card p-8 group hover:border-indigo-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">User Directory</h3>
            <p className="text-gray-400">Paginated list with real-time search, backed by Redis for lightning fast performance.</p>
          </div>

          <div className="glass-card p-8 group hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Role-Based Access</h3>
            <p className="text-gray-400">Comprehensive RBAC system to manage permissions and protect sensitive routes.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 relative z-10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-bold">AuthVault</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 AuthVault. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
