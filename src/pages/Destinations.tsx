import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const destinations = [
  { name: 'Colombo', img: 'https://images.unsplash.com/photo-1588598136852-d71803f3937d?auto=format&fit=crop&w=800&q=80', desc: 'The vibrant commercial capital, blending colonial charm with modern skyscrapers.' },
  { name: 'Kandy', img: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', desc: 'The cultural heart of Sri Lanka, home to the sacred Temple of the Tooth Relic.' },
  { name: 'Ella', img: 'https://images.unsplash.com/photo-1552423114-7502e39c33c7?auto=format&fit=crop&w=800&q=80', desc: 'A misty mountain village famous for the Nine Arch Bridge and stunning hikes.' },
  { name: 'Sigiriya', img: 'https://images.unsplash.com/photo-1588598136852-d71803f3937d?auto=format&fit=crop&w=800&q=80', desc: 'The majestic Lion Rock fortress, an ancient palace and UNESCO World Heritage site.' },
  { name: 'Galle', img: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800&q=80', desc: 'A historic Dutch fort city with cobblestone streets and beautiful coastal views.' },
  { name: 'Yala', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80', desc: 'The best place for wildlife safaris, famous for its high density of leopards.' },
  { name: 'Nuwara Eliya', img: 'https://images.unsplash.com/photo-1552423114-7502e39c33c7?auto=format&fit=crop&w=800&q=80', desc: 'Known as "Little England," famous for its cool climate and lush tea estates.' }
];

const Destinations = () => {
  return (
    <div className="pt-20 bg-white dark:bg-primary transition-colors duration-300">
      <section className="bg-primary py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-6">Explore Destinations</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">Discover the diverse beauty of Sri Lanka, from golden beaches to misty mountains.</p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {destinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden rounded-3xl mb-6 shadow-lg">
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center mb-1">
                      <MapPin size={16} className="text-accent mr-2" />
                      <span className="text-xs uppercase tracking-widest font-bold">Sri Lanka</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold">{dest.name}</h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{dest.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
