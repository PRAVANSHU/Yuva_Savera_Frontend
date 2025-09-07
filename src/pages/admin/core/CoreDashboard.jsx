import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "../../../components/Layout/AdminNavbar";
import Dashboard from "./Dashboard";
import ManageRequests from "./ManageRequests";
import ManageUsers from "./ManageUsers";
import Reports from "./Reports";
import Settings from "./Settings";
import CaseTracking from "./CaseTracking";
import VolunteerManagement from "./VolunteerManagement";
import Notifications from "./Notifications";
import ManageModerators from "./ManageModerators";

const CoreDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="requests" element={<ManageRequests />} />
          <Route path="cases" element={<CaseTracking />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="volunteers" element={<VolunteerManagement />} />
          <Route path="moderators" element={<ManageModerators />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          
        </Routes>
      </main>
    </div>
  );
};

export default CoreDashboard;
