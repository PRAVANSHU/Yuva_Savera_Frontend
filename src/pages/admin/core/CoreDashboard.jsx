import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ManageRequests from "./ManageRequests";
import ManageUsers from "./ManageUsers";
import Reports from "./Reports";
import Settings from "./Settings";

const CoreDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <main className="bg-white rounded-lg shadow p-4">
        <Routes>
          <Route path="/" element={<Navigate to="requests" replace />} />
          <Route path="requests" element={<ManageRequests />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default CoreDashboard;