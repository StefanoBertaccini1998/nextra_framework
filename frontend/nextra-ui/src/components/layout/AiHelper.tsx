import React from 'react';
import { Button } from '@nextra/ui-lib';
import { motion } from 'framer-motion';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AiHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiHelper: React.FC<AiHelperProps> = ({ isOpen, onClose }) => {

  return (
    <>
      {/* Tab Handle */}
      <motion.div
        initial={false}
        animate={{ 
          right: isOpen ? "320px" : "0px"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-1/2 -translate-y-1/2 z-50"
      >
        <button
          onClick={onClose} // Now toggles both open and close
          className="bg-surface border border-border py-8 ps-3 pe-5 hover:bg-surface-hover transition-all duration-200 group
                     rounded-s-full shadow-md -me-2"
        >
          <SparklesIcon className="w-5 h-5 stroke-2 text-text group-hover:scale-110 transition-transform duration-200" />
        </button>
      </motion.div>

      {/* Panel */}
      <motion.div
        initial={false}
        animate={{ 
          width: isOpen ? "320px" : "0px",
          boxShadow: isOpen ? "-4px 0 10px rgba(0, 0, 0, 0.1)" : "none"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed right-0 top-0 h-screen bg-surface border-l border-border flex flex-col z-40 overflow-hidden"
      >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-primary stroke-2" />
              <h2 className="text-lg font-semibold text-text">AI Helper</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="hover:bg-surface-hover rounded-full p-1"
            >
              <XMarkIcon className="w-5 h-5 stroke-2 text-text" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-surface-hover rounded-lg p-4">
                <h3 className="font-medium mb-2 text-text">Suggestions</h3>
                <p className="text-sm text-text-secondary">
                  I can help you with:
                </p>
                <ul className="mt-2 space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Writing content
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Analyzing data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Generating reports
                  </li>
                </ul>
              </div>

              <div className="bg-surface p-4 rounded-lg border border-border">
                <p className="text-sm text-text-secondary">
                  Ask me anything about your data or how to use the platform!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
    </>
  );
};