import { Users, ShieldCheck, Activity, Search } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
        <p className="text-gray-400">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 stagger-children">
        <div className="glass-card p-6 flex items-start gap-4">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Account Status</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">Active</span>
              {user?.role === 'admin' && <span className="badge badge-admin">Admin</span>}
            </div>
          </div>
        </div>

        <div className="glass-card p-6 flex items-start gap-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Last Login</p>
            <span className="text-xl font-bold">
              {user?.last_login_at || user?.lastLoginAt ? new Date(user.last_login_at || user.lastLoginAt).toLocaleDateString() : 'Today'}
            </span>
          </div>
        </div>

        <div className="glass-card p-6 flex items-start gap-4">
          <div className="p-3 bg-green-500/20 text-green-400 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Provider</p>
            <span className="text-xl font-bold capitalize">{user?.provider || 'Local'}</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] mb-4">
          <Search className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold mb-3">Explore Users Directory</h2>
        <p className="text-gray-400 mb-6">
          Access the full directory of users in the system. As an admin, you can manage roles and delete accounts.
        </p>
        <a
          href="/users"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors"
        >
          View Users List
        </a>
      </div>

    </div>
  );
};

export default Dashboard;
