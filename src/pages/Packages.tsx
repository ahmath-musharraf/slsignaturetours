import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Filter, Search, ArrowRight, X, SlidersHorizontal } from 'lucide-react';
import { Tour } from '../types';
import { formatPrice } from '../utils';
import { useCurrency } from '../context/CurrencyContext';
import { AnimatePresence } from 'framer-motion';

const Packages = () => {
  const [searchParams] = useSearchParams();
  const { currency } = useCurrency();
  const initialCat = searchParams.get('cat') || 'All';
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [category, setCategory] = useState(initialCat);
  const [search, setSearch] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['All', 'Beach Tours', 'Cultural Tours', 'Wildlife Safari', 'Honeymoon Packages', 'Adventure Tours', 'Holiday Packages'];

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        setTours(data);
        setFilteredTours(data);
      });
  }, []);

  useEffect(() => {
    let result = tours;
    if (category !== 'All') {
      result = result.filter(t => t.category.toLowerCase().includes(category.toLowerCase().split(' ')[0]));
    }
    if (search) {
      result = result.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredTours(result);
  }, [category, search, tours]);

  return (
    <div className="pt-20 bg-white dark:bg-primary transition-colors duration-300">
      {/* Header */}
      <section className="bg-primary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif mb-6">Our Tour Packages</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Choose from our carefully curated selection of tours designed to show you the very best of Sri Lanka.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 lg:py-12 bg-white dark:bg-primary border-b border-slate-100 dark:border-white/10 sticky top-16 z-30 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat ? 'bg-primary dark:bg-accent text-white dark:text-primary' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter Trigger */}
            <div className="lg:hidden flex w-full gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-white/5 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
                />
              </div>
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="w-12 h-12 bg-primary dark:bg-accent text-white dark:text-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search tours..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-white/5 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Bottom Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] z-[101] p-8 lg:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif text-primary">Filter Collections</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 bg-slate-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full px-6 py-4 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center ${
                        category === cat ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      {cat}
                      {category === cat && <div className="w-2 h-2 bg-accent rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Grid */}
      <section className="py-20 bg-sand dark:bg-primary min-h-[600px] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredTours.map((tour, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  key={tour.id}
                  className="bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-white/10 group flex flex-col h-full hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={tour.image_url}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5 }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-8 left-8 bg-white/90 dark:bg-primary/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold text-primary dark:text-accent uppercase tracking-[0.2em]">
                      {tour.category}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                      <Calendar size={14} className="mr-2 text-accent" />
                      <span>{tour.duration}</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-primary dark:text-white mb-6 group-hover:text-accent transition-colors">{tour.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-base mb-10 line-clamp-3 leading-relaxed font-light">
                      {tour.description}
                    </p>
                    <div className="mt-auto pt-10 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase tracking-[0.2em] mb-2 font-bold">From</span>
                        <span className="text-3xl font-bold text-primary dark:text-white">{formatPrice(tour.price, currency)}</span>
                      </div>
                      <Link to={`/packages/${tour.id}`} className="w-14 h-14 rounded-full bg-primary dark:bg-accent text-white dark:text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                        <ArrowRight size={24} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif text-slate-400">No tours found matching your criteria.</h3>
              <button onClick={() => {setCategory('All'); setSearch('');}} className="mt-4 text-primary font-bold underline">Clear all filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Packages;
