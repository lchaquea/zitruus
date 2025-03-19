'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface CalendlyLoaderProps {
  isVisible: boolean;
}

const CalendlyLoader: React.FC<CalendlyLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-500/90 backdrop-blur-sm flex items-center justify-center z-[2147483647]"
    >
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-dark-400/50 border border-dark-300">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-[#e1f473] rounded-full flex items-center justify-center"
        >
          <Calendar className="w-8 h-8 text-black" />
        </motion.div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold text-white">
            Opening Scheduler...
          </h3>
          <p className="text-gray-400 text-center max-w-[300px]">
            Please wait while we prepare your scheduling experience
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendlyLoader; 