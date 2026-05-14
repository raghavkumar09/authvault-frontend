import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMeApi } from '../api/auth.api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      setAccessToken: (token) => set({ accessToken: token }),

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),

      logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),

      // Fetch current user from API (called on app init)
      fetchMe: async () => {
        const token = get().accessToken;
        if (!token) {
          set({ isLoading: false });
          return;
        }
        try {
          const { data } = await getMeApi();
          set({ user: data.data, isAuthenticated: true, isLoading: false });
        } catch {
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
        }
      },

      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    {
      name: 'authvault-auth',
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);

export default useAuthStore;
