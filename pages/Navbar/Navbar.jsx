import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../Navbar/logo.png";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FileCog,
  FileText,
  Grid,
  Home,
  LogIn,
  LogOut,
  Mail,
  Settings,
  User,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [photo, setPhoto] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();
  // const axiosInstance = axios.create();

  // useEffect(() => {
  //   const interceptor = axiosInstance.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       console.log(error.response.status,">>>>>>");
  //       if (error.response?.status === 401) {
  //         // handleLogout();
  //         console.log("i am called logout");
  //         localStorage.removeItem("token");
  //     // toast.success("Logout successfully")
  //     router.push('https://novajobs.us/user/login')
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axiosInstance.interceptors.response.eject(interceptor);
  //   };
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      const checkApiSuccess = async () => {
        try {
          const response = await axios.get(
            "https://apiwl.novajobs.us/api/jobseeker/user-profile",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.data.status === "success") {
            setIsApiSuccess(true);
            setUser(response.data.data.first_name);
            setPhoto(response.data.data.photo);
          } else {
            setIsApiSuccess(false);
          }
        } catch (error) {
          console.log(error, ">>>>");
          setIsApiSuccess(false);
        }
      };

      checkApiSuccess();
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://apiwl.novajobs.us/api/user/auth/logout",
        { token },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.removeItem("token");
      toast.success("Logout successfully");
      router.push("https://novajobs.us/user/login");
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
      localStorage.removeItem("token");
      toast.success("Logout successfully");
      router.push("https://novajobs.us/user/login");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="https://novajobs.us/static/media/NovaUS.649f79957e5090a75022.png"
                alt="logo"
                width={160}
                height={40}
                className="h-10 w-40"
              />
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center space-x-4">
            {isLoggedIn ? (
              <div>
                <Link
                  href="/dashboard"
                  className="text-black px-3 py-2 rounded-md text-lg font-semibold"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/resumelist"
                  className="text-black px-3 py-2 rounded-md text-lg font-semibold"
                >
                  My Resumes
                </Link>
                <Link
                  href="/dashboard/cvletterlist"
                  className="text-black px-3 py-2 rounded-md text-lg font-semibold"
                >
                  Cover Letters
                </Link>
                {/* <Link
                  href="/dashboard/myjobs"
                  className="text-black px-3 py-2 rounded-md text-lg font-semibold"
                >
                  My Jobs
                </Link> */}
              </div>
            ) : (
              <></>
            )}
            {/* <Link
              href="/navbarcontent"
              className="text-black px-3 py-2 rounded-md text-lg font-semibold"
            >
              AI Resume Builder
            </Link> */}

            {/* <Link
              href="/footers/Aboutus"
              className="text-black px-3 py-2 rounded-md text-lg font-semibold"
            >
              About Us
            </Link> */}
            {/* <Link
              href="#phone"
              className="text-black px-3 py-2 rounded-md text-lg font-semibold"
            >
              📞 Contact us
            </Link> */}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center bg-white text-black px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  <Image
                    src={
                      photo
                        ? `https://apiwl.novajobs.us${photo}`
                        : "https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg"
                    }
                    alt="User"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />

                  <span className="ml-2 text-black">
                    {user ? user : "profile"}
                  </span>
                </button>
                {isDropdownOpen && (
                  // <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black">
                  //   <Link
                  //     href="https://novajobs.us/user/jobs-profile"
                  //     className="block px-4 py-2 hover:bg-gray-200"
                  //     onClick={() => setIsDropdownOpen(false)}
                  //   >
                  //     Profile
                  //   </Link>
                  //   <Link
                  //     href="/dashboard"
                  //     className="block px-4 py-2 hover:bg-gray-200"
                  //     onClick={() => setIsDropdownOpen(false)}
                  //   >
                  //     Dashboard
                  //   </Link>

                  //   <Link
                  //     href="/dashboard/resumelist"
                  //     className="block px-4 py-2 hover:bg-gray-200"
                  //   >
                  //     My Resumes
                  //   </Link>
                  //   <Link
                  //     href="/dashboard/cvletterlist"
                  //     className="block px-4 py-2 hover:bg-gray-200"
                  //   >
                  //     Cover Letter
                  //   </Link>
                  //   <button
                  //     onClick={() => {
                  //       handleLogout();
                  //       setIsDropdownOpen(false);
                  //     }}
                  //     className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  //   >
                  //     Logout
                  //   </button>
                  // </div>
                  <div className="absolute right-0 mt-2 w-48 z-50 bg-white shadow-lg rounded-md text-black">
                    <Link
                      href="https://novajobs.us/user/jobs-profile"
                      className="block px-4 py-2 hover:bg-gray-200 flex items-center space-x-2"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="w-5 h-5 text-gray-500" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className=" px-4 py-2 hover:bg-gray-200 flex items-center space-x-2"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Grid className="w-5 h-5 text-gray-500" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/dashboard/resumelist"
                      className="px-4 py-2 hover:bg-gray-200 flex items-center space-x-2"
                    >
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span>My Resumes</span>
                    </Link>
                    <Link
                      href="/dashboard/cvletterlist"
                      className=" px-4 py-2 hover:bg-gray-200 flex items-center space-x-2"
                    >
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span>Cover Letter</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="px-4 py-2 hover:bg-gray-200 flex items-center space-x-2"
                    >
                      <Settings className="w-5 h-5 text-gray-500" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center space-x-2"
                    >
                      <LogOut className="w-5 h-5 text-gray-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="https://novajobs.us/user/login"
                  className="text-black px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  Log in
                </Link>
                {/* <Link
                  href="/signup"
                  className="text-black px-4 py-2 text-md font-semibold border-2 rounded-xl"
                >
                  Sign up
                </Link> */}
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMenuClick}
              className="text-black hover:text-gray-700 focus:outline-none px-3 py-2 rounded-md text-sm font-medium"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - Slide over */}
        {/* <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleMenuClick}
        >
          <div
            className={`fixed inset-y-0 right-0 max-w-xs w-[80%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-black">Menu</h2>
              <button
                onClick={handleMenuClick}
                className="text-black hover:text-gray-300"
              >
               <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-4 py-6 space-y-6">

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-black text-lg font-semibold hover:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/resumelist"
                    className="block text-black text-lg font-semibold hover:text-gray-300"
                  >
                    My Resumes
                  </Link>
                  <Link
                    href="/dashboard/cvletterlist"
                    className="block text-black text-lg font-semibold hover:text-gray-300"
                  >
                    Cover Letter
                  </Link>
                  {/* <Link
                    href="/dashboard/myjobs"
                    className="block text-black text-lg font-semibold hover:text-gray-300"
                  >
                    My Jobs
                  </Link>
                  <Link
                    href="/dashboard/page"
                    className="block text-black text-lg font-semibold hover:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleLinkClick();
                    }}
                    className="block w-full text-left text-black text-lg font-semibold hover:text-gray-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <Link
                    href="https://novajobs.us/user/login"
                    className="block text-black text-lg font-semibold hover:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    Log in
                  </Link>
                  {/* <Link
                    href="/signup"
                    className="block text-black text-lg font-semibold hover:text-gray-300"
                    onClick={handleLinkClick}
                  >
                    Sign up
                  </Link> 
                </div>
              )}
            </div>
          </div>
        </div> */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 md:hidden ${
            isMenuOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleMenuClick}
        >
          <div
            className={`fixed inset-y-0 right-0 w-[280px] bg-white/95 shadow-2xl transform transition-all duration-300 ease-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button
                onClick={handleMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <nav className="p-5 space-y-2">
              {isLoggedIn ? (
                <>
                  <MenuLink
                    href="/dashboard"
                    icon={<Home />}
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </MenuLink>

                  <MenuLink href="/dashboard/resumelist" icon={<FileText />}>
                    My Resumes
                  </MenuLink>

                  <MenuLink href="/dashboard/cvletterlist" icon={<Mail />}>
                    Cover Letter
                  </MenuLink>

                  <MenuLink
                    href="/dashboard/page"
                    icon={<User />}
                    onClick={handleLinkClick}
                  >
                    Profile
                  </MenuLink>
                  <MenuLink
                    href="/settings"
                    icon={<Settings />}
                    onClick={handleLinkClick}
                  >
                    Settings
                  </MenuLink>

                  <button
                    onClick={() => {
                      handleLogout();
                      handleLinkClick();
                    }}
                    className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <LogOut className="w-5 h-5 mr-3 group-hover:text-blue-600" />
                    <span className="font-medium group-hover:text-blue-600">
                      Logout
                    </span>
                  </button>
                </>
              ) : (
                <MenuLink
                  href="https://novajobs.us/user/login"
                  icon={<LogIn />}
                  onClick={handleLinkClick}
                >
                  Log in
                </MenuLink>
              )}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MenuLink = ({ href, children, icon, onClick }) => (
  <Link
    href={href}
    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
    onClick={onClick}
  >
    <span className="w-5 h-5 mr-3 group-hover:text-blue-600">{icon}</span>
    <span className="font-medium group-hover:text-blue-600">{children}</span>
  </Link>
);

export default Navbar;
