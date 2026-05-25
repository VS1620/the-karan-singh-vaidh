import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Sparkles, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const AuthPopup = () => {
    const { userInfo, login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
    const [hasBeenClosed, setHasBeenClosed] = useState(false);
    
    // Login form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Don't show if user is logged in
        if (userInfo) return;

        // Don't show if already dismissed in this session
        if (hasBeenClosed) return;

        // Don't show on login, register, or admin pages
        const path = location.pathname.toLowerCase();
        if (
            path.includes('/login') || 
            path.includes('/register') || 
            path.includes('/admin') ||
            path.includes('/checkout')
        ) {
            return;
        }

        // Show popup after 5 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [userInfo, location.pathname, hasBeenClosed]);

    const handleClose = () => {
        setIsOpen(false);
        setHasBeenClosed(true);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            // On success, close popup
            setHasBeenClosed(true);
            setIsOpen(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpRedirect = () => {
        setHasBeenClosed(true);
        setIsOpen(false);
        navigate('/register');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                {/* Backdrop Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 min-h-[500px]"
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shadow-md md:shadow-none"
                    >
                        <X size={20} />
                    </button>

                    {/* Left Panel: Botanical Wellness Banner (Hidden on Mobile) */}
                    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-ayur-green via-[#225736] to-ayur-olive p-10 flex-col justify-between text-white relative overflow-hidden">
                        {/* Decorative background shapes */}
                        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-ayur-gold/10 blur-2xl pointer-events-none" />

                        {/* Top: Branding */}
                        <div className="flex items-center gap-2">
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-white/20">
                                🌿 Authentic Ayurveda
                            </span>
                        </div>

                        {/* Middle: Value Proposition */}
                        <div className="space-y-6 my-auto">
                            <h3 className="text-3xl font-serif leading-tight text-white">
                                Unlock Your <br />
                                <span className="text-ayur-beige font-semibold">Wellness Journey</span>
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Join The Karan Singh Vaidh family to access personalized Ayurvedic consultations, track orders, and experience holistic healing.
                            </p>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-white/10 mt-0.5 text-ayur-gold">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Doctor Consultations</h4>
                                        <p className="text-xs text-white/70">Consult directly with experienced Ayurvedic specialists.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-white/10 mt-0.5 text-ayur-gold">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">100% Natural Formulations</h4>
                                        <p className="text-xs text-white/70">Pure herbs prepared with traditional processes.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-white/10 mt-0.5 text-ayur-gold">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Exclusive Rewards</h4>
                                        <p className="text-xs text-white/70">Get special updates, health tips, and direct support.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Footer */}
                        <div className="text-xs text-white/60">
                            © 2026 The Karan Singh Vaidh. All rights reserved.
                        </div>
                    </div>

                    {/* Right Panel: Auth Forms */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-150 mb-8">
                            <button
                                onClick={() => { setActiveTab('login'); setError(''); }}
                                className={`flex-1 pb-3 text-center text-sm font-bold border-b-2 transition-all ${
                                    activeTab === 'login'
                                        ? 'border-ayur-green text-ayur-green'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => { setActiveTab('signup'); setError(''); }}
                                className={`flex-1 pb-3 text-center text-sm font-bold border-b-2 transition-all ${
                                    activeTab === 'signup'
                                        ? 'border-ayur-green text-ayur-green'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                Create Account
                            </button>
                        </div>

                        {activeTab === 'login' ? (
                            /* Login Form */
                            <form onSubmit={handleLoginSubmit} className="space-y-5">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-serif text-gray-800">Welcome Back</h4>
                                    <p className="text-xs text-gray-500">Please sign in to access your dashboard.</p>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                        <AlertCircle size={14} className="flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                            <input
                                                type="email"
                                                required
                                                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ayur-green focus:border-ayur-green"
                                                placeholder="example@gmail.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-xs font-semibold text-gray-600">Password</label>
                                            <button
                                                type="button"
                                                onClick={() => { handleClose(); navigate('/forgot-password'); }}
                                                className="text-[11px] text-ayur-olive hover:underline"
                                            >
                                                Forgot?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                            <input
                                                type="password"
                                                required
                                                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ayur-green focus:border-ayur-green"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-ayur-green hover:bg-ayur-olive text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                >
                                    {loading ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            /* SignUp Overview & Redirect */
                            <div className="space-y-6 flex flex-col justify-between h-full">
                                <div className="space-y-2">
                                    <h4 className="text-xl font-serif text-gray-800">Start Healing Naturally</h4>
                                    <p className="text-xs text-gray-500">
                                        We use a secure mobile OTP system to verify and secure all patient registrations.
                                    </p>
                                </div>

                                <div className="bg-ayur-beige/20 border border-ayur-beige rounded-xl p-4 space-y-3">
                                    <h5 className="text-xs font-bold text-ayur-green flex items-center gap-1.5">
                                        <Sparkles size={14} className="text-ayur-gold" />
                                        Why Register?
                                    </h5>
                                    <ul className="text-xs text-gray-600 space-y-2">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-ayur-olive" />
                                            Save medical prescriptions securely
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-ayur-olive" />
                                            Easy checkout & order tracking
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-ayur-olive" />
                                            Direct whatsapp updates for shipment
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    onClick={handleSignUpRedirect}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-ayur-green hover:bg-ayur-olive text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg mt-2"
                                >
                                    Verify Mobile & Register
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthPopup;
