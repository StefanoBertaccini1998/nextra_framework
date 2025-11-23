import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  readonly open: boolean;
  readonly onClose?: () => void;
  readonly title?: string;
  readonly children?: React.ReactNode;
  readonly variant?: 'modal' | 'offcanvas';
}

export default function Modal({ open, onClose, title, children, variant = 'modal' }: Readonly<ModalProps>) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Prevent body scroll and handle escape key when modal is open
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose?.();
      }
    };

    if (open) {
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
      const scrollClass = variant === 'modal' ? 'modal-scroll-area' : 'offcanvas-scroll-area';
      const style = document.createElement('style');
      style.textContent = `
        .${scrollClass}::-webkit-scrollbar {
          width: 8px;
        }
        .${scrollClass}::-webkit-scrollbar-track {
          background: transparent;
        }
        .${scrollClass}::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 4px;
        }
        .${scrollClass}::-webkit-scrollbar-thumb:hover {
          background: var(--color-textSecondary);
        }
      `;
      document.head.appendChild(style);
      return () => {
        style.remove();
      };
    }
  }, [open, variant]);

  if (!open) return null;

  // Backdrop opacity and blur based on variant
  const backdropClass = variant === 'modal' 
    ? 'absolute inset-0 z-0 bg-black/60 backdrop-blur-sm cursor-default'
    : 'absolute inset-0 z-0 bg-black/50 cursor-default';

  const scrollClass = variant === 'modal' ? 'modal-scroll-area' : 'offcanvas-scroll-area';

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        className={backdropClass}
        onClick={onClose}
        onKeyDown={(e) => (e.key === 'Escape' || e.key === 'Enter') && onClose?.()}
        aria-label="Close modal"
      />
      
      {/* Modal Content */}
      <div className="relative z-50 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" style={{ backgroundColor: 'var(--color-surface)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--color-navbarText)' }}>{title}</h2>
          <button 
            onClick={onClose} 
            className="transition-colors p-1 hover:opacity-70"
            style={{ color: 'var(--color-navbarText)' }}
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
        
        {/* Content - Scrollable */}
        <div 
          ref={scrollAreaRef}
          className={`flex-1 overflow-y-auto p-6 ${scrollClass}`}
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
