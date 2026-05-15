import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        try {
            const stored = localStorage.getItem('userInfo');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    });
    const [loading, setLoading] = useState(false); // Initial loading can be false if we read sync

    useEffect(() => {
        // Just verify if needed, but the state is already set
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/users/login', { email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    };

    const register = async (name, email, phone, password) => {
        const { data } = await api.post('/users', { name, email, phone, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
