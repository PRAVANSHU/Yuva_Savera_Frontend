import React, { useEffect, useState } from "react";
import axios from "axios";

const ContentApproval = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/moderator/content", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContentList(res.data.content || []);
    } catch (error) {
      console.error("Error fetching content:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const approveContent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/admin/moderator/approve`,
        { contentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContent();
    } catch (error) {
      console.error("Error approving content:", error.response?.data || error.message);
    }
  };

  const rejectContent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/admin/moderator/reject`,
        { contentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContent();
    } catch (error) {
      console.error("Error rejecting content:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) return <p>Loading content for approval...</p>;
  if (!contentList.length) return <p>No content pending approval.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Submitted By</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contentList.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.user?.name || "N/A"}</td>
              <td className="border px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => approveContent(item._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectContent(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
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

export default ContentApproval;
