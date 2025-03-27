// import React, { useState } from 'react';

// const colors = [
//   { name: 'None', value: '' },
//   { name: 'Nobel Grey', value: '#6D7278' },
//   { name: 'Oxford Blue', value: '#2563EB' },
//   // { name: 'Electric Lilac', value: '#b19cd9' },
//   { name: 'Purple', value: '#9333EA' },
//   // { name: 'Turquoise', value: '#00b5ad' },
//   { name: 'Jungle Green', value: '#16A34A' },
//   { name: 'Indian Red', value: '#DC2626' },
//   { name: 'Tuscan Yellow', value: '#EAB308' },
// ];

// const ColorPicker = ({ selectedColor, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleColorSelect = (color) => {
//     onChange(color);
//     setIsOpen(false); // Close the dropdown after selection
//   };

//   return (
//     <div className="relative flex items-center m-2 z-20 ">
//       <button
//         onClick={handleToggleDropdown}

//         className="hidden sm:block rounded-lg border-2 border-blue-800 px-8 p-1 font-bold  bg-white text-blue-800"
//         style={{ backgroundColor: selectedColor || 'transparent' }}
//       >
//     <span className="">Background Color</span>

//       </button>
//       <button
//         onClick={handleToggleDropdown}
//         className="sm:hidden rounded-lg border-2 border-blue-800 px-5 py-2 font-bold  bg-white text-blue-800"
//         style={{ backgroundColor: selectedColor || 'transparent' }}
//       >
//      Color
//       </button>
//       {isOpen && (
//         <div className="absolute top-10 mt-2  bg-white border rounded-3xl shadow-lg z-50">
//           <div className="flex  p-5 space-x-4 bg-white rounded-3xl">
//             {colors.map((color, index) => {
//               const isSelected = selectedColor === color.value;
//               const hoverStyle = {
//                 backgroundColor: color.value,
//                 borderColor: isSelected ? 'black' : 'gray',
//               };

//               return (
//                 <div
//                   key={index}
//                   onClick={() => handleColorSelect(color.value)}
//                   className={`w-6 h-6 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
//                     isSelected ? 'border-blue-80 shadow-lg shadow-blue-500' : 'border-gray-300'
//                   } hover:border-black`}
//                   style={hoverStyle}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ColorPicker;
import React, { useState, useEffect } from "react";
import axios from "axios";

const allColors = [
  { name: "None", value: "" },
  { name: "Nobel Grey", value: "#6D7278" },
  { name: "Oxford Blue", value: "#2563EB" },
  { name: "Purple", value: "#9333EA" },
  { name: "Jungle Green", value: "#16A34A" },
  { name: "Indian Red", value: "#DC2626" },
  { name: "Tuscan Yellow", value: "#EAB308" },
];

// Free users only see first 2 colors
const freeColors = allColors.slice(1, 3);

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Unauthorized. Please log in.");
          return;
        }

        const response = await axios.get(
          "https://apiwl.novajobs.us/api/jobseeker/user-profile",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          setUserPlan(response.data.data.plan_id);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false); // Close dropdown after selection
  };

  const colors = userPlan === 1 ? freeColors : allColors; // Apply restriction

  return (
    <div className="relative flex items-center m-2 z-20">
      <button
        onClick={handleToggleDropdown}
        className="hidden sm:block rounded-lg border-2 border-blue-800 px-8 p-1 font-bold bg-white text-blue-800"
        style={{ backgroundColor: selectedColor || "transparent" }}
      >
        <span>Background Color</span>
      </button>
      <button
        onClick={handleToggleDropdown}
        className="sm:hidden rounded-lg border-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
        style={{ backgroundColor: selectedColor || "transparent" }}
      >
        Color
      </button>

      {isOpen && (
        <div className="absolute top-10 mt-2 bg-white border rounded-3xl shadow-lg z-50">
          <div className="flex p-5 space-x-4 bg-white rounded-3xl">
            {colors.map((color, index) => {
              const isSelected = selectedColor === color.value;
              const hoverStyle = {
                backgroundColor: color.value,
                borderColor: isSelected ? "black" : "gray",
              };

              return (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color.value)}
                  className={`w-6 h-6 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "border-blue-80 shadow-lg shadow-blue-500"
                      : "border-gray-300"
                  } hover:border-black`}
                  style={hoverStyle}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
