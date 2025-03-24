import { useRouter } from "next/router";
import logo from "./Navbar/logo.jpg";
import Image from "next/image";
import Link from "next/link";
const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="flex-shrink-0 flex items-center">
        <Link href="/">
          <Image
            src="https://novajobs.us/static/media/NovaUS.649f79957e5090a75022.png"
            alt="logo"
            className="h-10 w-40"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
        {/* <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
        >
          Go to Login
        </button> */}
      </div>
    </div>
  );
};

export default Custom404;
