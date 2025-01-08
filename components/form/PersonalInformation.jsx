import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
// import { ResumeContext } from "../../pages/builder";

const PersonalInformation = () => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

  return (
    <div className="flex flex-col items-center gap-4 p-4 md:p-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black text-center">
        Detail Information
      </h2>

      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        <div className="flex flex-col items-center gap-4 w-full">
          <img
            src={resumeData.profilePicture || dummyImage}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg object-cover"
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            className="bg-gray-300 text-sm text-black py-2 px-4 rounded-lg w-full max-w-sm"
            onChange={handleProfilePicture}
            placeholder="Profile Picture"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="w-full p-2 border border-black rounded-lg text-sm sm:text-base"
            value={resumeData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="w-full p-2 border border-black rounded-lg text-sm sm:text-base"
            value={resumeData.position}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Contact Information"
            name="contactInformation"
            className="w-full p-2 border border-black rounded-lg text-sm sm:text-base"
            value={resumeData.contactInformation}
            onChange={handleChange}
            minLength="10"
            maxLength="15"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-2 border border-black rounded-lg text-sm sm:text-base"
            value={resumeData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            className="w-full p-2 border border-black rounded-lg text-sm sm:text-base"
            value={resumeData.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
