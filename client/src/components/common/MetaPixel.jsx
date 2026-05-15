import { usePageTracking } from '../../hooks/usePageTracking';

/**
 * MetaPixel Component
 * This component acts as the global listener for route changes.
 * It is integrated into App.jsx within the Router.
 */
const MetaPixel = () => {
  // Use the custom tracking hook which handles deduplication and debouncing
  usePageTracking();

  return null;
};

export default MetaPixel;
