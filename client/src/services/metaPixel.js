/**
 * Professional Meta Pixel Service (Singleton Wrapper)
 * Optimized for high-fidelity tracking on wellness platforms.
 */

const CURRENCY = 'INR';

/**
 * Core tracking function - Pass-through to Global Proxy Shield
 */
const track = (eventName, payload = {}, isCustom = false) => {
  if (typeof window.fbq !== 'function') return;

  // Cleanup payload: remove empty values
  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== null && v !== undefined)
  );

  try {
    if (isCustom) {
      window.fbq('trackCustom', eventName, cleanPayload);
    } else {
      window.fbq('track', eventName, cleanPayload);
    }
  } catch (error) {
    console.error(`[Meta Pixel] Error tracking ${eventName}:`, error);
  }
};

export const metaPixelService = {
  /**
   * Initialize - Singleton Guard
   */
  init: () => {
    console.log('[Meta Pixel] Service Link Active.');
  },

  /**
   * PageView
   */
  trackPageView: () => {
    track('PageView');
  },

  /**
   * ViewContent
   */
  trackViewContent: (product) => {
    if (!product) return;
    const id = product.slug || product._id || product.id;
    const price = Number(product.price || product.packs?.[0]?.sellingPrice || 0);

    track('ViewContent', {
      content_ids: [String(id)],
      content_name: product.name,
      content_type: 'product',
      value: price,
      currency: CURRENCY,
      content_category: product.category?.name || 'Wellness'
    });
  },

  /**
   * AddToCart
   */
  trackAddToCart: (product, quantity = 1, priceOverride = null) => {
    if (!product) return;
    const unitPrice = Number(priceOverride !== null ? priceOverride : (product.price || product.packs?.[0]?.sellingPrice || 0));

    track('AddToCart', {
      content_ids: [String(product.slug || product._id || product.id)],
      content_type: 'product',
      content_name: product.name,
      value: Number(unitPrice * quantity),
      currency: CURRENCY,
      num_items: quantity
    });
  },

  /**
   * ViewCart
   */
  trackViewCart: (cartItems, totalValue) => {
    if (!cartItems || cartItems.length === 0) return;
    
    const contentIds = cartItems.map(item => {
      const p = item.product || item;
      return String(p.slug || p._id || p.id);
    }).filter(id => id && id !== 'undefined');

    // Use trackCustom for non-standard event to avoid warnings
    track('ViewCart', {
      content_ids: contentIds.length > 0 ? contentIds : ['cart_bundle'],
      content_type: 'product',
      value: Number(totalValue || 0),
      currency: CURRENCY,
      num_items: cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
    }, true);
  },

  /**
   * InitiateCheckout
   */
  trackInitiateCheckout: (cartItems, totalValue) => {
    if (!cartItems || cartItems.length === 0) return;

    const contentIds = cartItems.map(item => {
      const p = item.product || item;
      return String(p.slug || p._id || p.id);
    }).filter(id => id && id !== 'undefined');

    track('InitiateCheckout', {
      content_ids: contentIds.length > 0 ? contentIds : ['checkout'],
      content_type: 'product',
      value: Number(totalValue || 0),
      currency: CURRENCY,
      num_items: cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
    });
  },

  /**
   * Purchase
   */
  trackPurchase: (orderData) => {
    if (!orderData || !orderData.orderId) return;

    let contentIds = ['purchase'];
    let numItems = 1;
    
    if (orderData.items && Array.isArray(orderData.items)) {
      contentIds = orderData.items.map(item => {
        const p = item.product || item;
        return String(p.slug || p._id || p.id);
      }).filter(id => id && id !== 'undefined');
      if (contentIds.length === 0) contentIds = ['purchase'];
      numItems = orderData.items.reduce((total, item) => total + (item.quantity || 1), 0);
    } else if (orderData.cartItems && Array.isArray(orderData.cartItems)) {
      contentIds = orderData.cartItems.map(item => {
        const p = item.product || item;
        return String(p.slug || p._id || p.id);
      }).filter(id => id && id !== 'undefined');
      if (contentIds.length === 0) contentIds = ['purchase'];
      numItems = orderData.cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    }

    track('Purchase', {
      transaction_id: String(orderData.orderId),
      value: Number(orderData.totalAmount || 0),
      currency: CURRENCY,
      content_ids: contentIds,
      content_type: 'product',
      num_items: numItems
    });
  },

  /**
   * Lead
   */
  trackLead: (payload = {}) => {
    track('Lead', {
      content_name: 'Consultation Form',
      ...payload,
      currency: CURRENCY
    });
  },

  /**
   * Contact
   */
  trackContact: (payload = {}) => {
    track('Contact', {
      content_name: 'Contact Form',
      ...payload
    });
  },

  /**
   * CompleteRegistration
   */
  trackCompleteRegistration: (payload = {}) => {
    track('CompleteRegistration', {
      status: 'success',
      ...payload
    });
  },

  trackSearch: (searchString) => {
    if (!searchString) return;
    track('Search', {
      search_string: searchString,
    });
  },

  /**
   * Custom Event
   */
  trackCustom: (eventName, payload = {}) => {
    track(eventName, payload, true);
  }
};

export default metaPixelService;

