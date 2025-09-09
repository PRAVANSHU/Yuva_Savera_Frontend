import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/UI/Button";
import Card from "../../../components/UI/Card";

const AdminCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/campaigns/proposals", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setCampaigns(res.data.campaigns || []);
    } catch (err) {
      console.error("Error fetching pending campaigns:", err.response?.data || err.message);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCampaigns(); }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/campaigns/${id}/approve`, {}, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      // reflect change locally
      setCampaigns(prev => prev.map(c => c._id === id ? { ...c, status: 'approved' } : c));
    } catch (err) {
      console.error("Approve error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/campaigns/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setCampaigns(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  if (loading) return <p className="text-center p-6">Loading campaigns...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Campaign Proposals</h1>
      {campaigns.length === 0 ? (
        <p className="text-gray-600">No pending campaigns.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {campaigns.map(c => (
            <Card key={c._id}>
              <h2 className="text-xl font-bold mb-2">{c.title}</h2>
              <p className="text-gray-600 mb-2">{c.description}</p>
              <p className="text-sm text-gray-500">Location: {c.location}</p>
              <p className="text-sm text-gray-500 mb-3">Participants: {c.participantsCount || 0}</p>

              {c.imageUrl && <img src={c.imageUrl} alt={c.title} className="w-full h-48 object-cover rounded mb-3" />}

              <p className="text-sm font-medium mb-3">
                Approval:{" "}
                <span className={`px-2 py-1 rounded ${c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : c.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {c.status}
                </span>
              </p>

              <div className="flex gap-3">
                {c.status === 'pending' && <Button variant="primary" onClick={() => handleApprove(c._id)}>Approve</Button>}
                <Button variant="outline" onClick={() => handleDelete(c._id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCampaigns;
