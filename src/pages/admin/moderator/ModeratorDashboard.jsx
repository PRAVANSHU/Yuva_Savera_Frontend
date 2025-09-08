import React, { useEffect, useState } from "react";
import axios from "axios";

const ModeratorDashboard = () => {
  const [stats, setStats] = useState({
    pendingContent: 0,
    reportedContent: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/moderator/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.stats || {});
    } catch (error) {
      console.error("Error fetching moderator stats:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white shadow rounded p-6 text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Pending Content</h3>
        <p className="text-3xl font-bold text-orange-500">{stats.pendingContent}</p>
      </div>
      <div className="bg-white shadow rounded p-6 text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Reported Content</h3>
        <p className="text-3xl font-bold text-red-500">{stats.reportedContent}</p>
      </div>
    </div>
  );
};

export default ModeratorDashboard;