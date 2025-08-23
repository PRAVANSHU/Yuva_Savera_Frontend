import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Mail, Phone, MapPin, Users, FileText, CheckCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const PartnerRegistrationPage = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    description: '',
    focusAreas: [],
    location: '',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    registrationNumber: '',
    additionalInfo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const organizationTypes = [
    'Non-Governmental Organization (NGO)',
    'Corporate/Private Company',
    'Educational Institution',
    'Government Agency',
    'Social Enterprise',
    'Community Group',
    'Religious Organization'
  ];

  const focusAreaOptions = [
    'Education & Skill Development',
    'Healthcare & Medical Services',
    'Employment & Livelihood',
    'Mental Health & Counseling',
    'Environment & Sustainability',
    'Women Empowerment',
    'Child Welfare',
    'Senior Citizen Care',
    'Disability Support',
    'Rural Development',
    'Technology & Innovation',
    'Arts & Culture'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocusAreaToggle = (area) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Partnership Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in partnering with Yuva Savera! Our partnerships team will 
            review your application and reach out within 3-5 business days to discuss next steps.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Application ID:</strong> PA-2025-{Math.random().toString(36).substr(2, 6).toUpperCase()}
            </p>
            <p className="text-sm text-blue-600 mt-2">
              Save this ID for tracking your application status
            </p>
          </div>
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              Download Partnership Guide
            </Button>
            <Button variant="outline" className="w-full">
              Visit Partner Portal
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              <span className="text-purple-600">Partner</span> with Yuva Savera
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Join our network of organizations working together to create positive social impact. 
              Let's collaborate to amplify our collective efforts for community development.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Partnership Benefits */}
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Partnership Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Expanded Reach</h3>
                <p className="text-sm text-gray-600">Access our network of 12,000+ volunteers across India</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Resource Sharing</h3>
                <p className="text-sm text-gray-600">Share resources, expertise, and best practices</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Joint Campaigns</h3>
                <p className="text-sm text-gray-600">Collaborate on impactful campaigns and initiatives</p>
              </div>
            </div>
          </Card>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Organization Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your organization's full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Type *
                    </label>
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select organization type</option>
                      {organizationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Primary Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="City, State"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Describe your organization's mission, vision, and current activities..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://yourorganization.org"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Government registration number (if applicable)"
                    />
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Areas of Focus (Select all that apply) *
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {focusAreaOptions.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleFocusAreaToggle(area)}
                      className={`p-3 text-sm rounded-lg border-2 transition-all text-left ${
                        formData.focusAreas.includes(area)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Primary contact person"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Contact phone number"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Official email address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Any additional information about your organization, past collaborations, or specific partnership interests..."
                />
              </div>

              {/* Terms and Submit */}
              <div className="border-t pt-6">
                <div className="mb-6">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="text-purple-500 focus:ring-purple-500 mt-1"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that the information provided is accurate and I have the authority to represent 
                      this organization in partnership discussions. I agree to Yuva Savera's 
                      <a href="#" className="text-purple-600 hover:underline mx-1">Partnership Terms</a> 
                      and 
                      <a href="#" className="text-purple-600 hover:underline ml-1">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={!formData.organizationName || !formData.organizationType || 
                           formData.focusAreas.length === 0 || !formData.contactPersonName || 
                           !formData.contactEmail || !formData.contactPhone}
                >
                  Submit Partnership Application
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistrationPage;