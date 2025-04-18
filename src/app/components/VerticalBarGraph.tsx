'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const bars = [
  {
    labelTop: 'ISO',
    labelBottom: '4.2.2(b)',
    height: '90%',
    color: 'bg-red-500',
  },
  {
    labelTop: 'CFR',
    labelBottom: '820.180',
    height: '85%',
    color: 'bg-red-400',
  },
  {
    labelTop: 'ISO',
    labelBottom: '7.5.3',
    height: '60%',
    color: 'bg-orange-400',
  },
  {
    labelTop: 'CFR',
    labelBottom: '820.50',
    height: '35%',
    color: 'bg-green-400',
  },
];

export default function VerticalBarGraph() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='bg-white border rounded-lg p-4 w-full h-full min-h-[20rem] flex flex-col items-center justify-between shadow-md'>
      <h3 className='text-gray-600 text-sm font-semibold mb-4'>
        Nonconformity Analytics
      </h3>
      <div className='flex items-end justify-around w-full h-full'>
        {bars.map((bar, i) => (
          <div
            key={i}
            className='flex flex-col items-center justify-end h-full w-1/6'
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: mounted ? bar.height : 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              style={{ height: mounted ? bar.height : '0%' }}
              className={`w-6 ${bar.color} rounded-t`}
            />
            <span className='text-xs text-gray-600 mt-2 text-center leading-tight'>
              <div>{bar.labelTop}</div>
              <div>{bar.labelBottom}</div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
