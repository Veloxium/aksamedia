import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeState {
    theme: string;
    setTheme: (theme: string) => void;
}

const useThemeStore = create(
    persist<ThemeState>(
        (set) => ({
            theme: "light", // default theme
            setTheme: (theme: string) => set({ theme }),
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useThemeStore;
