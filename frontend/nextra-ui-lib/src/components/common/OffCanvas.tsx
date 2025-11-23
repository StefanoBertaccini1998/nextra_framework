import React from 'react';
import Modal from './Modal';

interface OffCanvasProps {
  readonly open: boolean;
  readonly onClose?: () => void;
  readonly title?: string;
  readonly children?: React.ReactNode;
}

/**
 * OffCanvas Component
 * 
 * A wrapper around Modal component with offcanvas variant.
 * Provides backward compatibility while using the consolidated Modal implementation.
 * 
 * @deprecated Consider using Modal component directly with variant="offcanvas"
 */
export default function OffCanvas({ open, onClose, title, children }: Readonly<OffCanvasProps>) {
  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={title} 
      variant="offcanvas"
    >
      {children}
    </Modal>
  );
}
