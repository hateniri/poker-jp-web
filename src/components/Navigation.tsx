'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/rooms', label: '全国の店舗' },
    { href: '/jobs', label: '求人一覧' },
    { href: '/salary', label: '時給相場' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-poker-white">
            <span className="text-poker-red suit-spade text-3xl"></span>
            <span className="text-poker-red suit-heart text-3xl"></span>
            <span className="hidden sm:inline">ポーカーディーラー.jp</span>
            <span className="sm:hidden">ポーカー.jp</span>
            <span className="text-poker-black suit-club text-3xl"></span>
            <span className="text-poker-red suit-diamond text-3xl"></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`font-semibold transition-colors ${
                  isActive(link.href) 
                    ? 'text-poker-gold' 
                    : 'text-poker-white hover:text-poker-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/subscribe" 
              className={`px-6 py-2 rounded-full font-bold chip-shadow transition-all hover:scale-105 ${
                isActive('/subscribe')
                  ? 'bg-yellow-400 text-poker-black'
                  : 'bg-poker-gold text-poker-black hover:bg-yellow-400'
              }`}
            >
              求人掲載（月額1万円）
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-poker-white hover:text-poker-gold transition-colors"
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t border-poker-gold/30 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-4 rounded font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-poker-gold/20 text-poker-gold'
                    : 'text-poker-white hover:bg-poker-gold/10 hover:text-poker-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 rounded font-bold transition-colors text-center ${
                isActive('/subscribe')
                  ? 'bg-yellow-400 text-poker-black'
                  : 'bg-poker-gold text-poker-black hover:bg-yellow-400'
              }`}
            >
              求人掲載（月額1万円）
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}