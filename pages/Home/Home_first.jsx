import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../public/Images/homeimage1.jpg"
import image2 from "../../public/Images/homeimage2.jpg";
import image3 from "../../public/Images/homeimage3.jpg";
import Image from "next/image";
import Home_second from "./Home_second";
import { useEffect, useState } from "react";

function Home_first() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token (you can adjust based on where the token is stored)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const images = [image1, image2, image3];
  // const images = [
  //   "https://novajobs.us/airesume/_next/image/?url=/_next%2Fstatic%2Fmedia%2Fhomeimage1.279420aa.jpg&w=3840&q=75",
  //   "https://novajobs.us/airesume/_next/image/?url=/_next%2Fstatic%2Fmedia%2Fhomeimage2.03e664f8.jpg&w=3840&q=75",
  //   "https://novajobs.us/airesume/_next/image/?url=/_next%2Fstatic%2Fmedia%2Fhomeimage3.837b3f06.jpg&w=3840&q=75=75"
    
  // ];

  return (
    <>
      <div className="bg-blue-100 pt-10">
        <div className="flex justify-center">
          <a
            href="#phone"
            className="text-black bg-red-300 px-3 py-4 rounded-3xl font-bold text-center sm:hidden"
          >
            Contact us
          </a>
        </div>
        <div className="py-9 px-5 w-screen flex gap-3 md:gap-10 md:justify-evenly items-center flex-col md:flex-row">
          <div className="px-6 py-3" id="bghome">
            <div className=" hidden md:block md:w-80 md:max-w-lg p-4">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      //   src="https://marketplace.canva.com/EAFszEvkM50/2/0/1131w/canva-simple-professional-cv-resume-36p5VOFVDxY.jpg"
                      alt="logo"
                      width={800}
                      height={600}
                      className=" md:h-auto md:w-80 transition-transform transform hover:scale-105"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="px-3 py-3 w-full md:w-[500px]">
            <div className="flex flex-col gap-4">
              <div className="font-extrabold text-3xl md:text-5xl font-sans text-center md:text-left">
                AI Enabled, Novajobs.US Builder
              </div>
              <div className="text-lg font-medium text-slate-700 text-center md:text-left">
                Resume Score, Enhanced Resume & much more. Now Apply for a Job
                with confidence with our all in one solution under one roof.
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {/* <Link href={isAuthenticated?"/dashboard":"/signup"}> */}
                <Link href={"/dashboard/resume-builder"}>
                  <button className="px-6 py-2 text-lg rounded-full font-bold bg-blue-700 text-white hover:shadow-2xl hover:shadow-slate-500">
                    Get Started For Free
                  </button>
                </Link>
                {/* <Link href={isAuthenticated?"/dashboard":"/login2"}> */}
                <Link href={"/dashboard"}>
                  <button className="text-black text-lg px-6 py-2 rounded-full font-bold bg-white hover:shadow-2xl hover:shadow-slate-500">
                    Build your Resume
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Home_second />
    </>
  );
}

export default Home_first;
