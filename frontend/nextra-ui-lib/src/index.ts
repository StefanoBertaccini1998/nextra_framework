// Ensure library styles are loaded when the package is imported by the app
import './index.css';

// Export public API for the UI library
export * from './components';

// Re-export additional public API from the main app sources so consumers
// can import `layouts`, `theme` and `types` from this package.
export * from './layouts';
export * from './theme';
export * from './types';

// Expose hooks and services
export * from './hooks/useAuth';
export * from './services/api';
export * from './services/ApiClient';