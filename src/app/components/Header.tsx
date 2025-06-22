'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

type HeaderProps = {
  scrollToForm?: () => void;
};

export default function Header({ scrollToForm }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id='main-header'
      className={`absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-16 py-4 transition-all duration-300 ${
        !scrollToForm
          ? 'border-b border-gray-500 bg-gray-800'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <div className='flex flex-col items-end gap-1'>
        <Image
          src='/AiDIt-logo.jpg'
          alt='AiDIt Logo'
          width={200}
          height={70}
          className='transition-all duration-300 ease-in-out lg:sticky-logo shrink-on-scroll'
        />
        <p className='text-lg italic text-white whitespace-nowrap pr-1'>
          Audits Simplified!
        </p>
      </div>

      {/* Desktop Nav */}
      <div className='hidden md:flex items-center gap-6'>
        {!scrollToForm && (
          <Link
            href='/'
            className='text-white font-semibold hover:underline underline-offset-4 transition-all duration-200'
          >
            Home
          </Link>
        )}
        <Link
          href='/articles'
          className='text-white font-semibold hover:underline underline-offset-4 transition-all duration-200'
        >
          Articles
        </Link>
        {scrollToForm && (
          <button
            onClick={scrollToForm}
            className='bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-sm'
          >
            Book Demo
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      <div className='md:hidden flex items-center gap-4'>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label='Toggle Menu'>
          <HamburgerMenuIcon className='w-6 h-6 text-white' />
        </button>

        {/* Book Demo (always visible) */}
        {scrollToForm && (
          <button
            onClick={scrollToForm}
            className='bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm text-sm'
          >
            Book Demo
          </button>
        )}

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className='absolute right-4 top-20 bg-gray-800 border border-gray-600 rounded-md shadow-lg w-40 py-2 z-50'>
            {!scrollToForm && (
              <Link
                href='/'
                className='block px-4 py-2 text-white hover:bg-gray-800'
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            )}
            <Link
              href='/articles'
              className='block px-4 py-2 text-white hover:bg-gray-800'
              onClick={() => setMenuOpen(false)}
            >
              Articles
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
