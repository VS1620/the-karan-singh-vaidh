import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaPixelService } from '../services/metaPixel';
import { isDuplicatePageView } from '../utils/pixelDeduplication';

/**
 * usePageTracking Hook
 * Centralized hook for automatic PageView tracking across all React routes.
 * Includes deduplication for React StrictMode and hydration.
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Generate full path including query strings for precise tracking
    const fullPath = location.pathname + location.search;
    
    // Check if this specific path was tracked in the last 1500ms
    if (!isDuplicatePageView(fullPath)) {
      if (import.meta.env.DEV) {
        console.log(`[Meta Pixel] Navigated to: ${fullPath}`);
      }
      metaPixelService.trackPageView();
    }
  }, [location]);
};

export default usePageTracking;
