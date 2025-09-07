// src/components/AdminNavbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const safeParse = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const userInfo = safeParse(localStorage.getItem("userInfo"));

  // basePath determines where the logo/title should link
  const basePath =
    userInfo?.role === "moderator" ? "/moderator" : "/admin";

  const getAdminTitle = () => {
    if (!userInfo) return "Admin Panel";
    switch (userInfo.role) {
      case "core_admin":
        return "Core Admin Dashboard";
      case "district_lead":
      case "district_admin":
        return "District Admin Dashboard";
      case "moderator":
        return "Moderator Dashboard";
      default:
        return "Admin Panel";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getDashboardTabs = () => {
    if (!userInfo) return [];

    switch (userInfo.role) {
      case "core_admin":
        return [
          { name: "Dashboard", path: "/admin/dashboard" },
          { name: "Manage Requests", path: "/admin/requests" },
          { name: "Case Tracking", path: "/admin/cases" },
          { name: "Manage Users", path: "/admin/users" },
          { name: "Volunteers", path: "/admin/volunteers" },
              { name: "Manage Moderators", path: "/admin/moderators" }, 
          { name: "Manage Stories", path: "/admin/stories" },
          { name: "Reports", path: "/admin/reports" },
        ];

      case "district_lead":
      case "district_admin":
        return [
          { name: "Dashboard", path: "/admin/dashboard" },
          { name: "Manage Requests", path: "/admin/requests" },
          { name: "Case Tracking", path: "/admin/cases" },
          { name: "Volunteers", path: "/admin/volunteers" },
          { name: "Reports", path: "/admin/reports" },
          { name: "Settings", path: "/admin/settings" },
        ];

      case "moderator":
        // 🔁 IMPORTANT: use /moderator/* here (matches your App routes)
        return [
          { name: "Dashboard", path: "/moderator/dashboard" },
          { name: "Content Approval", path: "/moderator/content" },
          { name: "Reported Content", path: "/moderator/reported" },
        ];

      default:
        return [];
    }
  };

  const dashboardTabs = getDashboardTabs();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Title should link to the correct root */}
          <Link to={basePath} className="text-2xl font-bold text-gray-800">
            {getAdminTitle()}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {dashboardTabs.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {userInfo && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors duration-200"
                >
                  <span>{userInfo.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 border border-gray-200"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-orange-500 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-white border-t border-gray-200 mt-2 rounded-lg shadow-md"
            >
              <div className="flex flex-col p-2">
                {dashboardTabs.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 text-sm rounded-md ${
                      isActive(item.path)
                        ? "text-orange-500 bg-gray-100"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {userInfo && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 mt-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default AdminNavbar;
