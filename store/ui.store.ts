import { create } from "zustand";

type AuthMode = "login" | "register";

interface UIState {
    isLoginSheetOpen: boolean;
    isSidebarOpen: boolean;
    authMode: AuthMode;
    openLoginSheet: (mode?: AuthMode) => void;
    closeLoginSheet: () => void;
    toggleLoginSheet: () => void;
    setAuthMode: (mode: AuthMode) => void;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isLoginSheetOpen: false,
    isSidebarOpen: false,
    authMode: "login",
    openLoginSheet: (mode = "login") =>
        set({ isLoginSheetOpen: true, authMode: mode }),
    closeLoginSheet: () => set({ isLoginSheetOpen: false }),
    toggleLoginSheet: () =>
        set((state) => ({ isLoginSheetOpen: !state.isLoginSheetOpen })),
    setAuthMode: (mode) => set({ authMode: mode }),
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
