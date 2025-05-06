
import React from "react";
import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-[#49BBBD] text-white hover:bg-[#49BBBD]",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  outline: "bg-white border border-[#49BBBD] text-[#49BBBD] hover:bg-[#49BBBD] hover:text-white transition duration-300",
  ghost: "bg-transparent text-white hover:bg-[#49BBBD] hover:text-bold hover:font-bold",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

const CustomButton = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
