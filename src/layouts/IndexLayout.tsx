import React from "react";
import ZNavbar from "../components/znavbar";
import useThemeStore from "../store/themeStore";

function IndexLayout({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme); 
  return (
    <div
      className={`${
        theme == "dark" ? "dark" : ""
      } min-h-screen dark:bg-zinc-800 dark:text-white`}
    >
      <ZNavbar />
      {children}
    </div>
  );
}

export default IndexLayout;
