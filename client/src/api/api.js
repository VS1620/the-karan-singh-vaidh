import axios from 'axios';

// Create instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '', // Relative paths for local, live URL for prod
});

// Add interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for 401 handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Session expired or unauthorized. Redirecting to login...');
            localStorage.removeItem('userInfo');
            if (!window.location.pathname.includes('/admin/login')) {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
