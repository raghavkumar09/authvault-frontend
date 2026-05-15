import { Shield, Activity, Users, AlertTriangle } from 'lucide-react';
import useUsers from '../hooks/useUsers';

const AdminPanel = () => {
  const { pagination, loading } = useUsers();

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Shield className="text-purple-500" /> Admin Control Center
        </h1>
        <p className="text-gray-400">High-level overview and administrative configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 stagger-children">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <Users size={20} />
            <span className="text-sm font-medium">Total Users</span>
          </div>
          <p className="text-3xl font-bold">{pagination.total || '...'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6">Recent System Logs</h3>
          <div className="space-y-4">
            <LogItem type="auth" message="User 'admin@authvault.com' logged in" time="2 mins ago" />
            <LogItem type="user" message="New user registration: 'john@example.com'" time="15 mins ago" />
            <LogItem type="system" message="Redis cache invalidated for pattern 'users:*'" time="1 hour ago" />
            <LogItem type="auth" message="Failed login attempt from IP 192.168.1.1" time="2 hours ago" />
          </div>
        </div>
      </div>
    </div>
  );
};

const LogItem = ({ type, message, time }) => (
  <div className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
    <div>
      <span className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1 block">{type}</span>
      <p className="text-sm text-gray-300">{message}</p>
    </div>
    <span className="text-xs text-gray-500">{time}</span>
  </div>
);

const ActionButton = ({ label, color }) => (
  <button className={`p-4 ${color} hover:opacity-90 rounded-xl text-sm font-bold transition-all shadow-lg`}>
    {label}
  </button>
);

export default AdminPanel;
