import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, User, Heart, Eye } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { dummyHelpRequests } from '../utils/dummyData';

const BrowseRequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');

  const categories = ['Education', 'Healthcare', 'Employment', 'Counseling', 'Emergency'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  const urgencyLevels = ['Low', 'Medium', 'High', 'Critical'];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = dummyHelpRequests.filter(request => {
    return (
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || request.category === categoryFilter) &&
      (locationFilter === '' || request.location.includes(locationFilter)) &&
      (urgencyFilter === '' || request.urgencyLevel === urgencyFilter)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Browse <span className="text-blue-600">Help Requests</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Find opportunities to make a difference. Connect with people who need your skills and support.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search help requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Urgency Levels</option>
              {urgencyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setLocationFilter('');
                setUrgencyFilter('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Request Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredRequests.map((request, index) => (
            <Card key={request.id} delay={index * 0.1}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgencyLevel)}`}>
                      {request.urgencyLevel}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Video Thumbnail */}
                {request.videoThumbnail && (
                  <div className="relative mb-4">
                    <img
                      src={request.videoThumbnail}
                      alt="Request thumbnail"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Eye className="w-6 h-6 text-gray-800" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{request.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{request.description}</p>

                  <div className="space-y-2 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>{request.anonymous ? 'Anonymous' : request.submittedBy}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Category: {request.category}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  {request.assignedVolunteer ? (
                    <div className="text-sm text-purple-600">
                      Assigned to: {request.assignedVolunteer}
                    </div>
                  ) : (
                    <div className="text-sm text-green-600">
                      Open for volunteers
                    </div>
                  )}
                  
                  <Button 
                    variant={request.status === 'Open' ? 'primary' : 'outline'} 
                    size="sm"
                    icon={Heart}
                    disabled={request.status !== 'Open'}
                  >
                    {request.status === 'Open' ? 'Volunteer to Help' : 'View Details'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredRequests.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No requests found</h3>
              <p>Try adjusting your search terms or filters to find more opportunities to help.</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setLocationFilter('');
                setUrgencyFilter('');
              }}
            >
              Clear All Filters
            </Button>
          </Card>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Don't see what you're looking for?</h3>
            <p className="text-gray-600 mb-6">
              New help requests are added daily. Subscribe to notifications or check back regularly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary">
                Set Up Notifications
              </Button>
              <Button variant="outline">
                View All Categories
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrowseRequestsPage;