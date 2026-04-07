"use client";

import { useState } from "react";
import { useRouter, Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import TopContantBar from "./TopContantBar";
import { phoneNumber } from "@/lib/constants";

interface TopNavBarProps {
  activePage?: "home" | "services" | "Price-Calculator" | "tracking" | "fleet" | "about" | "Booking" | "contact";
}

const navLinksData = [
  { key: "home", href: "/", page: "home" },
  { key: "services", href: "/services", page: "services" },
  { key: "price_calculator", href: "/Price-Calculator", page: "Price-Calculator" },
  { key: "booking", href: "/book", page: "Booking" },
  { key: "about", href: "/about", page: "about" },
  { key: "contact", href: "/contact", page: "contact" },
];

const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

export default function TopNavBar({ activePage = "home" }: TopNavBarProps) {
  const t = useTranslations('TopNavBar');
  const locale = useLocale();

  const navLinks = navLinksData.map((link: { key: string, href: string, page: string }) => ({
    ...link,
    name: t(link.key)
  }));

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const activeLocale = locales.find(l => l.code === locale) || locales[0];

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
            {/* Language Dropdown */}
            <div className="relative border-r border-slate-200 dark:border-slate-800 pr-4">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95 group font-bold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                <span className="text-lg grayscale-0">{activeLocale.flag}</span>
                <span className="hidden sm:inline">{activeLocale.code}</span>
                <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsLangOpen(false)}
                      className="fixed inset-0 z-[110]"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-[111] overflow-hidden p-1.5"
                    >
                      {locales.map((l) => (
                        <Link
                          key={l.code}
                          href={pathname || "/"}
                          locale={l.code as any}
                          onClick={() => setIsLangOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${locale === l.code
                            ? 'bg-primary/5 text-primary'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-blue-400'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{l.flag}</span>
                            <span>{l.name}</span>
                          </div>
                          {locale === l.code && (
                            <span className="material-symbols-outlined text-[18px]">check</span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button className="hidden sm:block text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              Login
            </button>
            <button onClick={() => router.push("/Price-Calculator")} className="bg-primary hover:bg-primary-hover cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 dark:shadow-blue-500/20 active:scale-95">
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
                  {navLinks.map((link: { name: string, key: string, href: string, page: string }, i: number) => (
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

                  {/* Mobile Language Switcher */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-slate-100 dark:border-slate-800"
                  >
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Language</p>
                    <div className="grid grid-cols-2 gap-2">
                      {locales.map((l) => (
                        <Link
                          key={l.code}
                          href={pathname || "/"}
                          locale={l.code as any}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${locale === l.code
                            ? 'bg-primary/5 text-primary border border-primary/20'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                            }`}
                        >
                          <span className="text-lg">{l.flag}</span>
                          <span>{l.code.toUpperCase()}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
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