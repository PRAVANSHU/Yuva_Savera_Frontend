// src/pages/admin/moderator/ModeratorDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/Layout/AdminNavbar"; // adjust path if needed

const ModeratorDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="p-6">
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
};

export default ModeratorDashboardLayout;
