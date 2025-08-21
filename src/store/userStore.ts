
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login: (email) => set({ user: { email } }),
      logout: () => set({ user: null }),
    }),
    { name: "user-store" } // stored in localStorage
  )
);

export default useUserStore;
