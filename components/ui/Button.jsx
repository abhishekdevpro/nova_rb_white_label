import React from "react";
import { Loader, Loader2 } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-blue-900 text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-300",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-300",
  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300",
  outline:
    "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200",
  ghost: `
    bg-transparent 
    text-white 
    border-2 
    border-white 
    px-4 
    py-2 
    font-medium
    transition-colors 
    duration-300 
    ease-in-out
    hover:bg-white 
    hover:text-blue-600 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-200
  `,
  gradient:
    "bg-gradient-blue text-white hover:opacity-90 focus:ring-2 focus:ring-blue-200",

  // 🔒 Disabled variant
  disabled:
    "bg-gray-500 text-gray-900 border border-gray-300 cursor-not-allowed opacity-60 pointer-events-none cursor-disabled",
};

const SIZES = {
  sm: "px-2 py-1 text-sm rounded-md",
  md: "px-5 py-2 text-base rounded-md",
  lg: "px-7 py-3 text-lg rounded-md",
  icon: "p-2 rounded-md", // icon-only button
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold transition duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";

  // Detect if Loader/Loader2 is used → add spin
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (icon.type === Loader || icon.type === Loader2) {
      return React.cloneElement(icon, {
        className: `${icon.props.className || "w-5 h-5"} animate-spin`,
      });
    }
    return icon;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {startIcon && renderIcon(startIcon)}
      {children && <span>{children}</span>}
      {endIcon && renderIcon(endIcon)}
    </button>
  );
}
