import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '+94756972582';
  const message = 'Hello! I am interested in booking a tour with Sri Lanka Signature Tours.';
  
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="md:w-8 md:h-8" fill="currentColor" />
      <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
