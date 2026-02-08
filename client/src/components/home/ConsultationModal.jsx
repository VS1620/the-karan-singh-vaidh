import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, Send, CheckCircle2 } from 'lucide-react';
import api from '../../api/api';

const ConsultationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        concern: '',
        preferredDate: '',
        preferredTime: 'Morning (10 AM - 1 PM)'
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        console.log('Submitting form data:', formData); // Added console log

        try {
            const response = await api.post('/appointments', formData);
            console.log('Appointment submission successful:', response.data); // Added console log
            setSuccess(true);
            setLoading(false);
            // Reset form after 3 seconds and close
            setTimeout(() => {
                setSuccess(false);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    concern: '',
                    preferredDate: '',
                    preferredTime: 'Morning (10 AM - 1 PM)'
                });
                onClose();
            }, 3000);
        } catch (err) {
            console.error('APPOINTMENT SUBMISSION ERROR:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
                className="absolute inset-0 bg-[#0d2e1b]/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-ayur-green transition-colors z-20"
                >
                    <X size={28} />
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
                    <div className="p-8 lg:p-12">
                        <h2 className="text-2xl font-serif font-bold text-ayur-green mb-2 text-center md:text-left">Expert Consultation</h2>
                        <p className="text-gray-500 text-sm mb-8">Fill in the details below to book your appointment.</p>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-ayur-green/50 mb-1.5 block ml-1">Full Name</label>
                                    <div className="relative group">
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-ayur-gold/30 focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm transition-all focus:outline-none placeholder:text-gray-300"
                                            placeholder="Aman Sharma"
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ayur-gold transition-colors" size={18} />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-ayur-green/50 mb-1.5 block ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-ayur-gold/30 focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm transition-all focus:outline-none placeholder:text-gray-300"
                                            placeholder="88xxx xxxxx"
                                        />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ayur-gold transition-colors" size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] uppercase font-black tracking-widest text-ayur-green/50 mb-1.5 block ml-1">Email Address (Optional)</label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-ayur-gold/30 focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm transition-all focus:outline-none placeholder:text-gray-300"
                                        placeholder="youremail@example.com"
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ayur-gold transition-colors" size={18} />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] uppercase font-black tracking-widest text-ayur-green/50 mb-1.5 block ml-1">Describe Your Concern</label>
                                <div className="relative group">
                                    <textarea
                                        required
                                        name="concern"
                                        value={formData.concern}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-ayur-gold/30 focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm transition-all focus:outline-none placeholder:text-gray-300 resize-none"
                                        placeholder="Write briefly about your health issue..."
                                    />
                                    <FileText className="absolute left-4 top-4 text-gray-300 group-focus-within:text-ayur-gold transition-colors" size={18} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-ayur-green/50 mb-1.5 block ml-1">Preferred Date</label>
                                    <div className="relative group">
                                        <input
                                            type="date"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-ayur-gold/30 focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm transition-all focus:outline-none"
                                        />
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ayur-gold transition-colors" size={18} />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-ayur-green/50 mb-1.5 block ml-1">Preferred Time</label>
                                    <div className="relative group">
                                        <select
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-ayur-gold/30 focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm transition-all focus:outline-none appearance-none"
                                        >
                                            <option>Morning (10 AM - 1 PM)</option>
                                            <option>Afternoon (1 PM - 4 PM)</option>
                                            <option>Evening (4 PM - 7 PM)</option>
                                        </select>
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ayur-gold transition-colors" size={18} />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0d2e1b] hover:bg-ayur-gold text-white font-black uppercase text-xs tracking-[0.3em] py-4 rounded-2xl shadow-xl shadow-ayur-green/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Request Appointment</span>
                                        <Send size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div >
    );
};

export default ConsultationModal;
