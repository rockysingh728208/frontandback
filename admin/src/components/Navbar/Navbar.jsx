import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md h-16 flex items-center justify-between px-6">
      {/* Left: Page Title */}
      <h1 className="text-xl font-semibold text-red-500">Admin Panel</h1>

      {/* Right: User Info */}
      <div className="flex items-center space-x-3">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-gray-700 font-medium">Admin</span>
      </div>
    </div>
  );
};

export default Navbar;
