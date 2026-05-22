'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/Icon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/locations' },
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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-3 left-0 right-0 z-50 px-3 transition-all duration-500 sm:top-4 ${
          isScrolled
            ? 'translate-y-0'
            : 'translate-y-0'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl rounded-[28px] border px-3 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-500 sm:px-5 ${
            isScrolled
              ? 'border-[rgb(var(--border))] bg-white/96'
              : 'border-white/70 bg-white/90'
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-3 sm:h-20">

            {/* Logo */}
            <Link href="/" className="group flex min-w-0 flex-shrink-0 items-center gap-2 sm:gap-3">
              <div className="relative h-10 w-10 flex-shrink-0 rounded-2xl bg-[rgb(var(--primary))]/8 p-1.5 transition-all duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
                <Image
                  src="/assets/logos/logo.png"
                  alt="Moon Restaurant"
                  fill
                  className="object-contain p-1 drop-shadow-lg"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-base font-bold leading-tight text-[rgb(var(--primary))] sm:text-2xl">
                  Moon Restaurant
                </span>
                <span className="hidden text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))] sm:block sm:text-xs">
                  Taste Meets Moonlight
                </span>
              </div>
            </Link>

            {/* React Bits-style animated desktop nav */}
            <div className="hidden items-center rounded-full border border-[rgb(var(--border))] bg-white/70 p-1 md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 lg:px-6 ${
                      isActive
                        ? 'text-[rgb(var(--primary))]'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="react-bits-nav-pill"
                        className="absolute inset-0 rounded-full bg-[rgb(var(--primary))]/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-[rgb(var(--secondary))] transition-transform duration-300 group-hover:scale-x-100" />
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="tel:+923312241322"
                className="group flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--primary))]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgb(var(--secondary))] lg:text-base"
              >
                <Icon name="phone" size={18} className="transition-transform duration-300 group-hover:rotate-6" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-[rgb(var(--border))] bg-white/80 transition-colors duration-200 hover:bg-[rgb(var(--muted))] md:hidden"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-0.5 w-5 rounded-full bg-[rgb(var(--primary))]"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-0.5 w-5 rounded-full bg-[rgb(var(--primary))]"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-0.5 w-5 rounded-full bg-[rgb(var(--primary))]"
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
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-[rgb(var(--border))] px-1 py-4">
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
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                            : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--primary))]'
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
                  className="mt-2 border-t border-[rgb(var(--border))] pt-3"
                >
                  <a
                    href="tel:+923312241322"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[rgb(var(--primary))] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[rgb(var(--secondary))]"
                  >
                    <Icon name="phone" size={18} />
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
