import { Link } from 'react-router-dom';
import { LogOut, User as UserIcon, LayoutDashboard, Users as UsersIcon, Shield } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuthStore();
  const { handleLogout } = useAuth();

  return (
    <nav className="h-[68px] border-b border-[rgba(255,255,255,0.08)] bg-[#0a0a15]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container h-full flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow">
            <ShieldIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white tracking-tight">AuthVault</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavLink to="/users" icon={UsersIcon} label="Directory" />
            {user?.role === 'admin' && (
              <NavLink to="/admin" icon={ShieldIcon} label="Admin" highlight />
            )}
          </div>
          
          <div className="w-px h-6 bg-[rgba(255,255,255,0.1)] hidden md:block"></div>

          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] group-hover:border-purple-500 transition-colors object-cover" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <UserIcon size={16} />
                </div>
              )}
              <span className="hidden sm:block">{user?.name?.split(' ')[0]}</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon: Icon, label, highlight }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-1.5 transition-colors ${highlight ? 'text-purple-400 hover:text-purple-300' : 'text-gray-300 hover:text-white'}`}
  >
    <Icon size={16} /> {label}
  </Link>
);

const ShieldIcon = ({ className, size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default Navbar;
