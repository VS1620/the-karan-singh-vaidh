import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// BASE URL
// Local  → http://localhost:5000
// Live   → value of VITE_API_URL in .env.production
//          e.g. https://the-karan-singh-vaidh.onrender.com
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : import.meta.env.VITE_API_URL || window.location.origin;

// Remove any trailing slash so URLs don't get double-slashes
const API_ORIGIN = BASE_URL.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// getAssetUrl  — converts any stored image path to a full URL
//
// Handles all cases:
//  • Already absolute  (http/https) → return as-is (Cloudinary URLs)
//  • Relative path     (uploads/x)  → prepend API_ORIGIN
//  • Leading slash     (/uploads/x) → prepend API_ORIGIN
//  • Empty / null                   → return fallback
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_IMAGE = "/logo.png"; // shown when image is missing

export const getAssetUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string") return FALLBACK_IMAGE;

    const trimmed = imagePath.trim();

    // 1. Already an absolute URL (Cloudinary or any CDN) — return as-is
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }

    // 2. Relative Path — strip leading slash
    let path = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;

    // 3. Robustness — If it doesn't start with 'uploads/' and isn't a known static asset, 
    // it's likely a database entry missing its prefix
    if (!path.startsWith("uploads/") && !path.startsWith("static/") && !path.includes("logo.png")) {
        // Only prefix if it's a filename (no slashes) or looks like an upload
        if (!path.includes("/") || path.includes("image-") || path.includes("images-")) {
            path = `uploads/${path}`;
        }
    }

    return `${API_ORIGIN}/${path}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Keep-alive ping — prevents Render free tier from sleeping (cold starts)
// Pings the server every 14 minutes so the server stays warm
// ─────────────────────────────────────────────────────────────────────────────
const pingServer = () => {
    axios.get(`${API_ORIGIN}/api/version`).catch(() => {
        // Silent — just keeping the server alive
    });
};

// Only enable keep-alive on live site (not localhost)
if (window.location.hostname !== "localhost") {
    // Ping immediately on load, then every 14 minutes
    setTimeout(pingServer, 5000);
    setInterval(pingServer, 14 * 60 * 1000);
}

export default api;
