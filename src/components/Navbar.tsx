import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, Instagram, Facebook, Youtube, ChevronDown, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { CURRENCIES } from '../utils';
import { CurrencyCode } from '../types';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collections', path: '/packages' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <span className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-300 ${scrolled ? 'text-primary dark:text-white' : 'text-white'}`}>
              SRI LANKA
            </span>
            <span className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${scrolled ? 'text-accent' : 'text-accent'}`}>
              Signature Tours
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-300 hover:text-accent relative group ${
                  scrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}

            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowCurrency(!showCurrency)}
                className={`flex items-center gap-1 text-sm font-semibold transition-all duration-300 hover:text-accent ${
                  scrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'
                }`}
              >
                {currency} <ChevronDown size={14} className={`transition-transform duration-300 ${showCurrency ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showCurrency && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-40 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden py-2"
                  >
                    {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setShowCurrency(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-white/5 ${
                          currency === code ? 'text-accent font-bold' : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="inline-block w-8">{CURRENCIES[code].symbol}</span>
                        {code}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className="btn-accent py-2.5 px-8 text-sm">
              Book Now
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                scrolled ? 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200' : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 ${scrolled ? 'text-primary dark:text-white' : 'text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-primary md:hidden flex flex-col"
          >
            {/* Header in Overlay */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tighter text-white">
                  SRI LANKA
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
                  Signature Tours
                </span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Theme Toggle in Mobile Menu */}
            <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Appearance</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold"
              >
                {theme === 'light' ? (
                  <>
                    <Moon size={18} className="text-accent" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun size={18} className="text-accent" />
                    Light Mode
                  </>
                )}
              </button>
            </div>

            {/* Links */}
            <div className="flex-grow overflow-y-auto px-8 py-12 flex flex-col justify-center">
              <div className="space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-serif text-white hover:text-accent transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Currency in Overlay */}
              <div className="mt-16 pt-12 border-t border-white/10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Select Currency</p>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        currency === code 
                          ? 'bg-accent border-accent text-primary' 
                          : 'bg-transparent border-white/20 text-white'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer in Overlay */}
            <div className="p-8 bg-white/5 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Instagram size={20} className="text-white/60" />
                  <Facebook size={20} className="text-white/60" />
                  <Youtube size={20} className="text-white/60" />
                </div>
                <a href="tel:+94771234567" className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Phone size={16} />
                  +94 77 123 4567
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
