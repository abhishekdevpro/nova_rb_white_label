// import '/styles/globals.css'

// // In your component or _app.js
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// _app.js in Next.js
import "/styles/globals.css"; // Your global styles
import "slick-carousel/slick/slick.css"; // Slick Carousel base styles
import "slick-carousel/slick/slick-theme.css"; // Slick Carousel theme styles

// Import react-hot-toast's Toaster

import { useEffect } from "react";
import { useRouter } from "next/router";
import { ResumeProvider } from "../components/context/ResumeContext";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isDashboardRoute = router.pathname.startsWith("/dashboard");

    if (isDashboardRoute && !token) {
      // Save the attempted route
      localStorage.setItem("redirectAfterLogin", router.pathname);
      router.push("/login2"); // Redirect to login if accessing a dashboard route without a token
    }
  }, [router.pathname]);
  return (
    <>
    
     
      <ResumeProvider>
            <Component {...pageProps} />
      {/* <ToastContainer position="top-right" autoClose={3000} pauseOnHover />   */}
      <Toaster />
      </ResumeProvider>
    </>
    
  );
}




 
