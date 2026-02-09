import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            clearTimeout(timerRef.current);
        }
        return () => clearTimeout(timerRef.current);
    }, [timer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Only allow numbers and limit to 10-12 digits if needed, but 10 is standard for India
            const cleanValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: cleanValue });
            // If phone changes, reset verification
            if (isVerified) setIsVerified(false);
            if (otpSent) setOtpSent(false);
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (error) setError('');
    };

    const handleSendOTP = async () => {
        if (!formData.phone || formData.phone.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setOtpLoading(true);
        setError('');
        setSuccess('');

        try {
            const { data } = await api.post('/otp/send', { phone: formData.phone });
            if (data.success) {
                setOtpSent(true);
                setSuccess('OTP sent successfully to your mobile');
                setTimer(60); // 60 seconds resend timer
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setError('Please enter the 6-digit OTP');
            return;
        }

        setOtpLoading(true);
        setError('');
        setSuccess('');

        try {
            const { data } = await api.post('/otp/verify', { phone: formData.phone, otp });
            if (data.success) {
                setIsVerified(true);
                setSuccess('Phone number verified successfully!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isVerified) {
            setError('Please verify your mobile number first');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await register(formData.name, formData.email, formData.phone, formData.password);
            navigate('/account');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ayur-beige/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-serif text-ayur-green">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join our community for exclusive benefits
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 size={16} />
                            {success}
                        </div>
                    )}

                    <div className="rounded-md shadow-sm space-y-4">
                        {/* Phone Number Field - Always First */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-gray-500 text-sm">+91</span>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        className={`appearance-none block w-full pl-12 pr-3 py-3 border ${isVerified ? 'border-green-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green sm:text-sm`}
                                        placeholder="98765 43210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={loading || otpLoading || isVerified}
                                    />
                                    {isVerified && (
                                        <CheckCircle2 size={18} className="absolute right-3 top-3.5 text-green-500" />
                                    )}
                                </div>
                                {!isVerified && (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        disabled={otpLoading || timer > 0 || formData.phone.length !== 10}
                                        className="px-4 py-2 bg-ayur-green text-white text-xs font-bold rounded-lg hover:bg-ayur-olive disabled:opacity-50 transition-colors whitespace-nowrap"
                                    >
                                        {otpLoading ? <Loader2 size={14} className="animate-spin" /> : (timer > 0 ? `Resend (${timer}s)` : (otpSent ? 'Resend' : 'Send OTP'))}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* OTP Input Field - Shown after sending */}
                        {otpSent && !isVerified && (
                            <div className="animate-in fade-in zoom-in-95 duration-300">
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit OTP</label>
                                <div className="flex gap-2">
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        maxLength="6"
                                        required
                                        className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green sm:text-sm tracking-[0.5em] text-center font-bold"
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        disabled={otpLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleVerifyOTP}
                                        disabled={otpLoading || otp.length !== 6}
                                        className="px-6 py-2 bg-ayur-green text-white text-xs font-bold rounded-lg hover:bg-ayur-olive disabled:opacity-50 transition-colors"
                                    >
                                        {otpLoading ? <Loader2 size={14} className="animate-spin" /> : 'Verify'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Other Fields - Only accessible or prioritized after some verification flow might be better, but user asked for phone first */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green focus:z-10 sm:text-sm"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading || !isVerified}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green focus:z-10 sm:text-sm"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading || !isVerified}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading || !isVerified}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || !isVerified}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-ayur-green hover:bg-ayur-olive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ayur-green transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Complete Registration
                                    <span className="absolute right-4 inset-y-0 flex items-center pl-3">
                                        <ArrowRight size={16} />
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-ayur-green hover:text-ayur-olive">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

