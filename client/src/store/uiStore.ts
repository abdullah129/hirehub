import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // View mode (table/kanban)
  viewMode: 'table' | 'kanban';
  setViewMode: (mode: 'table' | 'kanban') => void;

  // Modals
  isJobModalOpen: boolean;
  selectedJobId: string | null;
  openJobModal: (jobId: string) => void;
  closeJobModal: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar state
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      // Theme state
      theme: 'system',
      setTheme: (theme) => set({ theme }),

      // View mode
      viewMode: 'table',
      setViewMode: (mode) => set({ viewMode: mode }),

      // Modal state
      isJobModalOpen: false,
      selectedJobId: null,
      openJobModal: (jobId) => set({ isJobModalOpen: true, selectedJobId: jobId }),
      closeJobModal: () => set({ isJobModalOpen: false, selectedJobId: null }),
    }),
    {
      name: 'hirehub-ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        viewMode: state.viewMode,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);
