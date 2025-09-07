import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, X, MapPin, Clock, User, AlertCircle } from "lucide-react";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch all requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Error fetching requests:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve or reject a request
const handleApprove = async (id, action) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `http://localhost:5000/api/requests/${id}/admin-status`,
      { action },  // backend expects action here
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response:", res.data); // debug
    fetchRequests();

    // Update modal immediately if it's open
    if (selectedRequest?._id === id) {
      setSelectedRequest((prev) => ({
        ...prev,
        adminStatus: action === "approve" ? "approved" : "rejected",
      }));
    }
  } catch (error) {
    console.error("Error updating request:", error.response?.data || error.message);
    alert("Failed to update request. Check console.");
  }
};

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading requests...</p>;
  if (!requests.length) return <p className="p-4 text-center">No requests found.</p>;

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-orange-500">
            <tr>
              <th className="border px-4 py-2 text-left text-white font-semibold">Title</th>
              <th className="border px-4 py-2 text-left text-white font-semibold">Submitted By</th>
              <th className="border px-4 py-2 text-left text-white font-semibold">Status</th>
              <th className="border px-4 py-2 text-left text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{req.title}</td>
                <td className="border px-4 py-2">{req.submittedBy?.name || "Anonymous"}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.adminStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : req.adminStatus === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {req.adminStatus}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2 items-center">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    onClick={async () => {
                      await handleApprove(req._id, "approve");
                    }}
                    disabled={req.adminStatus !== "pending"}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    onClick={async () => {
                      await handleApprove(req._id, "reject");
                    }}
                    disabled={req.adminStatus !== "pending"}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded transition-colors"
                    onClick={() => setSelectedRequest(req)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for request details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-orange-500 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{selectedRequest.title}</h2>
                <button className="text-white hover:text-gray-200 transition-colors" onClick={() => setSelectedRequest(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm capitalize">{selectedRequest.urgency}</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">
                    {selectedRequest.location
                      ? `${selectedRequest.location.address || ""}, ${selectedRequest.location.city || ""}, ${selectedRequest.location.state || ""}`
                      : "Not specified"}
                  </span>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full capitalize">
                  <span className="text-sm">{selectedRequest.category}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <User size={18} className="mr-2" /> Requester Information
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedRequest.submittedBy?.name }</p>
                    <p><span className="font-medium">Email:</span> {selectedRequest.submittedBy?.email }</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <AlertCircle size={18} className="mr-2" /> Request Status
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedRequest.adminStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedRequest.adminStatus === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedRequest.adminStatus}
                      </span>
                    </p>
                    <p><span className="font-medium">Submitted:</span> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedRequest.description || "No description provided."}</p>
                </div>
              </div>

              {selectedRequest.media?.video?.url && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Attached Video</h3>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <video src={selectedRequest.media.video.url} controls className="w-full h-auto max-h-96" />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 p-4 rounded-b-xl flex justify-end space-x-3">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={async () => {
                  await handleApprove(selectedRequest._id, "reject");
                  setSelectedRequest(null);
                }}
                disabled={selectedRequest.adminStatus !== "pending"}
              >
                Reject Request
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={async () => {
                  await handleApprove(selectedRequest._id, "approve");
                  setSelectedRequest(null);
                }}
                disabled={selectedRequest.adminStatus !== "pending"}
              >
                Approve Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
