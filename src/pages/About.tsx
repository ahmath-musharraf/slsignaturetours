import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1588598136852-d71803f3937d?auto=format&fit=crop&w=1920&q=80"
            alt="Sigiriya"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Discover the passion behind Sri Lanka's most trusted boutique travel agency.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white dark:bg-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif text-primary dark:text-white mb-8">A Legacy of Excellence</h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                <p>
                  Founded in 2010, Sri Lanka Signature Tours started with a simple mission: to provide authentic, high-quality travel experiences that go beyond the typical tourist paths.
                </p>
                <p>
                  Our founders, born and raised in Sri Lanka, wanted to share the true essence of their homeland—the misty tea plantations of Nuwara Eliya, the ancient ruins of Anuradhapura, and the pristine beaches of the South Coast—with a level of service that matches the island's natural beauty.
                </p>
                <p>
                  Today, we are proud to be one of the leading tour operators in Sri Lanka, serving thousands of international travelers every year while maintaining our commitment to sustainable tourism and community support.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=400&q=80"
                alt="Sri Lanka 1"
                className="rounded-2xl h-64 w-full object-cover mt-8"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1552423114-7502e39c33c7?auto=format&fit=crop&w=400&q=80"
                alt="Sri Lanka 2"
                className="rounded-2xl h-64 w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=400&q=80"
                alt="Sri Lanka 3"
                className="rounded-2xl h-64 w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=400&q=80"
                alt="Sri Lanka 4"
                className="rounded-2xl h-64 w-full object-cover -mt-8"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50 dark:bg-primary/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-white/5 p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-accent/10 rounded-2xl flex items-center justify-center text-primary dark:text-accent mb-8">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-serif text-primary dark:text-white mb-6">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                To provide exceptional, personalized travel experiences that inspire and connect our guests with the rich cultural and natural heritage of Sri Lanka, while ensuring the highest standards of safety, comfort, and sustainability.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-white/5 p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-serif text-primary dark:text-white mb-6">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                To be the most recognized and respected boutique travel agency in Sri Lanka, known for our innovation, integrity, and unwavering commitment to creating unforgettable memories for every traveler.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[{ icon: <Award size={40} />, val: "15+", label: "Years Experience" },
              { icon: <Users size={40} />, val: "12k+", label: "Happy Clients" },
              { icon: <Globe size={40} />, val: "500+", label: "Tours Completed" },
              { icon: <Heart size={40} />, val: "99%", label: "Satisfaction Rate" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-accent mb-4 flex justify-center">{stat.icon}</div>
                <h4 className="text-4xl font-serif font-bold mb-2">{stat.val}</h4>
                <p className="text-slate-400 uppercase tracking-widest text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-primary dark:text-white mb-4">Meet Our Experts</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Our team of local experts is dedicated to making your Sri Lankan dream a reality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Kasun Perera", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
              { name: "Dilini Silva", role: "Head of Operations", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
              { name: "Ruwan Jayasinghe", role: "Senior Travel Consultant", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" }
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/5]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-2xl font-serif text-primary dark:text-white mb-1">{member.name}</h4>
                <p className="text-accent font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
