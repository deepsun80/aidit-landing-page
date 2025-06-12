import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const randomDates2025 = [
  '01162025',
  '02282025',
  '03072025',
  '04122025',
  '05162025',
];

const customers = [
  'ABC Inc',
  'MedEquip Solutions',
  'Nova Diagnostics',
  'Pioneer Labs',
  'SterileTech Corp',
];

const formatDateFromId = (id: string): string => {
  const mm = id.slice(0, 2);
  const dd = id.slice(2, 4);
  const yyyy = id.slice(4, 8);
  return `${mm}/${dd}/${yyyy}`;
};

const barColors = ['#22c55e', '#22c55e', '#F97316', '#DC2626', '#DC2626'];
const barWidths = ['30%', '25%', '60%', '85%', '90%'];

export default function VerticalBarGraph() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='bg-white text-gray-900 p-6 rounded-lg shadow-md overflow-x-auto min-h-[320px]'>
      <table className='min-w-full text-sm text-left'>
        <thead className='border-b border-gray-300'>
          <tr>
            <th className='py-2 pr-4 font-semibold'>Audit ID</th>
            <th className='py-2 pr-4 font-semibold'>Requesting Entity</th>
            <th className='py-2 pr-4 font-semibold'>Requested Date</th>
            <th className='py-2 font-medium'>Nonconformities</th>
          </tr>
        </thead>
        <tbody>
          {randomDates2025.map((date, idx) => (
            <tr key={idx} className='border-b border-gray-100'>
              <td className='py-4 pr-4 text-blue-600 font-medium hover:underline cursor-pointer'>
                {formatDateFromId(date)}
              </td>
              <td className='py-4 pr-4'>{customers[idx]}</td>
              <td className='py-4 pr-4'>{formatDateFromId(date)}</td>
              <td className='py-4'>
                <div className='w-full bg-gray-200 h-4 rounded-sm overflow-hidden'>
                  <motion.div
                    className='h-4 rounded-sm'
                    style={{ backgroundColor: barColors[idx] }}
                    initial={{ width: 0 }}
                    animate={{ width: animate ? barWidths[idx] : 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                  />
                </div>
                <p className='text-xs text-gray-600 mt-1'>
                  Nonconformities present
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
