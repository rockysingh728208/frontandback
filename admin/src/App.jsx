import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
  import { ToastContainer } from 'react-toastify';


const App = () => {
  const url="http://localhost:4000";
  return (
    <Router>
      <ToastContainer/>
      <div className="w-screen h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <div className="absolute top-0 left-0 w-[20%] h-screen bg-white shadow-md z-10">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="absolute top-0 left-[20%] w-[80%] h-screen overflow-y-auto">
          <Navbar />
          <div className="p-6">
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url}/>} />
              {/* Default route */}
              <Route path="*" element={<Add />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
