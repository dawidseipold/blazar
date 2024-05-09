import { create } from "zustand";

const checkSystemTheme = () => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  return theme;
};

// export const useThemeStore = create((set) => ({
//   theme: "system",
//   setTheme: (theme: string) => set({ theme }),
//   setSystemTheme: () => set({ theme: checkSystemTheme() }),
// }));

export const createThemeStore = () => {
  create((set) => ({
    theme: "system",
    setTheme: (theme: string) => set({ theme }),
    setSystemTheme: () => set({ theme: checkSystemTheme() }),
  }));
};
