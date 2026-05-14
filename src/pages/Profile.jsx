import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Camera, User as UserIcon, Mail, Phone, FileText } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { updateProfileApi, uploadAvatarApi } from '../api/user.api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const schema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').max(100).required('Name is required'),
  phone: yup.string().nullable().transform(v => v === '' ? null : v).matches(/^\+?[\d\s\-()]{7,20}$/, { message: 'Invalid phone number', excludeEmptyString: true }),
  bio: yup.string().max(500, 'Bio too long').nullable(),
});

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await updateProfileApi(data);
      updateUser(res.data.data);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setAvatarLoading(true);
    try {
      const res = await uploadAvatarApi(formData);
      updateUser({ avatar: res.data.data.avatarUrl });
      toast.success('Avatar updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setAvatarLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-400">Manage your personal information and settings.</p>
      </div>

      <div className="glass-card p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className={`w-32 h-32 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] relative ${avatarLoading ? 'opacity-50' : ''}`}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center text-purple-400 font-bold text-4xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div 
                  className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="text-white mb-1" size={24} />
                  <span className="text-xs text-white font-medium">Change</span>
                </div>
              </div>
              {avatarLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/jpeg, image/png, image/webp" 
              className="hidden" 
            />
            <div className="text-center">
              <span className={`badge ${user?.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                {user?.role}
              </span>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  icon={UserIcon}
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email (Read-only)"
                  type="email"
                  icon={Mail}
                  value={user?.email}
                  readOnly
                  disabled
                  className="opacity-70 cursor-not-allowed"
                />
              </div>

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 234 567 8900"
                icon={Phone}
                error={errors.phone?.message}
                {...register('phone')}
              />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-sm font-medium text-gray-300 ml-1">Bio</label>
                <div className="relative group">
                  <div className="absolute left-3 top-3 text-gray-500">
                    <FileText size={18} />
                  </div>
                  <textarea
                    className={`
                      w-full bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] 
                      rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500
                      focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50
                      transition-all duration-200 resize-none h-24
                      ${errors.bio ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : ''}
                    `}
                    placeholder="Tell us a little about yourself..."
                    {...register('bio')}
                  ></textarea>
                </div>
                {errors.bio && <span className="text-xs text-red-400 ml-1">{errors.bio.message}</span>}
              </div>

              <div className="flex justify-end mt-2">
                <Button type="submit" isLoading={loading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
