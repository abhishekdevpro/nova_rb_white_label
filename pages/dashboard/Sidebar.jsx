import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ onClose }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // Clear the storage where token is present
    setIsLoggedIn(false); // Update login state
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
          <Link
            href="/dashboard/page"
            className={getLinkClassName("/dashboard/page")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">👤</span>
            <span>Profile</span>
          </Link>
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
            href="/dashboard/resumelist"
            className={getLinkClassName("/dashboard/resumelist")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">📑</span>
            <span>My Resumes</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/notification"
            className={getLinkClassName("/dashboard/notification")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">🔔</span>
            <span>Notifications</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/skilltest"
            className={getLinkClassName("/dashboard/skilltest")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">📝</span>
            <span>Skill Test</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/addrefferal"
            className={getLinkClassName("/dashboard/addrefferal")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">👥</span>
            <span>Add Referral</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/skillhistorylist"
            className={getLinkClassName("/dashboard/skillhistorylist")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">📊</span>
            <span>Skill history</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/reffrerallistpage"
            className={getLinkClassName("/dashboard/reffrerallistpage")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">👥</span>
            <span>Referral List</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/paymentpage"
            className={getLinkClassName("/dashboard/paymentpage")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">💳</span>
            <span>Payment</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/password"
            className={getLinkClassName("/dashboard/password")}
            onClick={onClose} // Close sidebar on link click
          >
            <span className="mr-2">🔑</span>
            <span>Change Password</span>
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
