/**
 * OffCanvas - Alias for Modal component
 * 
 * This component is kept for backward compatibility but now uses the unified Modal implementation.
 * Both Modal and OffCanvas provide the same functionality:
 * - Centered overlay (not side panel)
 * - Backdrop blur
 * - Blocks interaction with AiHelper and other background elements
 * - Not full width/height (max-w-4xl, max-h-90vh)
 */
import Modal from './Modal';

export default Modal;
