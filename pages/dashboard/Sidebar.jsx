import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ onClose }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // Clear the storage where token is present
    // setIsLoggedIn(false); // Update login state
    router.push('/');
  };

  const getLinkClassName = (path) => {
    return router.pathname === path
      ? "flex items-center p-2 bg-indigo-100 border-b-2 rounded font-semibold text-black"
      : "flex items-center p-2 hover:bg-indigo-100 hover:text-black  border-b-2 rounded font-semibold  ";
  };

  return (
    <div className="bg-white h-screen p-4 border-r border-gray-200 md:block">
      {/* Sidebar links */}
      <ul className="space-y-2 mt-4">
        <li>
          <Link
            href=""
            className="flex items-center p-2 bg-indigo-100 border-b-2 border-slate-900 font-semibold text-black"
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-10 ">🖥️</span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>

        </li>
        <li>
          <Link
            href="/dashboard/aibuilder"
            className={getLinkClassName("/dashboard/aibuilder")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">🤖</span>
            <span>AI Resume Builder</span>
          </Link>
        </li>

          
        <li>
          <Link
            href="/"
            className="flex items-center p-2 hover:bg-slate-900 hover:text-white border-b-2 rounded font-semibold"
            onClick={() => {
              handleLogout();
            }}
          >
            <span className="mr-2 ">🔓</span>
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
