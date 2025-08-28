import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportedContent = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/moderator/reported", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data.reports || []);
    } catch (error) {
      console.error("Error fetching reported content:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p>Loading reported content...</p>;
  if (!reports.length) return <p>No reported content found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Reported By</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.reportedBy?.name || "N/A"}</td>
              <td className="border px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2 capitalize">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedContent;
