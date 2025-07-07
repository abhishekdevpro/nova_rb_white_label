import "/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ResumeProvider } from "../components/context/ResumeContext";
import { CoverLetterProvider } from "../components/context/CoverLetterContext";
import axios from "axios";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const isDashboardRoute = router.pathname.startsWith("/dashboard");
  //   const isAdminRoute = router.pathname.startsWith("/admin");

  //   // Redirect if no token is found
  //   if (isDashboardRoute && !token) {
  //     router.push("https://novajobs.us/");
  //   }

  //   if (isAdminRoute && !token) {
  //     router.push("https://novajobs.us/");
  //   }

  //   // Set up Axios interceptor to catch 401 responses
  //   const interceptor = axios.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (error.response && error.response.status === 401) {
  //         localStorage.removeItem("token"); // Clear token
  //         router.push("https://novajobs.us"); // Redirect to login
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axios.interceptors.response.eject(interceptor);
  //     // console.log("i am called");
  //   };
  // }, [router.pathname]);
  useEffect(() => {
    // --- Global token extraction from URL ---
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const tokenFromUrl = url.split("?tokenbyurl=")[1];
      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
      }
    }

    const token = localStorage.getItem("token");
    const isDashboardRoute = router.pathname.startsWith("/dashboard");
    const isAdminRoute = router.pathname.startsWith("/admin");

    // Redirect if no token is found
    if (isDashboardRoute && !token) {
      router.push("https://novajobs.us/");
    }

    if (isAdminRoute && !token) {
      router.push("https://novajobs.us/");
    }

    // Set up Axios interceptor to catch 401 responses
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token"); // Clear token
          router.push("https://novajobs.us"); // Redirect to login
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [router.pathname]);
  return (
    <>
      <CoverLetterProvider>
        <ResumeProvider>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
        </ResumeProvider>
      </CoverLetterProvider>
    </>
  );
}
