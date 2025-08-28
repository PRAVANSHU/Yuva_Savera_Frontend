import React, { useEffect, useState } from "react";
import axios from "axios";

const DistrictRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/district/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Error fetching requests:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/admin/approve-request`,
        { requestId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error approving request:", error.response?.data || error.message);
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
            <th className="border px-4 py-2">Requestor</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="border px-4 py-2">{req.user?.name || "N/A"}</td>
              <td className="border px-4 py-2">{req.type}</td>
              <td className="border px-4 py-2 capitalize">{req.status}</td>
              <td className="border px-4 py-2">
                {req.status === "pending" && (
                  <button
                    onClick={() => approveRequest(req._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictRequests;
