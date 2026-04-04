"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TopContantBar from "./TopContantBar";
import { phoneNumber } from "@/lib/constants";

interface TopNavBarProps {
  activePage?: "home" | "services" | "route-planner" | "tracking" | "fleet" | "about" | "Booking";
}

const navLinks = [
  { name: "Home", href: "/", page: "home" },
  { name: "Services", href: "/services", page: "services" },
  { name: "Route Planner", href: "/route-planner", page: "route-planner" },
  // { name: "Tracking", href: "#", page: "tracking" },
  // { name: "Fleet", href: "#", page: "fleet" },
  { name: "Booking", href: "/book", page: "Booking" },
  { name: "About", href: "/about", page: "about" },
];

export default function TopNavBar({ activePage = "home" }: TopNavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <TopContantBar />
      {/* Main Navigation Bar */}
      <nav className="sticky top-0 w-full z-[100] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:py-5">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-primary dark:text-blue-500 hover:opacity-80 transition-opacity"
          >
            Soysal
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-['Inter'] tracking-tight text-sm uppercase font-bold transition-all duration-300 relative group ${activePage === link.page
                  ? "text-primary dark:text-blue-500"
                  : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400"
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary dark:bg-blue-500 transition-all duration-300 ${activePage === link.page ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              Login
            </button>
            <button onClick={() => router.push("/route-planner")} className="bg-primary hover:bg-primary-hover cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 dark:shadow-blue-500/20 active:scale-95">
              Get a Quote
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 active:scale-90 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined transition-none">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[-1] lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[280px] bg-white dark:bg-slate-950 z-[101] shadow-2xl lg:hidden flex flex-col"
              >
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-900">
                  <span className="font-black text-xl tracking-tighter text-primary dark:text-blue-500">Soysal</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* Mobile Menu Contact Info */}
                <div className="px-8 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-900 space-y-3">
                  <a
                    href="mailto:anfrage@Soysal.de"
                    className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary dark:text-blue-500">mail</span>
                    <span className="text-primary dark:text-blue-500 font-semibold">anfrage@Soysal.de</span>
                  </a>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary dark:text-blue-500">phone</span>
                    <span className="text-primary dark:text-blue-500 font-semibold">{phoneNumber}</span>
                  </a>
                </div>

                <div className="flex-1 px-8 py-10 flex flex-col space-y-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block text-xl font-bold transition-all duration-300 ${activePage === link.page
                          ? "text-primary dark:text-blue-500 translate-x-2"
                          : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="p-8 border-t border-slate-100 dark:border-slate-900 space-y-4">
                  <button className="w-full py-4 text-slate-600 dark:text-slate-400 font-bold text-sm uppercase tracking-widest border border-slate-200 dark:border-slate-800 rounded-xl">
                    Login
                  </button>
                  <button className="w-full py-4 bg-primary dark:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest rounded-xl">
                    Support
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}