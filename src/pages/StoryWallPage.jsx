import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Calendar, ArrowRight, Filter, Search } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { dummyStories } from '../utils/dummyData';

const StoryWallPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Education', 'Healthcare', 'Employment', 'Counseling', 'Environment'];

  const filteredStories = dummyStories.filter(story => 
    (filter === 'all' || story.category === filter) &&
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allStories = [
    ...dummyStories,
    {
      id: '3',
      title: 'Small Business Success',
      description: 'With mentorship and guidance, Rajesh started his own mobile repair shop and now employs 3 people in his community.',
      beforeImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      afterImage: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=400',
      volunteerName: 'Priya Mehta',
      helpSeekerName: 'Rajesh Patel',
      category: 'Employment',
      impactMetrics: 'Generated employment for 4 people',
      date: '2024-10-10'
    },
    {
      id: '4',
      title: 'Healthcare Access Improved',
      description: 'Connected elderly villagers with mobile healthcare services, improving access to regular check-ups and medication.',
      beforeImage: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=400',
      afterImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      volunteerName: 'Dr. Kavitha Rao',
      helpSeekerName: 'Village Community',
      category: 'Healthcare',
      impactMetrics: '200+ people now have regular healthcare access',
      date: '2024-09-15'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              Success <span className="text-purple-600">Story Wall</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed mb-8"
            >
              Real stories of transformation, hope, and positive change from our community. 
              Every story represents lives touched and dreams realized.
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
                  placeholder="Search success stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Inspiring Stories</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Story */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                  Featured Story
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                  Education
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                From Dropout to Engineer: A Journey of Determination
              </h2>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                Ramesh Kumar, a 19-year-old from a rural village in Bihar, had dropped out of school 
                in 8th grade due to family financial constraints. Through Yuva Savera's education 
                support program, volunteer Meera Joshi provided him with free tutoring, study materials, 
                and emotional support to complete his 12th grade through distance learning.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Impact Achieved:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-purple-600 mr-2" />
                    <span>Completed 12th grade with 85% marks</span>
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-purple-600 mr-2" />
                    <span>Gained admission to engineering college</span>
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-purple-600 mr-2" />
                    <span>Became an inspiration for 15+ other youth in village</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Volunteer: Meera Joshi
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  December 2024
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Before</h4>
                <img
                  src="https://images.pexels.com/photos/8197469/pexels-photo-8197469.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Before transformation"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">After</h4>
                <img
                  src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="After transformation"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Story Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allStories.slice(1).map((story, index) => (
            <Card key={story.id} delay={index * 0.1}>
              <div className="relative mb-4">
                <img
                  src={story.afterImage}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded-full">
                    {story.category}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">{story.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{story.description}</p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Impact Metrics:</h4>
                <p className="text-sm text-gray-600">{story.impactMetrics}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    Volunteer
                  </span>
                  <span className="font-medium">{story.volunteerName}</span>
                </div>
                {story.helpSeekerName && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      Beneficiary
                    </span>
                    <span className="font-medium">{story.helpSeekerName}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Date
                  </span>
                  <span className="font-medium">{new Date(story.date).toLocaleDateString()}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                Read Full Story
              </Button>
            </Card>
          ))}
        </div>

        {/* Submit Story CTA */}
        <div className="mt-16 text-center">
          <Card>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Your Success Story</h3>
              <p className="text-gray-600 mb-6">
                Have you been helped through Yuva Savera or made a difference as a volunteer? 
                Share your story to inspire others and showcase the power of community support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  Submit Your Story
                </Button>
                <Button variant="outline" size="lg">
                  View Submission Guidelines
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoryWallPage;