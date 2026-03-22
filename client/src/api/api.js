import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// BASE URL Configuration
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : (import.meta.env.VITE_API_URL || window.location.origin);

const API_ORIGIN = BASE_URL.replace(/\/$/, "");

// ─────────────────────────────────────────────────────────────────────────────
// getAssetUrl  — FASTEST IMAGE LOADING LOGIC
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_IMAGE = "/logo.png";

export const getAssetUrl = (imagePath, width = 600) => {
    if (!imagePath || typeof imagePath !== "string") return FALLBACK_IMAGE;

    const trimmed = imagePath.trim();

    // 1. ImageKit Magic (Auto-transorm for 10x Speed)
    if (trimmed.includes("ik.imagekit.io")) {
        // Automatically adds f-auto (WebP), q-80 (Compression), and responsive width
        // Isse website ki speed bohot fast ho jayegi!
        return `${trimmed}?tr=w-${width},q-80,f-auto`;
    }

    // 2. Cloudinary / Other Absolute URLs
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }

    // 3. Purani Local Images (Render/GoDaddy)
    let path = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
    if (!path.startsWith("uploads/") && !path.startsWith("static/") && !path.includes("logo.png")) {
        if (!path.includes("/") || path.includes("image-") || path.includes("images-")) {
            path = `uploads/${path}`;
        }
    }

    return `${API_ORIGIN}/${path}`;
};

const api = axios.create({
    baseURL: `${API_ORIGIN}/api`,
    timeout: 30000,
});

// Auth & Error Interceptors
api.interceptors.request.use((config) => {
    try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const parsed = JSON.parse(userInfo);
            if (parsed?.token) config.headers.Authorization = `Bearer ${parsed.token}`;
        }
    } catch { localStorage.removeItem("userInfo"); }
    return config;
}, (e) => Promise.reject(e));

api.interceptors.response.use(r => r, (e) => {
    if (e.response?.status === 401 && !window.location.pathname.includes("/login")) {
        localStorage.removeItem("userInfo");
        window.location.href = window.location.pathname.includes("/admin") ? "/admin/login" : "/login";
    }
    return Promise.reject(e);
});

// Keep-alive only in production
if (window.location.hostname !== "localhost") {
    setInterval(() => { axios.get(`${API_ORIGIN}/api/version`).catch(() => {}); }, 14 * 60 * 1000);
}

export default api;
