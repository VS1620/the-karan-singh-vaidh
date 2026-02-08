import axios from "axios";

/**
 * API Base URL
 * - Local: http://localhost:5000
 * - Live: https://the-karan-singh-vaidh.onrender.com
 */
const BASE_URL = window.location.hostname === 'localhost'
    ? "http://localhost:5000"
    : (import.meta.env.VITE_API_URL || "https://the-karan-singh-vaidh.onrender.com");

/**
 * Get absolute URL for assets (images/uploads)
 */
export const getAssetUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http')) return path; // Return as-is for Cloudinary, Google Drive, etc.

    // Remove leading slash for consistency
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    // Use the already calculated BASE_URL for consistency
    return `${BASE_URL}/${cleanPath}`;
};

/**
 * Axios instance
 */
const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 30000, // Increased to 30s for Render free tier cold start
    headers: {
        // CONTENT-TYPE IS AUTO-HANDLED BY AXIOS
    },
});

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo) {
            try {
                const parsedUser = JSON.parse(userInfo);
                if (parsedUser?.token) {
                    config.headers.Authorization = `Bearer ${parsedUser.token}`;
                }
            } catch (e) {
                localStorage.removeItem("userInfo");
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle timeout/network errors specifically
        if (error.code === 'ECONNABORTED' || !error.response) {
            console.error("Network error or timeout - possible Render cold start");
        }

        if (error.response?.status === 401) {
            console.warn("401 Unauthorized – Clearing user info");
            localStorage.removeItem("userInfo");

            // Only redirect if not already on login page
            if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/admin/login")) {
                window.location.href = window.location.pathname.includes("/admin") ? "/admin/login" : "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
