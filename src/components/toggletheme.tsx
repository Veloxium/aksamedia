import { useState } from "react";
import useThemeStore from "../store/themeStore";

export default function ThemeToggle() {
  const [isShowSelect, setIsShowSelect] = useState<boolean>(false);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [selectedTheme, setSelectedTheme] = useState<
    "light" | "dark" | "system"
  >("light");

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setSelectedTheme(newTheme);
    setIsShowSelect(false);
    if (newTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      return;
    }
    setTheme(newTheme);
  };

  return (
    <div className="relative">
      <button
        className="px-2 py-1 rounded border dark:border-zinc-800"
        onClick={() => setIsShowSelect((prev) => !prev)}
      >
        {selectedTheme == "light"
          ? "☀️"
          : selectedTheme == "dark"
          ? "🌙"
          : "🖥️"}
      </button>
      {isShowSelect && (
        <div className="absolute z-10 mt-2 flex flex-col gap-2 px-2 py-1 rounded dark:bg-gray-700 text-black border border-white dark:border-white bg-white">
          <div
            onClick={() => handleThemeChange("light")}
            className={`cursor-pointer px-2 py-1 rounded text-center ${
              selectedTheme === "light"
                ? "bg-yellow-200 dark:bg-yellow-600 font-bold"
                : "bg-white dark:bg-gray-700"
            }`}
            title="Light"
          >
            ☀️
          </div>
          <div
            onClick={() => handleThemeChange("dark")}
            className={`cursor-pointer px-2 py-1 rounded text-center ${
              selectedTheme === "dark"
                ? "bg-blue-200 dark:bg-blue-600 font-bold"
                : "bg-white dark:bg-gray-700"
            }`}
            title="Dark"
          >
            🌙
          </div>
          <div
            onClick={() => handleThemeChange("system")}
            className={`cursor-pointer px-2 py-1 rounded text-center ${
              selectedTheme === "system"
                ? "bg-green-200 dark:bg-green-600 font-bold"
                : "bg-white dark:bg-gray-700"
            }`}
            title="System"
          >
            🖥️
          </div>
        </div>
      )}
    </div>
  );
}
