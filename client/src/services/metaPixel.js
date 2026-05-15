/**
 * Professional Centralized Meta Pixel Service
 * All tracking methods follow industry-standard ecommerce patterns.
 */
import { isDuplicateEvent } from '../utils/pixelDeduplication';

const CURRENCY = 'INR';
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '1287897736635293'; 

/**
 * Core tracking function with safety checks and deduplication
 */
const track = (eventName, payload = {}, isCustom = false) => {
  if (typeof window.fbq !== 'function') {
    return;
  }

  // Prevent tracking null/undefined payloads
  if (!payload || (eventName !== 'PageView' && Object.keys(payload).length === 0)) {
    return;
  }

  // Deduplication check
  if (isDuplicateEvent(eventName, payload)) {
    return;
  }

  try {
    if (isCustom) {
      window.fbq('trackCustom', eventName, payload);
    } else {
      window.fbq('track', eventName, payload);
    }
    console.log(`[Meta Pixel] ${eventName} fired:`, payload);
  } catch (error) {
    console.error(`[Meta Pixel] Error tracking ${eventName}:`, error);
  }
};

export const metaPixelService = {
  /**
   * Initialize - Handled in index.html, kept for compatibility
   */
  init: () => {
    console.log('[Meta Pixel] Service ready (Global Interceptor Active)');
  },

  /**
   * PageView - Tracks location changes
   */
  trackPageView: () => {
    track('PageView');
  },

  trackViewContent: (product) => {
    if (!product) return;
    const id = product._id || product.id || product.slug;
    const price = product.price || product.packs?.[0]?.sellingPrice || 0;
    const category = typeof product.category === 'object' ? product.category.name : (product.category || 'Ayurvedic Products');

    track('ViewContent', {
      content_category: category.toUpperCase(),
      content_ids: [id.toString()],
      content_name: product.name,
      content_type: 'product',
      contents: [{
        id: id.toString(),
        quantity: 1,
        item_price: price
      }],
      currency: CURRENCY,
      value: price,
    });
  },

  trackAddToCart: (product, quantity = 1, priceOverride = null) => {
    if (!product) return;
    const id = product._id || product.id || product.slug;
    const unitPrice = priceOverride !== null ? priceOverride : (product.price || product.packs?.[0]?.sellingPrice || 0);
    const category = typeof product.category === 'object' ? product.category.name : (product.category || 'Ayurvedic Products');

    track('AddToCart', {
      content_category: category.toUpperCase(), // Match uppercase style in screenshots
      content_ids: [id.toString()],
      content_name: product.name,
      content_type: 'product',
      contents: [{
        id: id.toString(),
        quantity: quantity,
        item_price: unitPrice
      }],
      currency: CURRENCY,
      value: unitPrice * quantity,
      num_items: quantity
    });
  },

  /**
   * ViewCart - Tracks when user views their cart
   */
  trackViewCart: (cartItems, totalValue) => {
    if (!cartItems || cartItems.length === 0) return;

    track('ViewCart', {
      content_ids: cartItems.map(item => item.product?._id || item.product?.id || item._id || item.id),
      content_type: 'product',
      contents: cartItems.map(item => ({
        id: item.product?._id || item.product?.id || item._id || item.id,
        quantity: item.quantity || item.qty || 1,
        item_price: item.price
      })),
      value: totalValue || 0,
      currency: CURRENCY,
      num_items: cartItems.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0),
    }, true); // Tracked as custom event for better granularity
  },

  /**
   * trackCartViewContent - Special ViewContent for the Cart page
   */
  trackCartViewContent: (cartItems, totalValue) => {
    if (!cartItems || cartItems.length === 0) return;

    track('ViewContent', {
      content_ids: cartItems.map(item => (item.product?._id || item.product?.id || item._id || item.id || '').toString()),
      content_type: 'product',
      contents: cartItems.map(item => ({
        id: (item.product?._id || item.product?.id || item._id || item.id || '').toString(),
        quantity: item.quantity || item.qty || 1,
        item_price: item.price
      })),
      value: totalValue || 0,
      currency: CURRENCY,
      num_items: cartItems.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0),
    });
  },

  /**
   * InitiateCheckout - Tracks checkout start
   */
  trackInitiateCheckout: (cartItems, totalValue) => {
    if (!cartItems || cartItems.length === 0) return;

    track('InitiateCheckout', {
      content_ids: cartItems.map(item => item.product?._id || item.product?.id || item._id || item.id),
      content_type: 'product',
      contents: cartItems.map(item => ({
        id: item.product?._id || item.product?.id || item._id || item.id,
        quantity: item.quantity || item.qty || 1,
        item_price: item.price
      })),
      value: totalValue || 0,
      currency: CURRENCY,
      num_items: cartItems.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0),
    });
  },

  /**
   * Purchase - Tracks successful orders
   */
  trackPurchase: (orderData) => {
    if (!orderData || !orderData.orderId) return;

    track('Purchase', {
      content_ids: orderData.items?.map(item => item.product?._id || item.product?.id || item._id || item.id) || [],
      content_type: 'product',
      contents: orderData.items?.map(item => ({
        id: item.product?._id || item.product?.id || item._id || item.id,
        quantity: item.quantity || item.qty || 1,
        item_price: item.price
      })) || [],
      transaction_id: orderData.orderId,
      value: orderData.totalAmount || 0,
      currency: CURRENCY,
      num_items: orderData.items?.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0) || 0,
    });
  },

  /**
   * Lead - Consultation form submissions
   */
  trackLead: (payload = {}) => {
    track('Lead', {
      content_name: 'Consultation Form',
      ...payload,
      currency: CURRENCY
    });
  },

  /**
   * Contact - General contact form submissions
   */
  trackContact: (payload = {}) => {
    track('Contact', {
      content_name: 'Contact Form',
      ...payload
    });
  },

  /**
   * CompleteRegistration - Successful user signup
   */
  trackCompleteRegistration: (payload = {}) => {
    track('CompleteRegistration', {
      status: 'success',
      ...payload
    });
  },

  /**
   * Search - On-site product search
   */
  trackSearch: (searchString) => {
    if (!searchString) return;
    track('Search', {
      search_string: searchString,
    });
  }
};

export default metaPixelService;
