import { useState } from "react";
import useUserStore from "../store/userStore";
import { LogOut, UserRoundPen } from "lucide-react";
import ThemeToggle from "./toggletheme";

function ZNavbar() {
  const username = useUserStore((state) => state.username);
  const removeUsername = useUserStore((state) => state.removeUsername);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleLogout = () => {
    removeUsername();
    setShowDropdown(false);
  };

  return (
    <nav className="bg-zgradient shadow-md p-4 text-white dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Velox.
        </a>
        <div className="space-x-8 flex items-center">
          <div>
            <ThemeToggle />
          </div>
          <div>
            <a href="//profile">
              <UserRoundPen className="hover:bg-white hover:text-zprimary p-1 w-8 h-8 rounded-full dark:hover:bg-zinc-800 dark:hover:text-white" />
            </a>
          </div>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded px-4 py-2 border border-white text-sm font-medium text-white hover:bg-white hover:text-zprimary focus:outline-none dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white"
              onClick={() => setShowDropdown((prev) => !prev)}
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {username ? `${username}` : "User Not Logged In"}
              <svg
                className="md:-mr-1 md:ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.02 1.1l-4.25 3.84a.75.75 0 01-1.02 0l-4.25-3.84a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showDropdown && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-zprimary ring-opacity-5 focus:outline-none z-10 dark:bg-zinc-800 dark:ring-zinc-700"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={handleLogout}
                  >
                    <span className="flex items-center justify-center gap-2 font-medium">
                      Logout <LogOut size={18} />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ZNavbar;
