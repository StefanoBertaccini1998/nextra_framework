import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  const modalRoot = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create or get the modal root element
    let root = document.getElementById('modal-root') as HTMLDivElement;
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    modalRoot.current = root;

    // Prevent body scroll when modal is open
    if (open) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    // Apply webkit scrollbar styles
    if (scrollAreaRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        .modal-scroll-area::-webkit-scrollbar {
          width: 8px;
        }
        .modal-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-scroll-area::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 4px;
        }
        .modal-scroll-area::-webkit-scrollbar-thumb:hover {
          background: var(--color-textSecondary);
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [open]);

  if (!open || !modalRoot.current) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose?.()}
        aria-label="Close modal"
      />
      
      {/* Modal Content */}
      <div className="rounded-lg shadow-2xl z-50 w-full max-w-4xl max-h-[90vh] flex flex-col relative" style={{ backgroundColor: 'var(--color-surface)' }}>
        {/* Header with primary color */}
        <div className="flex items-center justify-between px-6 py-4 rounded-t-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
          <h3 className="text-xl font-semibold" style={{ color: 'white' }}>{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body - Scrollable */}
        <div 
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto px-6 py-4 modal-scroll-area"
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

  return createPortal(modalContent, modalRoot.current);
}
