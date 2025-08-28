import React, { useEffect, useState } from "react";
import axios from "axios";
import ManageRequests from "./ManageRequests";
import ManageUsers from "./ManageUsers";
import Reports from "./Reports";
import Settings from "./Settings";

const CoreDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  const renderTab = () => {
    switch (activeTab) {
      case "requests":
        return <ManageRequests />;
      case "users":
        return <ManageUsers />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <ManageRequests />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Core Admin Dashboard
        </h1>
        <nav className="mt-4 flex flex-wrap gap-3">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "requests" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Manage Requests
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "users" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Manage Users
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "reports" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "settings" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </nav>
      </header>

      <main className="bg-white rounded-lg shadow p-4">{renderTab()}</main>
    </div>
  );
};

export default CoreDashboard;
