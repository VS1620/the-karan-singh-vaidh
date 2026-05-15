import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaPixelService } from '../services/metaPixel';
import { isDuplicatePageView } from '../utils/pixelDeduplication';

// Global singleton lock to prevent double-firing during StrictMode/Hydration
const pageViewLock = {
  path: '',
  timestamp: 0
};

/**
 * usePageTracking Hook
 * Centralized hook for automatic PageView tracking across all React routes.
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    const now = Date.now();
    
    // STRICT LOCK: Prevent identical fires within 2000ms
    if (fullPath === pageViewLock.path && (now - pageViewLock.timestamp < 2000)) {
      return;
    }

    // Update lock
    pageViewLock.path = fullPath;
    pageViewLock.timestamp = now;

    if (import.meta.env.DEV) {
      console.log(`[Meta Pixel] Navigated to: ${fullPath}`);
    }
    
    // MUTED: Let GTM/Static handle the PageView to prevent double-firing
    // metaPixelService.trackPageView();
  }, [location]);
};

export default usePageTracking;
