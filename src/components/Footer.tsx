import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex flex-col mb-6">
              <span className="text-2xl font-serif font-bold tracking-tighter text-white">
                SRI LANKA
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-accent">
                Signature Tours
              </span>
            </Link>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Experience the soul of Sri Lanka with our curated luxury tours. From misty mountains to golden shores, we craft memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-accent">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/packages" className="text-slate-300 hover:text-white transition-colors">Tour Packages</Link></li>
              <li><Link to="/destinations" className="text-slate-300 hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/gallery" className="text-slate-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-white transition-colors">Travel Blog</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-accent">Tour Categories</h3>
            <ul className="space-y-4">
              <li><Link to="/packages?cat=beach" className="text-slate-300 hover:text-white transition-colors">Beach Tours</Link></li>
              <li><Link to="/packages?cat=culture" className="text-slate-300 hover:text-white transition-colors">Cultural Tours</Link></li>
              <li><Link to="/packages?cat=wildlife" className="text-slate-300 hover:text-white transition-colors">Wildlife Safari</Link></li>
              <li><Link to="/packages?cat=honeymoon" className="text-slate-300 hover:text-white transition-colors">Honeymoon Packages</Link></li>
              <li><Link to="/packages?cat=adventure" className="text-slate-300 hover:text-white transition-colors">Adventure Tours</Link></li>
              <li><Link to="/packages?cat=holiday" className="text-slate-300 hover:text-white transition-colors">Holiday Packages</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-accent">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-accent shrink-0" size={20} />
                <span className="text-slate-300">123 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-accent shrink-0" size={20} />
                <span className="text-slate-300">+94 11 234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-accent shrink-0" size={20} />
                <span className="text-slate-300">info@slsignaturetours.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs tracking-[0.2em] uppercase text-slate-400 font-medium">
          <p className="mb-4 md:mb-0">© 2026 SRI LANKA SIGNATURE TOURS. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
            <Link to="/privacy" className="hover:text-accent transition-colors">PRIVACY POLICY</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">TERMS OF SERVICE</Link>
            <span className="flex items-center">
              WEBSITE CREATED BY <span className="text-white ml-2 font-bold">MUSHI EDITZ</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
