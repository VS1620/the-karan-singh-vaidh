import axios from "axios";

// ─────────────────────────────────────────────────────────
// BASE URL
// Local  → http://localhost:5000
// Live   → value of VITE_API_URL in .env.production
//          e.g. https://the-karan-singh-vaidh.onrender.com
// ─────────────────────────────────────────────────────────
const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : import.meta.env.VITE_API_URL || window.location.origin;

// Remove any trailing slash so URLs don't get double-slashes
const API_ORIGIN = BASE_URL.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────
// getAssetUrl  — converts any stored image path to a full URL
//
// Handles all cases:
//  • Already absolute  (http/https) → return as-is
//  • Relative path     (uploads/x)  → prepend API_ORIGIN
//  • Leading slash     (/uploads/x) → prepend API_ORIGIN
//  • Empty / null                   → return fallback
// ─────────────────────────────────────────────────────────
const FALLBACK_IMAGE = "/logo.png"; // shown when image is missing

export const getAssetUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string") return FALLBACK_IMAGE;

    const trimmed = imagePath.trim();

    // Already a full URL (Cloudinary, Google Drive, etc.)
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }

    // Local path — strip leading slash and join with backend origin
    const clean = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
    return `${API_ORIGIN}/${clean}`;
};

// ─────────────────────────────────────────────────────────
// Axios instance
// ─────────────────────────────────────────────────────────
const api = axios.create({
    baseURL: `${API_ORIGIN}/api`,
    timeout: 30000,
});

// REQUEST INTERCEPTOR — attach JWT token
api.interceptors.request.use(
    (config) => {
        try {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo) {
                const parsed = JSON.parse(userInfo);
                if (parsed?.token) {
                    config.headers.Authorization = `Bearer ${parsed.token}`;
                }
            }
        } catch {
            localStorage.removeItem("userInfo");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR — handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ECONNABORTED" || !error.response) {
            console.error("Network error / timeout — Render may be waking up");
        }

        if (error.response?.status === 401) {
            console.warn("401 Unauthorized — clearing local session");
            localStorage.removeItem("userInfo");

            const isAdmin = window.location.pathname.includes("/admin");
            const isLoginPage =
                window.location.pathname.includes("/login") ||
                window.location.pathname.includes("/admin/login");

            if (!isLoginPage) {
                window.location.href = isAdmin ? "/admin/login" : "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
