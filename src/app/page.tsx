/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  CheckIcon,
  LockClosedIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';

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

  const [activePlayer, setActivePlayer] = useState<0 | 1>(0);
  const [playerClipIndex, setPlayerClipIndex] = useState<[number, number]>([
    0, 1,
  ]); // A shows 0, B preloads 1

  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const SPEED = 2.5;

  const clips = [
    {
      mp4: '/screens/sr-qms.mp4',
      webm: '/screens/sr-qms.webm',
      mov: '/screens/sr-qms.mov',
      poster: '/screens/qms-1.jpg',
    },
    {
      mp4: '/screens/sr-audit.mp4',
      webm: '/screens/sr-audit.webm',
      mov: '/screens/sr-audit.mov',
      poster: '/screens/qms-2.jpg',
    },
    {
      mp4: '/screens/sr-br.mp4',
      webm: '/screens/sr-br.webm',
      mov: '/screens/sr-br.mov',
      poster: '/screens/qms-3.jpg',
    },
  ];

  const playNext = () => {
    const nextPlayer = (activePlayer ^ 1) as 0 | 1;
    const currentClip = playerClipIndex[activePlayer];
    const nextClip = (currentClip + 1) % clips.length;

    // 1) point the hidden player to the next clip
    setPlayerClipIndex((prev) => {
      const u = [...prev] as [number, number];
      u[nextPlayer] = nextClip;
      return u;
    });

    // 2) after DOM updates, load & play the hidden player, then crossfade
    requestAnimationFrame(() => {
      const nextRef = videoRefs[nextPlayer].current;
      if (!nextRef) return;

      nextRef.playbackRate = SPEED;
      nextRef.load();

      const onCanPlay = () => {
        nextRef.removeEventListener('canplay', onCanPlay);
        nextRef.play().catch(() => {});
        setActivePlayer(nextPlayer); // crossfade handled by motion opacity
      };
      nextRef.addEventListener('canplay', onCanPlay);
    });
  };

  // When the visible clip ends, prepare & crossfade to the next
  const handleEnded = () => {
    playNext();
  };

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

  useEffect(() => {
    videoRefs.forEach((v) => {
      if (v.current) v.current.playbackRate = SPEED;
    });
  }, []);

  return (
    <div className='min-h-screen flex flex-col text-white bg-gray-800'>
      <Header scrollToForm={scrollToForm} />

      {/* Top Section */}
      <section className='pt-64 flex flex-col lg:flex-row px-6 lg:px-16 py-48 gap-6 lg:gap-[10rem] items-center justify-center relative overflow-hidden'>
        <div
          className='absolute inset-0 z-0 bg-cover bg-no-repeat bg-center filter blur-[2px] scale-100'
          style={{
            // backgroundImage: "url('/aidit-bg.png')",
            // backgroundImage: "url('/tech-pattern.jpg')",
            backgroundImage: "url('/ai-bg.jpg')",
            backgroundPosition: 'top center',
          }}
        />

        <div className='absolute inset-0 bg-blue-900 bg-opacity-80 z-0' />

        {/* Content */}
        <div className='relative z-10 max-w-2xl'>
          <h1 className='text-3xl font-extrabold mb-6 leading-tight'>
            AI Integrated Data Intelligence Tool
          </h1>
          <div className='w-24 h-px bg-gray-300 mb-6' />
          <p className='text-lg font-semibold mb-6 leading-tight text-gray-200'>
            An AI-driven platform for automating Business & Quality System
            management — from audits to operations — with built-in compliance
            intelligence & data privacy at its core.
          </p>
          <ul className='space-y-5 text-lg'>
            {[
              {
                title: 'Automate & Instantly Answer Audits',
                description:
                  'Rapidly locate relevant documentation, auto-generate compliant responses, and surface potential nonconformities before they become findings.',
              },
              {
                title: 'Streamline Supplier & Internal Audit Programs',
                description:
                  'Generate tailored questions, track findings, and close out actions with AI-driven accuracy and consistency.',
              },
              {
                title: 'Automate Quality System Workflows',
                description:
                  'Digitize and streamline core processes like Design Control, Process & Production Control, and CAPA for improved traceability and efficiency.',
              },
              {
                title: 'Continuous Compliance Monitoring & Analytics',
                description:
                  'Gain organization-wide visibility into quality system health, risk trends, and audit readiness through real-time dashboards.',
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

        {/* Rotating Clips (double-buffered) */}
        <div className='w-full lg:w-1/2 aspect-[3584/1946] relative overflow-hidden rounded-md shadow-md bg-gray-200'>
          {/* Player A */}
          <motion.div
            className='absolute inset-0'
            animate={{ opacity: activePlayer === 0 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <video
              ref={videoRefs[0]}
              className='absolute inset-0 w-full h-full object-cover'
              autoPlay
              muted
              playsInline
              preload='auto'
              onEnded={playNext}
              controls={false}
            >
              {clips[playerClipIndex[0]].webm && (
                <source
                  src={clips[playerClipIndex[0]].webm}
                  type='video/webm'
                />
              )}
              <source src={clips[playerClipIndex[0]].mp4} type='video/mp4' />
              {clips[playerClipIndex[0]].mov && (
                <source
                  src={clips[playerClipIndex[0]].mov}
                  type='video/quicktime'
                />
              )}
            </video>
          </motion.div>

          {/* Player B */}
          <motion.div
            className='absolute inset-0'
            animate={{ opacity: activePlayer === 1 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <video
              ref={videoRefs[1]}
              className='absolute inset-0 w-full h-full object-cover'
              autoPlay={false}
              muted
              playsInline
              preload='auto'
              onEnded={playNext}
              controls={false}
            >
              {clips[playerClipIndex[1]].webm && (
                <source
                  src={clips[playerClipIndex[1]].webm}
                  type='video/webm'
                />
              )}
              <source src={clips[playerClipIndex[1]].mp4} type='video/mp4' />
              {clips[playerClipIndex[1]].mov && (
                <source
                  src={clips[playerClipIndex[1]].mov}
                  type='video/quicktime'
                />
              )}
            </video>
          </motion.div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className='bg-gray-200 px-6 lg:px-16 py-10 border-t border-b'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
            How Ai.DIT™ Can Help Your Organization
          </h2>
          <div className='w-24 h-px bg-gray-500 mx-auto mb-6' />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {[
              {
                icon: '/icon-1-dk-resources.png',
                title: "Reclaim Up to 30% of Your Team's Resources",
                bullets: [
                  'Free up staff by automating compliance prep and document review.',
                  'Focus your team on high-risk areas instead of repetitive compliance tasks.',
                ],
              },
              {
                icon: '/icon-1-dk-time.png',
                title: 'Cut Audit, Process & Onboarding Time by Over 60%',
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

      {/* Trust & Data Security */}
      <section className='bg-gray-300 px-6 lg:px-16 py-16'>
        <div className='max-w-6xl mx-auto text-center'>
          <h2 className='flex items-center justify-center gap-3 text-3xl font-bold text-gray-800 mb-8'>
            <LockClosedIcon className='w-8 h-8 text-gray-600' />
            Trust &amp; Data Security
          </h2>

          <div className='w-24 h-px bg-gray-500 mx-auto mb-6' />

          <p className='text-gray-700 max-w-3xl mx-auto mb-10'>
            We build on providers that maintain industry-recognized security
            controls, ensuring your business and quality system data stays
            protected.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 text-left'>
            {[
              'SOC 2 Type II (Provider Level)',
              'Encryption In Transit & At Rest',
              'Zero Data Retention Options',
              'HIPAA-Ready Configurations',
            ].map((item, idx) => (
              <div key={idx} className='flex items-center justify-center gap-3'>
                <CheckCircledIcon className='w-6 h-6 text-green-600 flex-shrink-0 mt-0.5' />
                <span className='text-gray-800 font-medium'>{item}</span>
              </div>
            ))}
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
