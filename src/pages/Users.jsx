import { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import useUsers from '../hooks/useUsers';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import UserCard from '../components/users/UserCard';
import UserSearch from '../components/users/UserSearch';
import UserPagination from '../components/users/UserPagination';

const Users = () => {
  const { 
    users, 
    pagination, 
    loading, 
    search, 
    setSearch, 
    handlePageChange, 
    handleDeleteUser, 
    handleChangeRole 
  } = useUsers();
  
  const [deleteModal, setDeleteModal] = useState({ open: false, userId: null, userName: '' });

  const confirmDelete = async () => {
    if (deleteModal.userId) {
      await handleDeleteUser(deleteModal.userId);
      setDeleteModal({ open: false, userId: null, userName: '' });
    }
  };

  const openDeleteModal = (id, name) => {
    setDeleteModal({ open: true, userId: id, userName: name });
  };

  return (
    <div className="animate-fadeIn">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Users Directory</h1>
          <p className="text-gray-400">Manage and view all registered users.</p>
        </div>
        <UserSearch value={search} onChange={setSearch} />
      </div>

      {/* Content Area */}
      {loading && users.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass-card p-6 h-[200px] skeleton"></div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <UserIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No users found</h3>
          <p className="text-gray-400">Try adjusting your search query.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {users.map((u) => (
              <UserCard 
                key={u.id} 
                user={u} 
                onRoleChange={handleChangeRole} 
                onDelete={openDeleteModal} 
              />
            ))}
          </div>

          <UserPagination 
            pagination={pagination} 
            onPageChange={handlePageChange} 
          />
        </>
      )}

      {/* Delete Confirmation */}
      <Modal 
        isOpen={deleteModal.open} 
        onClose={() => setDeleteModal({ open: false, userId: null, userName: '' })}
        title="Confirm Deletion"
      >
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <span className="text-white font-semibold">{deleteModal.userName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal({ open: false, userId: null, userName: '' })}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete User
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
