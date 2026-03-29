"use client";

import Link from "next/link";

const quickLinks = ["Services Portfolio", "Global Locations", "Carrier Portal", "Tracking Portal"];
const supportLinks = ["Support Center", "Privacy Policy", "Terms of Service", "Sustainability"];
const socialIcons = ["language", "group", "public"];

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="space-y-6">
          <div className="text-xl font-bold text-[#003b93] dark:text-white">Soysal</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Leading the future of global logistics through precision engineering and technological innovation since 1998.
          </p>
          <div className="flex space-x-4">
            {socialIcons.map((icon) => (
              <span
                key={icon}
                className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary-container transition-colors"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-primary mb-6">Quick Links</h4>
          <ul className="space-y-4 font-['Inter'] text-sm">
            {quickLinks.map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-[#fb7800] transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-primary mb-6">Support</h4>
          <ul className="space-y-4 font-['Inter'] text-sm">
            {supportLinks.map((link) => (
              <li key={link}>
                <Link
                  href="#"
                  className="text-slate-500 dark:text-slate-400 hover:text-[#fb7800] transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-primary mb-6">Newsletter</h4>
          <p className="text-xs text-slate-500 mb-4">
            Subscribe for logistics insights and global trade updates.
          </p>
          <form className="flex" onSubmit={(e) => { e.preventDefault() }}>
            <input
              className="bg-white border-none rounded-l-md px-4 py-2 w-full text-sm focus:ring-1 focus:ring-primary shadow-inner outline-none"
              placeholder="Email Address"
              type="email"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 rounded-r-md hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <div>© 2024 Soysal Logistics. Precision in Motion.</div>
          <div className="flex gap-6">
            <span>ISO 9001 Certified</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}