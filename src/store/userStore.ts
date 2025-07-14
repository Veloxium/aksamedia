import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  username: string;
  isLoggedIn: boolean;
  setUsername: (user: string) => void;
  removeUsername: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      username: "",
      isLoggedIn: false,
      setUsername: (user: string) => set({ username: user, isLoggedIn: true }),
      removeUsername: () => set({ username: "", isLoggedIn: false}),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
