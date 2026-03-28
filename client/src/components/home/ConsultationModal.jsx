import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, Send, CheckCircle2, ChevronDown, Lock } from 'lucide-react';
import api from '../../api/api';

const ConsultationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        concern: '',
        preferredDate: '',
        preferredTime: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Load Razorpay Script
    useEffect(() => {
        if (isOpen) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Create Razorpay Order
            const { data: order } = await api.post('/appointments/create-payment');

            // 2. Configure Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SL5SABtfYmhkMp',
                amount: order.amount,
                currency: order.currency,
                name: 'The Karan Singh Vaidh',
                description: 'Appointment Booking Fee',
                order_id: order.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: '#419463'
                },
                handler: async function (response) {
                    try {
                        // 3. Verify Payment & Create Appointment
                        const appointmentPayload = {
                            ...formData,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        };

                        const { data: appointmentData } = await api.post('/appointments', appointmentPayload);
                        
                        // Show success state
                        setSuccess(true);
                        setLoading(false);
                        setTimeout(() => {
                            setSuccess(false);
                            setFormData({
                                name: '',
                                phone: '',
                                email: '',
                                service: '',
                                concern: '',
                                preferredDate: '',
                                preferredTime: ''
                            });
                            onClose();
                        }, 3000);
                    } catch (verifyError) {
                        console.error('Verification Error:', verifyError);
                        setError(verifyError.response?.data?.message || 'Payment verification failed. Please try again.');
                        setLoading(false);
                    }
                }
            };

            // Setup Razorpay event handlers
            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                console.error('Payment Failed:', response.error);
                setError(response.error.description || 'Payment failed. Please try again.');
                setLoading(false);
            });

            rzp.open();
        } catch (err) {
            console.error('Razorpay Error:', err);
            setError(err.response?.data?.message || 'Error initiating payment. Please try again.');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#fcfcfc] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
                >
                    <X size={24} />
                </button>

                {success ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-ayur-green mb-4">Request Submitted!</h2>
                        <p className="text-gray-600 text-lg max-w-md">
                            Thank you for reaching out. Our Ayurvedic experts will contact you shortly to confirm your appointment.
                        </p>
                    </div>
                ) : (
                    <div className="p-6 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information Section */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#419463] mb-2">Personal Information</h2>
                                <div className="h-px bg-gray-200 w-full mb-6"></div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#419463]/20 focus:border-[#419463] transition-all placeholder:text-gray-400"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#419463]/20 focus:border-[#419463] transition-all placeholder:text-gray-400"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#419463]/20 focus:border-[#419463] transition-all placeholder:text-gray-400"
                                                placeholder="+91 1234567890"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Details Section */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#419463] mb-2">Appointment Details</h2>
                                <div className="h-px bg-gray-200 w-full mb-6"></div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Service Required *</label>
                                        <div className="relative">
                                            <select
                                                required
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#419463]/20 focus:border-[#419463] transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select a service</option>
                                                <option value="General Consultation">General Consultation</option>
                                                <option value="Ayurvedic Treatment">Ayurvedic Treatment</option>
                                                <option value="Diet & Nutrition">Diet & Nutrition</option>
                                                <option value="Pulse Diagnosis">Pulse Diagnosis (Nadi Pariksha)</option>
                                                <option value="Lifestyle Coaching">Lifestyle Coaching</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Preferred Date *</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="date"
                                                    name="preferredDate"
                                                    value={formData.preferredDate}
                                                    onChange={handleChange}
                                                    className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#419463]/20 focus:border-[#419463] transition-all cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Preferred Time *</label>
                                            <div className="relative">
                                                <select
                                                    required
                                                    name="preferredTime"
                                                    value={formData.preferredTime}
                                                    onChange={handleChange}
                                                    className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#419463]/20 focus:border-[#419463] transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Select preferred time</option>
                                                    <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                                                    <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                                                    <option value="Evening (04:00 PM - 07:00 PM)">Evening (04:00 PM - 07:00 PM)</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Special Requests or Notes</label>
                                        <textarea
                                            name="concern"
                                            value={formData.concern}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#419463]/20 focus:border-[#419463] transition-all placeholder:text-gray-400 resize-none"
                                            placeholder="Any special requirements, symptoms, or notes you'd like to share..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-500 text-xs font-semibold rounded-lg border border-red-100 italic">
                                    {error}
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#419463] hover:bg-[#357a52] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Lock size={18} />
                                            <span>Pay ₹600 & Book Appointment</span>
                                            <Send size={18} className="ml-2" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationModal;
