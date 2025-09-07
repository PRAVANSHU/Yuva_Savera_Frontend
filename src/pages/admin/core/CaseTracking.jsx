import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../components/UI/Button";

const CaseTracking = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    urgency: "",
    category: "",
    search: "",
  });

  const token = localStorage.getItem("token");

const fetchCases = async (initialLoad = false) => {
  if (initialLoad) setLoading(true);
  try {
    const res = await axios.get("http://localhost:5000/api/requests", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Adjusted for backend response structure
    const newCases = res.data.requests || [];

    const mappedCases = newCases.map((c) => ({
      ...c,
      status: c.status === "Approved" ? "Open" : c.status,
    }));

    setCases((prev) => {
      const prevString = JSON.stringify(prev);
      const newString = JSON.stringify(mappedCases);
      return prevString !== newString ? mappedCases : prev;
    });
  } catch (err) {
    console.error("Error fetching cases:", err);
  } finally {
    if (initialLoad) setLoading(false);
  }
};

  useEffect(() => {
    fetchCases(true);
    const interval = setInterval(() => fetchCases(false), 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredCases = cases.filter((c) => {
    const statusMatch = filters.status ? c.status === filters.status : true;
    const urgencyMatch = filters.urgency ? c.urgencyLevel === filters.urgency : true;
    const categoryMatch = filters.category ? c.category === filters.category : true;
    const searchMatch = filters.search
      ? c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.requestId.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return statusMatch && urgencyMatch && categoryMatch && searchMatch;
  });

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCases((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
      alert("Failed to update status.");
    }
  };

  const assignVolunteer = async (id, volunteerId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${id}/assign`,
        { volunteerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCases((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, assignedVolunteer: volunteerId } : c
        )
      );
    } catch (err) {
      console.error("Error assigning volunteer:", err.response?.data || err.message);
      alert("Failed to assign volunteer.");
    }
  };

  return (
    <div className="p-6">

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Case ID or Title"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <select
          value={filters.urgency}
          onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Urgency</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Employment">Employment</option>
          <option value="Counseling">Counseling</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>

      {/* Cases Table */}
      {loading ? (
        <p>Loading cases...</p>
      ) : filteredCases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-orange-500">
              <tr>
                <th className="border px-4 py-2 text-left text-white font-semibold">Case ID</th>
                <th className="border px-4 py-2 text-left text-white font-semibold">Title</th>
                <th className="border px-4 py-2 text-left text-white font-semibold">Requester</th>
                <th className="border px-4 py-2 text-left text-white font-semibold">Status</th>
                <th className="border px-4 py-2 text-left text-white font-semibold">Urgency</th>
                <th className="border px-4 py-2 text-left text-white font-semibold">Category</th>
                <th className="border px-4 py-2 text-left text-white font-semibold">Assigned Volunteer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCases.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{c.requestId}</td>
                  <td className="border px-4 py-2">{c.title}</td>
                  <td className="border px-4 py-2">{c.submittedBy?.name || "-"}</td>
                  
                  {/* Status dropdown */}
                  <td className="border px-4 py-2">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                      className="px-2 py-1 border rounded-lg w-full"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  {/* Urgency */}
                  <td className="border px-4 py-2">{c.urgencyLevel || "-"}</td>

                  {/* Category */}
                  <td className="border px-4 py-2">{c.category || "-"}</td>

                  {/* Assigned Volunteer */}
                  <td className="border px-4 py-2 flex items-center gap-2">
                    <span>{c.assignedVolunteer || "Not Assigned"}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const volunteerId = prompt("Enter Volunteer ID to assign:");
                        if (volunteerId) assignVolunteer(c._id, volunteerId);
                      }}
                    >
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CaseTracking;
