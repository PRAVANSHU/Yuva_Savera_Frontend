import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Error fetching requests:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/admin/approve-request",
        { requestId: id, action: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;
  if (!requests.length) return <p>No requests found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="border px-4 py-2">{req.name}</td>
              <td className="border px-4 py-2">{req.email}</td>
              <td className="border px-4 py-2 capitalize">{req.status}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleApprove(req._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleApprove(req._id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
