import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Subject: ${formData.subject}\n\n${formData.message}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-20 bg-white dark:bg-primary transition-colors duration-300">
      <section className="bg-primary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-6">Get In Touch</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">Have questions? Our travel experts are here to help you plan your perfect Sri Lankan holiday.</p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-2xl font-serif text-primary dark:text-white mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-white/5 flex items-center justify-center text-primary dark:text-accent shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Phone</p>
                      <p className="text-lg text-primary dark:text-white font-medium">+94 75 697 2582</p>
                      <p className="text-slate-500 dark:text-slate-400">+94 75 697 2582 (WhatsApp)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-white/5 flex items-center justify-center text-primary dark:text-accent shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Email</p>
                      <p className="text-lg text-primary dark:text-white font-medium">info@slsignaturetours.com</p>
                      <p className="text-slate-500 dark:text-slate-400">support@slsignaturetours.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-white/5 flex items-center justify-center text-primary dark:text-accent shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Office</p>
                      <p className="text-lg text-primary dark:text-white font-medium">123 Galle Road, Colombo 03</p>
                      <p className="text-slate-500 dark:text-slate-400">Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-accent/10 rounded-3xl border border-accent/20">
                <h4 className="text-xl font-serif text-primary dark:text-white mb-4">Working Hours</h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 4:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday:</span> <span>Closed</span></div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-50 dark:bg-white/5 p-10 rounded-3xl border border-slate-100 dark:border-white/10">
                <h3 className="text-2xl font-serif text-primary dark:text-white mb-8">Send us a Message</h3>
                
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h4 className="text-2xl font-serif text-primary dark:text-white mb-2">Message Sent Successfully!</h4>
                      <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="mt-8 text-primary dark:text-accent font-bold border-b-2 border-accent pb-1"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                          placeholder="John Doe" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                          placeholder="john@example.com" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                          placeholder="+94 77 123 4567" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white transition-all" 
                          placeholder="How can we help?" 
                          required 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6} 
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-white/5 dark:text-white resize-none transition-all" 
                          placeholder="Tell us about your travel plans..." 
                          required
                        ></textarea>
                      </div>
                      <div className="md:col-span-2">
                        <button 
                          type="submit" 
                          disabled={status === 'submitting'}
                          className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={20} />
                        </button>
                        {status === 'error' && (
                          <p className="mt-4 text-red-500 text-center text-sm">Something went wrong. Please try again later.</p>
                        )}
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] bg-slate-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.5829045838!2d79.7861640322916!3d6.921837369624035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1709400000000!5m2!1sen!2slk"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
