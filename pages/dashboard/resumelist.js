"use client"
import MyResume from "../../components/ProfileDasboard/MyResume";
import Navbar from "../Navbar/Navbar";
import Sidebar from "./Sidebar";
import React, { useState } from "react";


export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
   
    <div className="min-h-screen flex flex-col items-center bg-brand-lightblue">
      <div className="w-full shadow-md">
        <Navbar />
      </div>
      <div className=" flex flex-col md:flex-row justify-start items-start flex-1 w-full bg-surface rounded-lg shadow-md overflow-hidden ">
        {/* <Sidebar /> */}

        <div className="h-[calc(100vh-70px)] overflow-y-auto scrollbar-thin flex-1 w-full max-w-8xl py-4 px-4 overflow-auto ">
          <MyResume />
        </div>
      </div>
    </div>
  );
}
