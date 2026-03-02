import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 md:left-auto md:right-8 z-40 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition-colors duration-300 group"
          aria-label="Back to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
