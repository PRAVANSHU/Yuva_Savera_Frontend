import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/UI/Button";
import Card from "../../../components/UI/Card";

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch pending stories
  const fetchStories = async () => {
    try {
      const res = await axios.get("/api/stories/admin/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStories(res.data.data.stories);
    } catch (error) {
      console.error("Error fetching pending stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Approve or Reject (update status but keep visible)
  const handleAction = async (id, action) => {
    try {
      const res = await axios.patch(
        `/api/stories/admin/${id}/status`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // update story status in UI instead of removing
      setStories((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, status: res.data.data.story.status } : s
        )
      );
    } catch (error) {
      console.error(`Error ${action}ing story:`, error);
    }
  };

  if (loading) return <p className="text-center p-6">Loading pending stories...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Story Submissions</h1>
      {stories.length === 0 ? (
        <p className="text-gray-600">No stories found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <Card key={story._id}>
              <h2 className="text-xl font-bold mb-2">{story.title}</h2>
              <p className="text-gray-600 mb-2">{story.description}</p>
              <p className="text-sm text-gray-500">Category: {story.category}</p>
              <p className="text-sm text-gray-500">Volunteer: {story.volunteerName}</p>

              <div className="grid grid-cols-2 gap-2 my-4">
                <img
                  src={story.beforeImage?.url || story.beforeImage}
                  alt="Before"
                  className="w-full h-40 object-cover rounded"
                />
                <img
                  src={story.afterImage?.url || story.afterImage}
                  alt="After"
                  className="w-full h-40 object-cover rounded"
                />
              </div>

              <p className="text-sm font-medium mb-3">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    story.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : story.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {story.status}
                </span>
              </p>

              {story.status === "pending" && (
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleAction(story._id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAction(story._id, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStories;
