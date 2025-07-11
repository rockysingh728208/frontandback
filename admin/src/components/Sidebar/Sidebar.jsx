import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaList, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-full p-6">
      <h2 className="text-2xl font-bold text-red-500 mb-8">Dashboard</h2>

      <ul className="space-y-6 text-lg">
        <li>
          <Link
            to="/add"
            className="flex items-center space-x-3 text-gray-700 hover:text-red-500 transition"
          >
            <FaPlus />
            <span>Add Item</span>
          </Link>
        </li>

        <li>
          <Link
            to="/list"
            className="flex items-center space-x-3 text-gray-700 hover:text-red-500 transition"
          >
            <FaList />
            <span>Item List</span>
          </Link>
        </li>

        <li>
          <Link
            to="/orders"
            className="flex items-center space-x-3 text-gray-700 hover:text-red-500 transition"
          >
            <FaShoppingCart />
            <span>Orders</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
