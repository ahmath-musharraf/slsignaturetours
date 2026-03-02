import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, MapPin, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Tours', path: '/packages', icon: <Package size={20} /> },
    { name: 'Places', path: '/destinations', icon: <MapPin size={20} /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
      <div className="bg-white/80 dark:bg-primary/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl px-6 py-3 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-accent scale-110' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-white'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-primary dark:text-white opacity-100' : 'text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute -top-1 w-1 h-1 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        <a 
          href="tel:+94756972582"
          className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:bg-accent hover:text-primary transition-all active:scale-90"
        >
          <Phone size={18} />
        </a>
      </div>
    </div>
  );
};

export default BottomNav;
