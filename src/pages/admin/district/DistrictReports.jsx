import React, { useEffect, useState } from "react";
import axios from "axios";

const DistrictReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/district/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data.reports || []);
    } catch (error) {
      console.error("Error fetching reports:", error.response?.data || error.message);
    } finally {
      setLoading(false);
  }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (!reports.length) return <p>No reports found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Submitted By</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td className="border px-4 py-2">{report.title}</td>
              <td className="border px-4 py-2">{report.user?.name || "N/A"}</td>
              <td className="border px-4 py-2">{new Date(report.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2 capitalize">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictReports;
