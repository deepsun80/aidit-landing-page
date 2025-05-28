'use client';

import Image from 'next/image';
import Link from 'next/link';
type HeaderProps = {
  scrollToForm?: () => void;
};

export default function Header({ scrollToForm }: HeaderProps) {
  return (
    <header
      id='main-header'
      className={`absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-16 py-4 transition-all duration-300 ${
        !scrollToForm
          ? 'border-b border-gray-500 bg-gray-800'
          : 'bg-transparent'
      }`}
    >
      <Image
        src='/AiDit-logo-v1.jpg'
        alt='AiDit Logo'
        width={200}
        height={70}
        className='transition-all duration-300 ease-in-out lg:sticky-logo shrink-on-scroll'
      />

      <div className='flex items-center gap-6'>
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
    </header>
  );
}
