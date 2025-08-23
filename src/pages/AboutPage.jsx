import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe, Award, Target, Eye, Lightbulb } from 'lucide-react';
import Card from '../components/UI/Card';
import { dummyPartners } from '../utils/dummyData';

const AboutPage = () => {
  const coreValues = [
    {
      icon: Heart,
      title: 'Empathy & Compassion',
      description: 'We believe in the power of understanding and caring for others, driving us to create meaningful connections and lasting impact.'
    },
    {
      icon: Users,
      title: 'Youth Empowerment',
      description: 'We trust in the potential of young minds to solve complex social challenges and create positive change in their communities.'
    },
    {
      icon: Globe,
      title: 'Inclusive Growth',
      description: 'We are committed to ensuring that development reaches every corner of society, leaving no one behind.'
    },
    {
      icon: Award,
      title: 'Excellence & Integrity',
      description: 'We maintain the highest standards of service delivery while staying true to our ethical principles and values.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              About <span className="text-orange-500">Yuva Savera</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Born from the belief that India's youth are the architects of tomorrow, 
              Yuva Savera is more than just a platform—it's a movement that transforms 
              individual passion into collective action.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card delay={0.1}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  To create a seamless bridge between young volunteers and communities in need, 
                  fostering a culture of service, civic responsibility, and social entrepreneurship 
                  across India.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                    <span>Connect passionate youth with meaningful volunteer opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                    <span>Provide accessible help to underserved communities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                    <span>Promote civic awareness and political engagement</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div>
              <Card delay={0.2}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  A self-reliant, prosperous India where every young person is an active contributor 
                  to positive social change, democratic governance, and sustainable development.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">India 2047</h3>
                  <p className="text-sm text-gray-600">
                    As India approaches its centennial of independence, we envision a nation where 
                    youth-driven social innovation has eliminated poverty, inequality, and civic apathy.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              The principles that guide our mission and drive our impact
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Project Background</h2>
              </div>

              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="mb-6">
                  Yuva Savera was conceptualized in 2024 by a group of young social entrepreneurs 
                  who recognized the immense potential of India's youth demographic. With over 600 million 
                  people under the age of 25, India has the world's largest youth population.
                </p>

                <p className="mb-6">
                  However, this demographic dividend comes with challenges: unemployment, lack of civic 
                  engagement, and limited channels for meaningful social participation. Traditional 
                  volunteering platforms often fail to address the unique needs and aspirations of Indian youth.
                </p>

                <p className="mb-6">
                  Our founders—coming from diverse backgrounds in technology, social work, and public policy—
                  identified three key gaps in the existing ecosystem:
                </p>

                <ul className="mb-6 space-y-2">
                  <li>• Disconnected communities struggling to access help</li>
                  <li>• Motivated youth lacking accessible volunteer opportunities</li>
                  <li>• Limited platforms for civic education and political awareness</li>
                </ul>

                <p>
                  Yuva Savera addresses these challenges through technology, community building, and 
                  partnership with like-minded organizations across India.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Our Partners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Working together with organizations that share our vision for a better India
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyPartners.map((partner, index) => (
              <Card key={partner.id} delay={index * 0.1}>
                <div className="text-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{partner.name}</h3>
                  <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full mb-3">
                    {partner.type}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {partner.focusArea.map((area, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;