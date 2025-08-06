/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import { CheckIcon } from '@radix-ui/react-icons';

export default function HomePage() {
  useEffect(() => {
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (header) {
        if (currentY > 40 && !header.classList.contains('scrolled')) {
          header.classList.add('scrolled');
        } else if (currentY <= 10 && header.classList.contains('scrolled')) {
          header.classList.remove('scrolled');
        }
      }

      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [index, setIndex] = useState(0);

  const [qmsImageIndex, setQmsImageIndex] = useState(0);
  const [erpImageIndex, setErpImageIndex] = useState(0);

  const qmsImages = ['/screens/erp-1.jpg', '/screens/erp-2.jpg'];
  const erpImages = ['/screens/erp-1.jpg', '/screens/erp-2.jpg'];

  useEffect(() => {
    const qmsInterval = setInterval(() => {
      setQmsImageIndex((prev) => (prev + 1) % qmsImages.length);
    }, 4000);

    const erpInterval = setInterval(() => {
      setErpImageIndex((prev) => (prev + 1) % erpImages.length);
    }, 4000);

    return () => {
      clearInterval(qmsInterval);
      clearInterval(erpInterval);
    };
  }, []);

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
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          company: '',
        });
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

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '').slice(0, 10); // Remove non-digits
    const match = phone.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return value;

    let result = '';
    if (match[1]) result += `(${match[1]}`;
    if (match[2]) result += `) ${match[2]}`;
    if (match[3]) result += `-${match[3]}`;
    return result;
  };

  return (
    <div className='min-h-screen flex flex-col text-white bg-gray-800'>
      <Header scrollToForm={scrollToForm} />

      {/* Unified Top Section with Background */}
      <section className='relative overflow-hidden py-32 px-6 lg:px-16'>
        {/* Background layers */}
        <div
          className='absolute inset-0 z-0 bg-cover bg-no-repeat bg-center filter blur-[2px] scale-1'
          style={{
            backgroundImage: "url('/ai-bg.jpg')",
            // backgroundPosition: 'top center',
          }}
        />
        <div className='absolute inset-0 bg-blue-900 bg-opacity-80 z-0' />

        {/* Content container */}
        <div className='relative z-10 flex flex-col gap-24 max-w-7xl mx-auto'>
          {/* Header */}
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-3xl font-extrabold mb-6 leading-tight text-white'>
              AI Integrated Data Intelligence Tool
            </h1>
            <div className='w-24 h-px bg-gray-300 mb-6 mx-auto' />
            <p className='text-lg font-semibold leading-tight text-gray-200'>
              An AI-driven platform for automating Business & Quality System
              management — from audits to operations — with built-in compliance
              intelligence & data privacy at its core.
            </p>
          </div>

          {/* QMS Checklist */}
          <div className='flex flex-col lg:flex-row gap-10'>
            {/* Checklist Left */}
            <div className='max-w-2xl'>
              <ul className='space-y-5 text-lg'>
                {[
                  {
                    title: 'Answer Customer and Agency Audits Instantly',
                    description:
                      'Quickly locate relevant documentation and generate compliant responses.',
                  },
                  {
                    title: 'Identify Nonconformities in Real Time',
                    description:
                      'Surface gaps and issues across your Quality System before they become audit findings.',
                  },
                  {
                    title: 'Automate Supplier & Internal Audits',
                    description:
                      'Generate tailored audit questions based on quality system requirements and standards.',
                  },
                  {
                    title: 'Monitor Risk Through Continuous Analytics',
                    description:
                      'Gain organization-wide insight into quality system health and audit readiness.',
                  },
                ].map((item, idx) => (
                  <li key={idx} className='flex items-start gap-3'>
                    <CheckIcon className='w-10 h-10 text-white' />
                    <div>
                      <p className='font-semibold text-white leading-snug'>
                        {item.title}
                      </p>
                      <p className='text-sm text-gray-300 leading-snug'>
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rotating Image Right */}
            <div className='w-full lg:w-1/2 aspect-[16/9] relative'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={qmsImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className='absolute inset-0'
                >
                  <Image
                    src={qmsImages[qmsImageIndex]}
                    alt={`QMS Screenshot ${qmsImageIndex + 1}`}
                    layout='fill'
                    className='rounded-md shadow-md'
                    sizes='(min-width: 1024px) 50vw, 100vw'
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ERP Checklist */}
          <div className='flex flex-col-reverse lg:flex-row gap-10 '>
            {/* Rotating Image Left */}
            <div className='w-full lg:w-1/2 aspect-[16/9] relative'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={erpImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className='absolute inset-0'
                >
                  <Image
                    src={erpImages[erpImageIndex]}
                    alt={`ERP Screenshot ${erpImageIndex + 1}`}
                    layout='fill'
                    className='rounded-md shadow-md'
                    sizes='(min-width: 1024px) 50vw, 100vw'
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Checklist Right */}
            <div className='max-w-2xl'>
              <ul className='space-y-5 text-lg'>
                {[
                  {
                    title: 'Automate Quote Generation for New Orders',
                    description:
                      'Generate accurate, professional quotes based on RFQs, pricing sheets, and past records.',
                  },
                  {
                    title: 'Streamline Production and Batch Records',
                    description:
                      'Trigger production workflows and generate electronic batch records with traceability.',
                  },
                  {
                    title: 'Reduce Manual Work in Daily Operations',
                    description:
                      'Integrate AI into key processes like purchase orders, job travelers, and work instructions.',
                  },
                  {
                    title: 'Accelerate Onboarding and Process Adoption',
                    description:
                      'Empower teams with guided SOPs, smart forms, and embedded compliance logic.',
                  },
                ].map((item, idx) => (
                  <li key={idx} className='flex items-start gap-3'>
                    <CheckIcon className='w-10 h-10 text-white' />
                    <div>
                      <p className='font-semibold text-white leading-snug'>
                        {item.title}
                      </p>
                      <p className='text-sm text-gray-300 leading-snug'>
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className='bg-gray-200 px-6 lg:px-16 py-10 border-t border-b'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-700 mb-6 text-center'>
            How Ai.DIT™ Can Help Your Organization
          </h2>
          <div className='w-24 h-px bg-gray-500 mx-auto mb-6' />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {[
              {
                icon: '/icon-1-dk-resources.png',
                title: "Reclaim Up to 30% of Your Team's Resources",
                bullets: [
                  'Free up staff by automating audit prep and document review.',
                  'Focus your team on high-risk areas instead of repetitive compliance tasks.',
                ],
              },
              {
                icon: '/icon-1-dk-time.png',
                title: 'Cut Audit Prep & Onboarding Time by Over 60%',
                bullets: [
                  'Ai.DIT™ surfaces relevant documentation instantly, speeding up audit prep and internal reviews.',
                  'New team members can self-serve SOPs and key data, reducing training time and ramp-up effort.',
                ],
              },
              {
                icon: '/icon-1-dk-quality.png',
                title: 'Reduce Nonconformities by 60% with Smart Oversight',
                bullets: [
                  'Leverage our HITL-enhanced AI to ensure consistent, high-quality audit responses.',
                  'Catch issues early through continuous data validation and document quality checks.',
                ],
              },
              {
                icon: '/icon-1-dk-cost.png',
                title: 'Lower Compliance Costs by 60% Through Automation',
                bullets: [
                  'Replace costly manual processes with intelligent workflows.',
                  'Avoid unnecessary expenses by catching documentation gaps early.',
                ],
              },
              {
                icon: '/icon-1-dk-efficiency.png',
                title:
                  'Boost Compliance Efficiency by 70% Across Critical Pipelines',
                bullets: [
                  'Get ahead of issues with real-time alerts and AI-powered nonconformity detection.',
                  'Benefit from evolving AI that adapts to your workflow logic and regulatory standards.',
                  'Centralize documentation access and cut search time organization-wide with intelligent, context-aware retrieval.',
                ],
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className='bg-white text-gray-900 p-6 rounded-lg shadow-md flex flex-col gap-4 h-full'
              >
                <div className='flex items-center gap-4'>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={90}
                    height={90}
                  />
                  <h3 className='text-lg font-bold'>{item.title}</h3>
                  <sup className='ml-1 text-xs text-gray-500'>[{idx + 1}]</sup>
                </div>
                <ul className='list-disc list-inside text-sm pl-2'>
                  {item.bullets.map((point, i) => (
                    <li key={i} className='text-gray-700'>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className='mt-12 text-xs text-gray-800'>
              <p className='mb-1 font-semibold'>Sources:</p>
              <ol className='list-decimal list-inside space-y-1'>
                <li>
                  Harvard Business Review – “How to Maximize AI ROI webinar”
                  (2025).{' '}
                  <a
                    href='https://www.nice.com/lps/rpcs-hbr?utm_campaign=NL_Q225_EN_PLT_GLOB_250831_ODW_RPCS-HBR-ROI-AI-Process-MGMT&utm_source=meta&utm_medium=cpc&utm_content=0367529&utm_detail=dentsu-lal-glob&fbclid=IwZXh0bgNhZW0BMABhZGlkAaseYJpYvPgBHoifKFClrtOod1xpsUY6wh3gGRErtORzRwJonLmZ4Nxmj3BdNLw5frqXwF7r_aem_5OpWPhdCE-Eg3O13obiZGw&utm_id=120215616744490616&utm_term=120223214891220616'
                    className='underline text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View summary
                  </a>
                </li>
                <li>
                  Number Analytics – “AI Compliance Monitoring Impact Report”
                  (2023).{' '}
                  <a
                    href='https://www.numberanalytics.com/blog/ai-compliance-monitoring-firms'
                    className='underline text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View report
                  </a>
                </li>
                <li>
                  Hyperproof – “Compliance Automation Survey” (2023).{' '}
                  <a
                    href='https://hyperproof.io/resource/compliance-automation/'
                    className='underline text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Read more
                  </a>
                </li>
                <li>
                  ResearchGate – “AI-Driven Compliance Audits for Enhanced
                  Efficiency” (2024).{' '}
                  <a
                    href='https://www.researchgate.net/publication/378490586_Augmenting_the_Watchdog_AI_-Driven_Compliance_Audits_for_Enhanced_Efficiency_and_Accuracy'
                    className='underline text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View study
                  </a>
                </li>
                <li>
                  Concur – “Improving Expense Report Audits with AI” (2023).{' '}
                  <a
                    href='https://www.concur.com/blog/article/people-ai-automation-how-to-improve-expense-report-audit'
                    className='underline text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Visit source
                  </a>
                </li>
                <li>
                  ResearchGate – “AI-Driven Compliance Audits for Enhanced
                  Efficiency” (2024).{' '}
                  <a
                    href='https://www.researchgate.net/publication/378490586_Augmenting_the_Watchdog_AI_-Driven_Compliance_Audits_for_Enhanced_Efficiency_and_Accuracy'
                    className='underline text-gray-700'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View study
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} id='demo' className='relative overflow-hidden'>
        {/* Blurred Background Image */}
        <div
          className='absolute inset-0 bg-cover bg-center filter blur-[3px] scale-105 z-0'
          style={{ backgroundImage: "url('/tech-pattern.jpg')" }}
        />

        {/* Blue overlay */}
        <div className='absolute inset-0 bg-blue-700 bg-opacity-70 z-10' />

        {/* Form Content */}
        <div className='relative z-20 px-6 lg:px-16 pt-16 pb-24 max-w-3xl mx-auto text-center'>
          <p className='text-3xl font-bold mb-6'>
            Book a Demo & Get Early Access
          </p>
          <div className='w-24 h-px bg-gray-300 mx-auto mb-6' />
          {submitted ? (
            <p className='text-green-400 text-xl'>
              Thanks! We&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <input
                type='firstName'
                name='firstName'
                placeholder='First Name'
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className='w-full px-4 py-3 rounded-sm text-black'
                required
              />
              <input
                type='lastName'
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className='w-full px-4 py-3 rounded-sm text-black'
                required
              />
              <input
                type='phone'
                name='phone'
                placeholder='Work Phone'
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: formatPhoneNumber(e.target.value),
                  })
                }
                className='w-full px-4 py-3 rounded-sm text-black'
              />
              <input
                type='email'
                name='email'
                placeholder='Work Email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full px-4 py-3 rounded-sm text-black'
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
                className='w-full px-4 py-3 rounded-sm text-black'
                required
              />
              <button
                type='submit'
                className='w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-sm disabled:bg-gray-300 disabled:text-gray-500'
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Book Demo'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
