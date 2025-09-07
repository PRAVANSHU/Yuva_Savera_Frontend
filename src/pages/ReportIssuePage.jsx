import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";

const ReportIssuePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetType: "",
    targetId: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ["User Misbehavior", "HelpRequest Issue", "Technical", "Other"];
  const targetTypes = ["User", "HelpRequest"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) setIsSubmitted(true);
      else alert("❌ Failed: " + (data.message || "Unknown error"));
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-lg text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Report Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Thank you! Our admin team will review your report within 24-48 hours.
          </p>
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
            Submit Another Report
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Report an Issue</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Title / Subject *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Target Type */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Target Type (optional)</label>
            <select
              name="targetType"
              value={formData.targetType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">None</option>
              {targetTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Target ID */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Target ID (optional)</label>
            <input
              type="text"
              name="targetId"
              value={formData.targetId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter User ID or HelpRequest ID"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" variant="primary" className="w-full">
              Submit Report
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ReportIssuePage;
