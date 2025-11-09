import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center space-y-6"
          >
            <motion.img
              src="/assets/logo/full/logo-full.svg"
              alt="Nextra"
              className="h-16"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="flex space-x-2"
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0s" }}></span>
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};