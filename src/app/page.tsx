'use client';

import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({ email: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ email: '', company: '' });
      } else {
        alert('Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col text-white bg-gray-800'>
      {/* Header */}
      <header className='flex justify-between items-center px-6 lg:px-16 py-2 bg-gray-800'>
        <Image
          src='/AiDit-logo-v1.jpg'
          alt='AiDit Logo'
          width={220} // Adjust size as needed
          height={80}
        />
        <button
          onClick={scrollToForm}
          className='bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg'
        >
          Book Demo
        </button>
      </header>

      {/* Top Section */}
      <section
        className='flex flex-col lg:flex-row px-6 lg:px-16 py-20 gap-10 lg:gap-20 items-center justify-between bg-gray-500 relative overflow-hidden'
        // style={{
        //   backgroundImage: "url('/tech-pattern.jpg')",
        //   backgroundRepeat: 'repeat',
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        // }}
      >
        {/* Overlay (optional, for contrast) */}
        <div className='absolute inset-0 bg-gray-500 bg-opacity-80 z-0' />

        {/* Content */}
        <div className='relative z-10 max-w-2xl'>
          <h1 className='text-4xl md:text-5xl font-extrabold mb-6 leading-tight'>
            AI-Powered Audit Assistant for Medical Device Manufacturers
          </h1>
          <ul className='space-y-4 text-lg'>
            {[
              'Rapidly answer audit questions using your documents',
              'Find documentation gaps before the auditor does',
              'Connects to Google Drive, SharePoint & more',
              'Built for small regulatory teams with big audit burdens',
              'Data privacy built in—your documents stay yours',
            ].map((item, idx) => (
              <li key={idx} className='flex items-start gap-2'>
                <span className='text-green-400 mt-1'>✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Placeholder */}
        <div className='relative z-10 w-full lg:w-1/2 h-64 lg:h-96 bg-gray-600 rounded-xl border border-gray-500 flex items-center justify-center text-gray-400'>
          MVP Screenshot Coming Soon
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className='bg-gray-800 px-6 lg:px-16 py-16'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6'>
            Get Early Access & Book a Demo
          </h2>
          {submitted ? (
            <p className='text-green-400 text-xl'>
              Thanks! We&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <input
                type='email'
                name='email'
                placeholder='Work Email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full px-4 py-3 rounded-md text-black'
                required
              />
              <input
                type='text'
                name='company'
                placeholder='Company Name'
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className='w-full px-4 py-3 rounded-md text-black'
                required
              />
              <button
                type='submit'
                className='w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg'
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Book Demo'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-800 px-6 lg:px-16 py-6 border-t border-gray-700'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-gray-400'>
            &copy; {new Date().getFullYear()} Ardor Life All rights reserved.
          </p>
          <div className='flex gap-4 text-gray-400'>
            <a
              // href='https://linkedin.com'
              href='#'
              target='_blank'
              aria-label='LinkedIn'
              rel='noopener noreferrer'
            >
              <LinkedInLogoIcon className='w-5 h-5 hover:text-white' />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
