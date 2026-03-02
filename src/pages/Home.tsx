import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Star, ShieldCheck, Heart, Camera, Compass, Play, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tour } from '../types';
import { formatPrice, cn } from '../utils';
import { useCurrency } from '../context/CurrencyContext';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const { currency } = useCurrency();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    { name: "Sarah Johnson", country: "UK", text: "The most incredible trip of our lives. Everything was perfectly organized, from the boutique hotels to the private safari." },
    { name: "Michael Chen", country: "Singapore", text: "Signature Tours truly knows Sri Lanka. We saw things we never would have found on our own. Highly recommended!" },
    { name: "Elena Rossi", country: "Italy", text: "Bespoke service at its finest. Our guide was knowledgeable and the pace was perfect for our family." },
    { name: "David Weber", country: "Germany", text: "Exceptional attention to detail. The cultural sites were breathtaking and our driver was a true professional." },
    { name: "Sophie Laurent", country: "France", text: "A magical experience. The tea country views were stunning and the food was delicious everywhere we went." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => setFeaturedTours(data.slice(0, 3)));
  }, []);

  return (
    <div className="bg-white dark:bg-primary transition-colors duration-300">
      {/* Professional Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1920&q=80"
            alt="Sri Lanka Landscape"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ opacity, y: textY }}
          >
            <span className="text-accent font-bold tracking-[0.3em] uppercase mb-6 block text-sm">
              Premier Travel Partner in Sri Lanka
            </span>
            <h1 className="text-display text-white mb-8 drop-shadow-lg">
              Discover the Essence <br /> of <span className="text-accent italic">Sri Lanka</span>
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Experience bespoke luxury journeys curated by local experts. From ancient heritage to pristine beaches, we unveil the island's best.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/packages" className="btn-accent px-12 py-4">
                View Tour Packages
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary px-12 py-4">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Category Quick Access */}
      <section className="md:hidden py-12 bg-sand dark:bg-primary/30 overflow-hidden">
        <div className="px-6 mb-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 block">Explore by</span>
          <h2 className="text-3xl font-serif text-primary dark:text-white">Interests</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar">
          {[
            { name: 'Beach', icon: '🏖️', cat: 'beach' },
            { name: 'Culture', icon: '🛕', cat: 'cultural' },
            { name: 'Wildlife', icon: '🐘', cat: 'wildlife' },
            { name: 'Romance', icon: '💍', cat: 'honeymoon' },
            { name: 'Adventure', icon: '⛰️', cat: 'adventure' },
          ].map((item) => (
            <Link 
              key={item.name}
              to={`/packages?cat=${item.cat}`}
              className="flex-shrink-0 w-32 h-40 bg-white dark:bg-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-sm active:scale-95 transition-transform border border-transparent dark:border-white/10"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs font-bold text-primary dark:text-accent uppercase tracking-wider">{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Trust Section */}
      <section id="why-us" className="section-padding bg-slate-50 dark:bg-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-label mb-4 block">Why Sri Lanka Signature Tours</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary dark:text-white">Excellence in Every Detail</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Compass className="w-12 h-12 text-accent" />, title: "Expert Local Knowledge", desc: "Our guides are natives who know the hidden gems and untold stories of the island." },
              { icon: <ShieldCheck className="w-12 h-12 text-accent" />, title: "Safe & Secure Travel", desc: "Your safety is our priority. We partner with the best hotels and transport providers." },
              { icon: <Star className="w-12 h-12 text-accent" />, title: "Tailor-Made Excellence", desc: "Every itinerary is customized to your pace, interests, and luxury standards." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white dark:bg-white/5 p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent dark:border-white/10"
              >
                <motion.div 
                  className="mb-6"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    ease: "easeInOut",
                    delay: i * 0.2 
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-serif text-primary dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages - Scannable Grid */}
      <section id="featured" className="section-padding bg-white dark:bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-label mb-4 block">Our Collections</span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary dark:text-white">Featured Journeys</h2>
            </div>
            <Link to="/packages" className="text-primary dark:text-white font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
              View All Packages
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredTours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-transparent dark:border-white/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image_url}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-primary/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-primary dark:text-accent uppercase tracking-wider">
                    {tour.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Calendar size={14} className="mr-2 text-accent" />
                    <span>{tour.duration}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-4 group-hover:text-accent transition-colors">{tour.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 line-clamp-2 font-light leading-relaxed">
                    {tour.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/10">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase tracking-widest mb-1">Starting From</span>
                      <span className="text-2xl font-bold text-primary dark:text-white">{formatPrice(tour.price, currency)}</span>
                    </div>
                    <Link to={`/packages/${tour.id}`} className="btn-primary py-2.5 px-6 text-sm">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Trust Signal */}
      <section id="testimonials" className="section-padding bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-6 block">Guest Experiences</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-16">What Our Travelers Say</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div className="bg-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm border border-white/10 w-full">
                    <div className="flex justify-center mb-8">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-accent fill-accent mx-1" />)}
                    </div>
                    <p className="text-xl md:text-2xl text-white/90 italic font-light leading-relaxed mb-10">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <h4 className="font-bold text-xl mb-1">{testimonials[currentTestimonial].name}</h4>
                    <span className="text-accent text-sm uppercase tracking-[0.2em]">{testimonials[currentTestimonial].country}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-primary transition-all active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16">
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-primary transition-all active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    currentTestimonial === i ? "bg-accent w-8" : "bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-slate-50 rounded-[3rem] p-16 md:p-24 shadow-inner border border-slate-100">
            <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8">Ready to Plan Your <br /> <span className="text-accent italic">Dream Journey?</span></h2>
            <p className="text-slate-600 text-xl mb-12 font-light max-w-2xl mx-auto">
              Contact our travel specialists today for a complimentary consultation and personalized itinerary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact" className="btn-primary px-12 py-5 text-lg">
                Get a Free Quote
              </Link>
              <a href="tel:+94123456789" className="text-primary font-bold flex items-center gap-3 hover:text-accent transition-colors">
                Call Us: +94 123 456 789
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
