import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({ name: res.data.data.user.name, email: res.data.data.user.email });
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "/api/auth/update-profile",
        { name: profile.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setMessage("Failed to update profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <label className="block mb-2 font-semibold">Name</label>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-2 font-semibold">Email</label>
      <input
        type="email"
        value={profile.email}
        disabled
        className="w-full border px-3 py-2 rounded mb-4 bg-gray-100"
      />

      <button
        onClick={handleUpdate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Settings;
