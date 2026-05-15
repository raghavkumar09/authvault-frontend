import { Shield, MoreVertical, Trash2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const UserCard = ({ user, onRoleChange, onDelete }) => {
  const { user: currentUser } = useAuthStore();
  const isAdmin = currentUser?.role === 'admin';
  const isSelf = currentUser?.id === user.id;

  return (
    <div className="glass-card p-6 hover:border-[rgba(255,255,255,0.15)] transition-colors group animate-fadeIn">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-12 h-12 rounded-full object-cover border border-[rgba(255,255,255,0.1)]" 
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center text-purple-400 font-bold text-lg border border-[rgba(255,255,255,0.1)]">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-white truncate max-w-[150px]">{user.name}</h3>
            <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'} mt-1`}>
              {user.role}
            </span>
          </div>
        </div>
        
        {isAdmin && !isSelf && (
          <div className="relative group/menu">
            <button className="p-1 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <MoreVertical size={18} />
            </button>
            <div className="absolute right-0 top-full mt-1 w-36 bg-[#1a1a35] border border-[rgba(255,255,255,0.1)] rounded-lg shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 overflow-hidden">
              <button 
                onClick={() => onRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white text-left"
              >
                <Shield size={14} /> Make {user.role === 'admin' ? 'User' : 'Admin'}
              </button>
              <button 
                onClick={() => onDelete(user.id, user.name)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 text-left"
              >
                <Trash2 size={14} /> Delete User
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2 text-sm">
        <p className="text-gray-400 truncate">
          <span className="text-gray-500 mr-2">Email:</span>{user.email}
        </p>
        <p className="text-gray-400">
          <span className="text-gray-500 mr-2">Joined:</span>
          {new Date(user.created_at || user.createdAt).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[rgba(255,255,255,0.05)]">
          <span className={`w-2 h-2 rounded-full ${user.isEmailVerified ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-xs text-gray-400">{user.isEmailVerified ? 'Email Verified' : 'Unverified'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
