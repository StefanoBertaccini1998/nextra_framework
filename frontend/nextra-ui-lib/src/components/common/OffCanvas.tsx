import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
};

export default function OffCanvas({ open, onClose, title, children }: Props) {
  console.log('OffCanvas render - open:', open, 'title:', title);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose?.();
      }
    };

    if (open) {
      console.log('OffCanvas: Setting up modal - adding escape listener and hiding body scroll');
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    // Apply webkit scrollbar styles
    if (scrollAreaRef.current && open) {
      const style = document.createElement('style');
      style.textContent = `
        .offcanvas-scroll-area::-webkit-scrollbar {
          width: 8px;
        }
        .offcanvas-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .offcanvas-scroll-area::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 4px;
        }
        .offcanvas-scroll-area::-webkit-scrollbar-thumb:hover {
          background: var(--color-textSecondary);
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [open]);

  if (!open) {
    console.log('OffCanvas: Not rendering - open is false');
    return null;
  }

  console.log('OffCanvas: Rendering modal content');

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 z-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" style={{ backgroundColor: 'var(--color-surface)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
          <h2 className="text-xl font-semibold" style={{ color: 'white' }}>{title}</h2>
          <button
            onClick={onClose}
            className="transition-colors p-1 hover:opacity-70"
            style={{ color: 'white' }}
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div 
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto p-6 offcanvas-scroll-area"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--color-border) transparent'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
