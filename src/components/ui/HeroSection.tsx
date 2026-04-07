"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import TrackingInput from "../shared/TrackingInput";

const HERO_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6oJQRuBNe86HlBxxP7i_IJE6LtVgiCc1QdDC2y0xFsYw6CvKeYq143pM8TXV7v_M4bzHgIWB0zBlpFz5u5JskebYQtEqoyO80ykINyvp8_0btOgVIc94TxuzRoxUBlb2gfXkOHZdzWgxbLI2K1xrci1qVRiyW-D39Oi9r6HKk62sUd9lBQ2kaEbDuuFWXNPO4V-hi--CFKGSkpn88V34cZzN7Y54rr0MxsJafDegVATGWKV71KaBs3lXW_wXPF3iL5FZrWeVQ4l2M",
  "https://gofreight.com/hubfs/Imported_Blog_Media/warehouse-management-system-1.jpg",
  "https://made4net.com/wp-content/uploads/2022/02/image002.jpg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFukXIEiv7fbLMniKCj3UmHE0-Q2aBkGcVm5nYdwHj3PKeGluMAF0UihLJMffRb5ZRkiRYwIxFormVYQl6qowYA_pdrBvmLot6xLQdVVEvgYSlnew7CSj9uMw_mfX02IdvlA3ubgpooqovGZICKTBREF3XbKm8SJQo2PeqlrjQXtCt6gsXE4t3Z_6FTYhWRz1PLcBTNTfAStNJpvzxI4l9W2VBAEuzxXWGpiFLQAaiPrXMqG9UvwbL9J26Q_uzqjABOHAljxW2J49f",
  "https://images.squarespace-cdn.com/content/v1/675e3dc411683a20789d2e00/5000021b-dcde-437a-bd5f-2787855f5ee1/Warehouse+manager+salary.jpg"
];

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative min-h-[921px] flex items-center pt-20 overflow-hidden bg-primary">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 opacity-40 bg-black">
        {HERO_IMAGES.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Logistics Hub ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[1.1]">
            {t.rich('title', {
              highlight: (chunks) => <span className="text-secondary-container ">{chunks}</span>
            })}
          </h1>
          <p className="text-lg text-primary-fixed-dim max-w-lg leading-relaxed">
            {t('description')}
          </p>

          {/* Tracking Input */}
          <TrackingInput />
        </motion.div>

        {/* Visual Element - Desktop Only */}
        <motion.div
          className="hidden lg:block relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 w-full py-36 px-8 flex flex-col items-center justify-center mx-auto shadow-2xl">
            <div className="text-center">
              <div className="text-8xl font-black text-secondary-container mb-2">{t('stats_percentage')}<span className="text-3xl">%</span></div>
              <p className="text-white font-bold tracking-widest uppercase text-sm">{t('stats_label')}</p>
            </div>
          </div>

          {/* Floating Card */}
          <motion.div
            className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-2xl max-w-[240px] border-l-4 border-secondary-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center mb-3">
              <span className="material-symbols-outlined text-secondary mr-2">verified_user</span>
              <span className="text-xs font-bold uppercase tracking-wider text-outline">{t('fleet_label')}</span>
            </div>
            <p className="text-2xl font-bold text-primary">{t('fleet_count')}</p>
            <p className="text-xs text-outline-variant">{t('fleet_desc')}</p>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}