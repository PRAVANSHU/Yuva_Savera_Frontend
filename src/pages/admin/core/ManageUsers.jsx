import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("🔍 API Response:", res.data);
      setUsers(res.data.users || res.data.data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { isActive: !isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-orange-500">
          <tr>
            <th className="border px-4 py-2 text-left text-white font-semibold">Name</th>
            <th className="border px-4 py-2 text-left text-white font-semibold">Email</th>
            <th className="border px-4 py-2 text-left text-white font-semibold">Role</th>
            <th className="border px-4 py-2 text-left text-white font-semibold">Active</th>
            <th className="border px-4 py-2 text-left text-white font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 capitalize">{user.role}</td>
              <td className="border px-4 py-2">{user.isActive ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">
                <button
                  className={`px-3 py-1 rounded ${
                    user.isActive ? "bg-red-500 text-white" : "bg-green-500 text-white"
                  }`}
                  onClick={() => toggleActive(user._id, user.isActive)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
