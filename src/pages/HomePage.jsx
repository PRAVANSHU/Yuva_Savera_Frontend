import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Heart, Award, Globe, ArrowRight, Play } from 'lucide-react';
import StatsCard from '../components/UI/StatsCard';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { dummyStats, dummyStories } from '../utils/dummyData';

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-800">Ek Naya </span>
                <span className="text-orange-500">Savera</span>
                <br />
                <span className="text-blue-600 text-3xl md:text-4xl lg:text-5xl">Yuva Ke Saath</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Empowering Indian youth to create lasting change through volunteerism, 
                community service, and civic engagement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link to="/volunteer-registration">
                <Button variant="primary" size="lg" icon={Users}>
                  Join as Volunteer
                </Button>
              </Link>
              <Link to="/submit-help-request">
                <Button variant="secondary" size="lg" icon={Heart}>
                  Request Help
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <StatsCard
                icon={Users}
                value={dummyStats.volunteers}
                label="Active Volunteers"
                delay={0.1}
              />
              <StatsCard
                icon={Heart}
                value={dummyStats.requestsSolved}
                label="Requests Solved"
                delay={0.2}
              />
              <StatsCard
                icon={Award}
                value={dummyStats.campaignsRun}
                label="Campaigns Run"
                delay={0.3}
              />
              <StatsCard
                icon={Globe}
                value={`${dummyStats.impactReached}+`}
                label="Lives Impacted"
                delay={0.4}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Our Mission & Vision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Building a stronger, more connected India through youth-driven social action and civic participation.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To connect passionate young volunteers with communities in need, fostering a culture of service, 
                  empathy, and social responsibility across India.
                </p>
              </div>
            </Card>

            <Card delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A vibrant, self-reliant India where every young person is an active contributor to positive 
                  social change and democratic governance.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Success Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Real stories of transformation and impact from our community
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {dummyStories.slice(0, 2).map((story, index) => (
              <Card key={story.id} delay={index * 0.1}>
                <div className="flex flex-col h-full">
                  <div className="relative mb-4">
                    <img
                      src={story.afterImage}
                      alt={story.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-orange-600">{story.category}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{story.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{story.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Volunteer: {story.volunteerName}</span>
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/story-wall">
              <Button variant="outline" icon={ArrowRight}>
                View All Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of young Indians who are already creating positive change in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/volunteer-registration">
                <Button variant="outline" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Start Volunteering Today
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;