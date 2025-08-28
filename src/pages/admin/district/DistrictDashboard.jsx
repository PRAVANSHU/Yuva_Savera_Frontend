import React, { useEffect, useState } from "react";
import axios from "axios";

const DistrictDashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    approvedRequests: 0,
    volunteers: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/district/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.stats || {});
    } catch (error) {
      console.error("Error fetching district stats:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Total Requests</h3>
        <p className="text-2xl">{stats.totalRequests}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Approved Requests</h3>
        <p className="text-2xl">{stats.approvedRequests}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Volunteers</h3>
        <p className="text-2xl">{stats.volunteers}</p>
      </div>
    </div>
  );
};

export default DistrictDashboard;
