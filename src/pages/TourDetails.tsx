import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle2, XCircle, ArrowLeft, Clock, MapPin } from 'lucide-react';
import { Tour } from '../types';
import { formatPrice } from '../utils';
import { useCurrency } from '../context/CurrencyContext';

const TourDetails = () => {
  const { id } = useParams();
  const { currency } = useCurrency();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    date: ''
  });

  useEffect(() => {
    fetch(`/api/tours/${id}`)
      .then(res => res.json())
      .then(data => {
        setTour(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tour_id: id,
          ...formData
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="pt-40 text-center">Loading...</div>;
  if (!tour) return <div className="pt-40 text-center">Tour not found</div>;

  const itinerary = JSON.parse(tour.itinerary);
  const includes = JSON.parse(tour.includes);
  const excludes = JSON.parse(tour.excludes);

  return (
    <div className="pt-20 bg-white dark:bg-primary transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={tour.image_url}
          alt={tour.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <Link to="/packages" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={18} className="mr-2" /> Back to Packages
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">{tour.title}</h1>
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center"><Clock size={20} className="mr-2 text-accent" /> {tour.duration}</div>
              <div className="flex items-center"><MapPin size={20} className="mr-2 text-accent" /> {tour.category}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-primary dark:text-white mb-6">Overview</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{tour.description}</p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-serif text-primary dark:text-white mb-8">Itinerary</h2>
                <div className="space-y-8">
                  {itinerary.map((item: any, i: number) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary dark:bg-accent text-white dark:text-primary flex items-center justify-center font-bold shrink-0">
                          {item.day}
                        </div>
                        {i < itinerary.length - 1 && <div className="w-px h-full bg-slate-200 dark:bg-white/10 my-2" />}
                      </div>
                      <div className="pb-8">
                        <h4 className="text-xl font-bold text-primary dark:text-white mb-2">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-serif text-primary dark:text-white mb-6">What's Included</h3>
                  <ul className="space-y-4">
                    {includes.map((item: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 size={20} className="text-emerald-500 mr-3 shrink-0 mt-1" />
                        <span className="text-slate-600 dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-primary dark:text-white mb-6">What's Excluded</h3>
                  <ul className="space-y-4">
                    {excludes.map((item: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <XCircle size={20} className="text-rose-500 mr-3 shrink-0 mt-1" />
                        <span className="text-slate-600 dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-serif text-primary dark:text-white mb-3">Booking Received!</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Thank you for your interest. Your booking is currently <span className="font-bold text-accent">pending review</span>.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Our travel specialists will contact you at <span className="font-medium text-primary dark:text-accent">{formData.email}</span> within 24 hours to finalize your itinerary.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-primary dark:text-accent font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors"
                    >
                      Make another booking
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <span className="text-slate-400 text-xs block uppercase tracking-widest mb-1">Starting from</span>
                      <span className="text-4xl font-bold text-primary dark:text-white">{formatPrice(tour.price, currency)}</span>
                      <span className="text-slate-400 ml-2">/ person</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                          placeholder="Enter your full name"
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                          placeholder="your@email.com"
                          required 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Guests</label>
                          <input 
                            type="number" 
                            name="guests"
                            min="1" 
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                          <input 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                            required 
                          />
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full btn-primary py-4 text-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Processing...' : 'Book This Tour'}
                      </button>
                    </form>

                    <p className="text-xs text-slate-400 text-center mt-6">
                      No payment required now. Our team will contact you to finalize the booking.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourDetails;
