import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CustomCursor from './components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import TourDetails from './pages/TourDetails';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';
import BottomNav from './components/BottomNav';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';

// Placeholder components for missing pages
const Gallery = () => <div className="pt-40 pb-20 text-center"><h1>Gallery Page (Coming Soon)</h1></div>;
const Blog = () => <div className="pt-40 pb-20 text-center"><h1>Blog Page (Coming Soon)</h1></div>;

export default function App() {
  const location = useLocation();
  const { pathname, hash } = location;
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.5, // Slightly longer for more "luxury" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Slightly more responsive
      infinite: false,
      lerp: 0.08, // Added lerp for smoother interpolation
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Scroll to top on page change
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Handle hash links smoothly
    if (hash && lenisRef.current) {
      const target = document.querySelector(hash);
      if (target) {
        lenisRef.current.scrollTo(target as HTMLElement, { offset: -100 });
      }
    }
  }, [hash]);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <div className="min-h-screen flex flex-col selection:bg-accent selection:text-primary dark:bg-primary dark:text-white transition-colors duration-300">
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              {/* @ts-ignore */}
              <Routes location={location} key={pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/packages" element={<PageWrapper><Packages /></PageWrapper>} />
                <Route path="/packages/:id" element={<PageWrapper><TourDetails /></PageWrapper>} />
                <Route path="/destinations" element={<PageWrapper><Destinations /></PageWrapper>} />
                <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
                <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
          <BackToTop />
        </div>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);
