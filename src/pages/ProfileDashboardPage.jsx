import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, Award, Clock, Heart, TrendingUp, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { dummyVolunteer } from '../utils/dummyData';

const ProfileDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const volunteer = dummyVolunteer;

  const recentContributions = [
    {
      id: '1',
      title: 'Job Interview Preparation',
      type: 'Help Request Resolved',
      date: '2025-01-05',
      points: 100,
      beneficiary: 'Rahul Kumar',
      feedback: 'Excellent guidance and support. Very helpful!'
    },
    {
      id: '2',
      title: 'Digital Literacy Drive',
      type: 'Campaign Participation',
      date: '2024-12-28',
      points: 150,
      beneficiary: 'Community Event',
      feedback: 'Great volunteer, very dedicated and enthusiastic.'
    }
  ];

  const upcomingOpportunities = [
    {
      id: '1',
      title: 'Mental Health Counseling Session',
      date: '2025-01-12',
      location: 'Mumbai, Maharashtra',
      category: 'Counseling'
    },
    {
      id: '2',
      title: 'Youth Leadership Summit',
      date: '2025-02-20',
      location: 'New Delhi',
      category: 'Event'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-bold">
                    {volunteer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{volunteer.name}</h1>
                  <p className="text-gray-600 mb-4">Active Volunteer • Member since Dec 2024</p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{volunteer.points}</div>
                      <div className="text-xs text-gray-600">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{volunteer.badges.length}</div>
                      <div className="text-xs text-gray-600">Badges</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{volunteer.contributionHistory.length}</div>
                      <div className="text-xs text-gray-600">Contributions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">4.9</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                    {volunteer.skills.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        +{volunteer.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <Button variant="primary" icon={Heart}>
                    Find New Requests
                  </Button>
                  <Button variant="outline" icon={User}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'contributions', label: 'Contributions', icon: Heart },
            { id: 'settings', label: 'Settings', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Contributions */}
              <Card>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Contributions</h2>
                <div className="space-y-4">
                  {recentContributions.map(contribution => (
                    <div key={contribution.id} className="border-l-4 border-blue-500 pl-6 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{contribution.title}</h3>
                        <span className="text-sm text-blue-600 font-medium">+{contribution.points} points</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{contribution.type} • {new Date(contribution.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500 italic">"{contribution.feedback}"</p>
                      <p className="text-xs text-gray-500 mt-1">- {contribution.beneficiary}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">
                  View All Contributions
                </Button>
              </Card>

              {/* Badges */}
              <Card>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Achievements & Badges</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {volunteer.badges.map((badge, index) => (
                    <div key={index} className="bg-gradient-to-br from-orange-100 to-yellow-100 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm">{badge}</h3>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Opportunities */}
              <Card>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Opportunities</h2>
                <div className="space-y-4">
                  {upcomingOpportunities.map(opportunity => (
                    <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{opportunity.title}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-2" />
                          <span>{new Date(opportunity.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-2" />
                          <span>{opportunity.location}</span>
                        </div>
                      </div>
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {opportunity.category}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card>
                <h2 className="text-lg font-bold text-gray-800 mb-4">This Month</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hours Volunteered</span>
                    <span className="font-semibold">12 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">People Helped</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Points Earned</span>
                    <span className="font-semibold text-blue-600">250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rank</span>
                    <span className="font-semibold text-orange-600">#47</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Contributions Tab */}
        {activeTab === 'contributions' && (
          <div className="max-w-4xl">
            <Card>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Contribution History</h2>
              <div className="space-y-6">
                {volunteer.contributionHistory.map((contribution, index) => (
                  <div key={contribution.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{contribution.description}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(contribution.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {contribution.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-blue-600">+{contribution.points}</span>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8">
            <Card>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={volunteer.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={volunteer.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={volunteer.phone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={volunteer.location}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <Button variant="primary">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  'Email notifications for new help requests',
                  'SMS alerts for urgent requests',
                  'Weekly progress reports',
                  'Campaign and event updates'
                ].map((option, index) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <Button variant="primary" className="mt-6">Update Preferences</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboardPage;