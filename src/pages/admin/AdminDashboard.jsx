import React, { useEffect, useState } from "react";
import axios from "axios";

// Core Components
import CoreDashboard from "./core/CoreDashboard";
import ManageRequests from "./core/ManageRequests";
import ManageUsers from "./core/ManageUsers";
import Reports from "./core/Reports";
import Settings from "./core/Settings";

// District Components
import DistrictDashboard from "./district/DistrictDashboard";
import DistrictRequests from "./district/DistrictRequests";
import Volunteers from "./district/Volunteers";
import DistrictReports from "./district/DistrictReports";

// Moderator Components
import ModeratorDashboard from "./moderator/ModeratorDashboard";
import ContentApproval from "./moderator/ContentApproval";
import ReportedContent from "./moderator/ReportedContent";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authorized");

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data.user);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not authorized.</p>;

  switch (user.role) {
    case "core_admin":
      return (
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold mb-4"></h1>
          <CoreDashboard />
          <ManageRequests />
          <ManageUsers />
          <Reports />
          <Settings />
        </div>
      );

    case "district_lead":
      return (
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold mb-4">District Lead Dashboard</h1>
          <DistrictDashboard />
          <DistrictRequests />
          <Volunteers />
          <DistrictReports />
        </div>
      );

    case "moderator":
      return (
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold mb-4">Moderator Dashboard</h1>
          <ModeratorDashboard />
          <ContentApproval />
          <ReportedContent />
        </div>
      );

    default:
      return <p>You do not have permission to access this page.</p>;
  }
};

export default AdminDashboard;
