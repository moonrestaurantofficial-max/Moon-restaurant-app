'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  // { label: 'Our Branches', href: '/locations' },
  { label: 'Reviews', href: '/reviews' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-100'
            : 'bg-white/95 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <Image
                  src="/assets/logos/logo.png"
                  alt="Moon Restaurant"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-[rgb(var(--primary))] leading-tight">
                  Moon Restaurant
                </span>
                <span className="text-[0.6rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-[rgb(var(--muted-foreground))] uppercase font-medium">
                  Taste Meets Moonlight
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links — centered */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-sm lg:text-base font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-[rgb(var(--primary))]'
                        : 'text-gray-600 hover:text-[rgb(var(--primary))]'
                    }`}
                  >
                    {/* Active / hover pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[rgb(var(--primary))]/10 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {/* Underline on hover for inactive links */}
                    {!isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[rgb(var(--primary))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Divider */}
              <div className="w-px h-8 bg-gray-200 mx-1" />
              <a
                href="tel:+923312241322"
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-full font-semibold text-sm lg:text-base hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <span>Call Us</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-6 h-0.5 bg-[rgb(var(--primary))] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-6 h-0.5 bg-[rgb(var(--primary))] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-6 h-0.5 bg-[rgb(var(--primary))] rounded-full"
              />
            </button>

          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[rgb(var(--primary))]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  className="pt-2 border-t border-gray-100 mt-2"
                >
                  <a
                    href="tel:+923312241322"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[rgb(var(--primary))] text-white rounded-xl font-semibold text-base hover:bg-[rgb(var(--secondary))] transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                    Call Us Now
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
