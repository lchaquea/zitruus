'use client';

import React, { ComponentProps } from 'react';
import { motion } from 'framer-motion';

// Define props for the motion div wrapper
type MotionDivProps = ComponentProps<typeof motion.div> & {
  children: React.ReactNode;
};

// Client component for motion.div
export function MotionDiv(props: MotionDivProps) {
  const { children, ...rest } = props;
  return (
    <motion.div {...rest}>
      {children}
    </motion.div>
  );
}

// Define container variants that can be used across the app
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Define item variants that can be used across the app
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}; 