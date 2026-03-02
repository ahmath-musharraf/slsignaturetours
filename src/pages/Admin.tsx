import React, { useState, useEffect } from 'react';
import { Booking, Tour } from '../types';
import { formatPrice } from '../utils';
import { LayoutDashboard, Package, CalendarCheck, MessageSquare, LogOut } from 'lucide-react';

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    fetch('/api/admin/bookings').then(res => res.json()).then(setBookings);
    fetch('/api/tours').then(res => res.json()).then(setTours);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-primary flex transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-64 bg-primary dark:bg-black/20 text-white p-8 hidden lg:block border-r border-white/5">
        <h2 className="text-xl font-serif font-bold mb-12 text-accent">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}
          >
            <CalendarCheck size={20} /> Bookings
          </button>
          <button
            onClick={() => setActiveTab('tours')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'tours' ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}
          >
            <Package size={20} /> Tours
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blogs' ? 'bg-white/10 text-accent' : 'hover:bg-white/5'}`}
          >
            <MessageSquare size={20} /> Blogs
          </button>
        </nav>
        <div className="mt-auto pt-20">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-8 lg:p-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif text-primary dark:text-white capitalize">{activeTab} Management</h1>
          <button className="btn-primary py-2 px-6 text-sm">Add New {activeTab.slice(0, -1)}</button>
        </div>

        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-white/5 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Client</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Tour</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary dark:text-white">{booking.name}</div>
                      <div className="text-xs text-slate-400">{booking.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{booking.tour_title}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{booking.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        booking.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary dark:text-accent font-bold text-sm hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white dark:bg-white/5 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-white/10 flex gap-4">
                <img src={tour.image_url} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-primary dark:text-white mb-1">{tour.title}</h4>
                  <p className="text-xs text-slate-400 mb-2">{tour.category}</p>
                  <p className="font-bold text-accent">{formatPrice(tour.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
