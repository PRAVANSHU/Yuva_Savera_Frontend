import React, { useEffect, useState } from "react";
import axios from "axios";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/district/volunteers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVolunteers(res.data.volunteers || []);
    } catch (error) {
      console.error("Error fetching volunteers:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  if (loading) return <p>Loading volunteers...</p>;
  if (!volunteers.length) return <p>No volunteers found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((vol) => (
            <tr key={vol._id}>
              <td className="border px-4 py-2">{vol.name}</td>
              <td className="border px-4 py-2">{vol.email}</td>
              <td className="border px-4 py-2">{vol.phone}</td>
              <td className="border px-4 py-2">{vol.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Volunteers;
