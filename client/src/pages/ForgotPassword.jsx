import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, Loader2, CheckCircle2, Lock } from 'lucide-react';
import api from '../api/api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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

    const handlePhoneChange = (e) => {
        const cleanValue = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPhone(cleanValue);
        if (error) setError('');
    };

    const handleSendOTP = async () => {
        if (phone.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const { data } = await api.post('/otp/send', { phone });
            if (data.success) {
                setStep(2);
                setSuccess('OTP sent successfully to your mobile');
                setTimer(60);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Is this number registered?');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            setError('Please enter the 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/otp/verify', { phone, otp });
            if (data.success) {
                setStep(3);
                setSuccess('OTP Verified! Now enter your new password.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/users/reset-password', { phone, newPassword });
            if (data.success) {
                setSuccess('Password updated successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ayur-beige/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-ayur-green/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-ayur-green" size={24} />
                    </div>
                    <h2 className="text-3xl font-serif text-ayur-green">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {step === 1 && "Enter your phone number to receive a reset code"}
                        {step === 2 && `Enter the code sent to +91 ${phone}`}
                        {step === 3 && "Create a new strong password for your account"}
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <CheckCircle2 size={16} />
                            {success}
                        </div>
                    )}

                    {/* Step 1: Phone */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-gray-500 text-sm">+91</span>
                                    <input
                                        type="tel"
                                        required
                                        className="appearance-none block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green sm:text-sm"
                                        placeholder="98765 43210"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSendOTP}
                                disabled={loading || phone.length !== 10}
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-ayur-green hover:bg-ayur-olive disabled:opacity-70 transition-colors"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Code"}
                            </button>
                        </div>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                                <input
                                    type="text"
                                    maxLength="6"
                                    required
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green sm:text-sm tracking-[0.5em] text-center font-bold"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    disabled={loading}
                                />
                            </div>
                            <button
                                onClick={handleVerifyOTP}
                                disabled={loading || otp.length !== 6}
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-ayur-green hover:bg-ayur-olive disabled:opacity-70 transition-colors"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify Code"}
                            </button>
                            <div className="text-center">
                                <button
                                    onClick={handleSendOTP}
                                    disabled={timer > 0 || loading}
                                    className="text-sm text-ayur-green hover:underline disabled:text-gray-400"
                                >
                                    {timer > 0 ? `Resend code in ${timer}s` : "Didn't get the code? Resend"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green sm:text-sm"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-ayur-green focus:border-ayur-green sm:text-sm"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !newPassword}
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-ayur-green hover:bg-ayur-olive disabled:opacity-70 transition-colors"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
                            </button>
                        </form>
                    )}

                    <div className="text-center pt-4 border-t border-gray-100">
                        <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-ayur-green flex items-center justify-center gap-1">
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
