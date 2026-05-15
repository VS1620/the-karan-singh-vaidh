/**
 * Professional Meta Pixel Deduplication Utility
 * Prevents duplicate events caused by React StrictMode, re-renders, and rapid navigation.
 */

const EVENT_EXPIRY_MS = 1000; // 1 second window to block identical events

// Store for event history
const eventHistory = new Map();
let lastPathname = '';
let lastPathTimestamp = 0;

/**
 * Generates a unique hash for an event and its payload
 */
const generateEventHash = (eventName, payload = {}) => {
  const payloadString = JSON.stringify(payload);
  return `${eventName}_${payloadString}`;
};

/**
 * Checks if an event is a duplicate within the expiry window
 */
export const isDuplicateEvent = (eventName, payload = {}) => {
  const hash = generateEventHash(eventName, payload);
  const now = Date.now();
  const lastTimestamp = eventHistory.get(hash);

  if (lastTimestamp && now - lastTimestamp < EVENT_EXPIRY_MS) {
    if (import.meta.env.DEV) {
      console.debug(`[Meta Pixel] Duplicate event blocked: ${eventName}`, payload);
    }
    return true;
  }

  // Update history with current timestamp
  eventHistory.set(hash, now);

  // Clean up old entries periodically
  if (eventHistory.size > 50) {
    const threshold = now - (EVENT_EXPIRY_MS * 2);
    for (const [key, timestamp] of eventHistory.entries()) {
      if (timestamp < threshold) {
        eventHistory.delete(key);
      }
    }
  }

  return false;
};

/**
 * Specifically for PageView tracking to handle route changes
 */
export const isDuplicatePageView = (pathname) => {
  const now = Date.now();
  
  // Block if it's the same path AND it happened less than 1.5 seconds ago
  if (pathname === lastPathname && (now - lastPathTimestamp < EVENT_EXPIRY_MS)) {
    if (import.meta.env.DEV) {
      console.debug(`[Meta Pixel] Duplicate PageView blocked for: ${pathname}`);
    }
    return true;
  }
  
  lastPathname = pathname;
  lastPathTimestamp = now;
  return false;
};
