import api from "./api";

/**
 * Shiprocket API Service
 * Handles interaction with the backend Shiprocket endpoints
 */

/**
 * Check courier serviceability for a given postcode
 * @param {Object} data - { pickup_postcode, delivery_postcode, weight, cod }
 */
export const checkCourierServiceability = async (data) => {
    try {
        const response = await api.post("/shiprocket/check-courier", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Create a new order in Shiprocket
 * @param {Object} orderData - Complete Shiprocket order data
 */
export const createShiprocketOrder = async (orderData) => {
    try {
        const response = await api.post("/shiprocket/create-order", orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Assign AWB to a shipment
 * @param {Object} data - { shipment_id, courier_id }
 */
export const generateAWBNumber = async (data) => {
    try {
        const response = await api.post("/shiprocket/generate-awb", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Track a shipment by AWB number
 * @param {string} awb - The AWB number to track
 */
export const trackShipment = async (awb) => {
    try {
        const response = await api.get(`/shiprocket/track/${awb}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const shiprocketService = {
    checkCourierServiceability,
    createShiprocketOrder,
    generateAWBNumber,
    trackShipment
};

export default shiprocketService;
