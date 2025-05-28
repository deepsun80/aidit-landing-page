'use client';

import { LinkedInLogoIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <footer className='bg-gray-800 px-6 lg:px-16 py-6 border-t border-gray-500'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
        <p className='text-sm text-gray-400'>
          &copy; {new Date().getFullYear()} Ardor Life All rights reserved.
        </p>
        <div className='flex gap-4 text-gray-400'>
          <a
            href='https://www.linkedin.com/company/ai-dit'
            target='_blank'
            aria-label='LinkedIn'
            rel='noopener noreferrer'
          >
            <LinkedInLogoIcon className='w-5 h-5 hover:text-white' />
          </a>
        </div>
      </div>
    </footer>
  );
}
