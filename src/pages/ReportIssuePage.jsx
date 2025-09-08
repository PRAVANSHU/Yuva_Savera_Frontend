import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for helping us improve our platform. Our admin team will review your report within 24-48 hours.
            </p>
            <Button 
              variant="primary" 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  title: "",
                  description: "",
                  category: "",
                  targetType: "",
                  targetId: "",
                });
              }}
              className="mx-auto"
            >
              Submit Another Report
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              Report <span className="text-purple-600">an Issue</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed mb-8"
            >
              Help us maintain a safe and positive community by reporting issues you encounter. 
              Your feedback helps us improve the platform for everyone.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Report an Issue</h2>
              <p className="text-gray-600">All fields marked with * are required</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Title / Subject *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                placeholder="Briefly describe the issue"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                placeholder="Please provide detailed information about the issue you're reporting..."
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                required
              >
                <option value="">Select a category</option>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter User ID or HelpRequest ID"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full py-3 text-lg"
              >
                Submit Report
              </Button>
            </div>
          </form>
        </Card>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-2">What happens after I submit a report?</h4>
              <p className="text-gray-600 text-sm">
                Our admin team reviews all reports within 24-48 hours. You may be contacted for additional information if needed.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-2">Will my report remain confidential?</h4>
              <p className="text-gray-600 text-sm">
                Yes, all reports are handled with strict confidentiality. Your identity will not be disclosed to the reported party.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-2">What types of issues should I report?</h4>
              <p className="text-gray-600 text-sm">
                Report any behavior that violates our community guidelines, technical issues, or concerns about platform safety.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold text-gray-800 mb-2">How long does it take to resolve issues?</h4>
              <p className="text-gray-600 text-sm">
                Resolution time varies based on complexity. Critical issues are prioritized and typically resolved within 72 hours.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;