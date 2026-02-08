import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone Numbers',
            details: '8894772187 / 8091134027',
            link: 'tel:+918894772187',
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        {
            icon: Mail,
            title: 'Email',
            details: 'thekaransinghvaidh@gmail.com',
            link: 'mailto:thekaransinghvaidh@gmail.com',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            icon: MapPin,
            title: 'Address',
            details: 'Hospital Road, Kotlanala, Solan, HP - 173212',
            link: '#map',
            color: 'text-ayur-green',
            bg: 'bg-ayur-beige/30'
        }
    ];

    return (
        <div className="bg-[#FCFAFA] min-h-screen pt-24 pb-12">
            {/* Hero Section */}
            <div className="container mx-auto px-4 mb-16">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block mb-6">
                        <span className="bg-ayur-green/10 text-ayur-green px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest border border-ayur-green/20">
                            Get In Touch
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-ayur-green mb-6">Contact Us</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Have questions about our Ayurvedic products or need personalized wellness guidance? We're here to help you on your journey to holistic health.
                    </p>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className="container mx-auto px-4 mb-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactInfo.map((info, index) => (
                        <a
                            key={index}
                            href={info.link}
                            className="bg-white rounded-[2rem] p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 group text-center"
                        >
                            <div className={`w-16 h-16 ${info.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <info.icon className={info.color} size={28} />
                            </div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{info.title}</h3>
                            <p className="text-gray-900 font-semibold text-sm">{info.details}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Contact Form & Map */}
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-ayur-green/10 rounded-2xl flex items-center justify-center">
                                    <MessageSquare className="text-ayur-green" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-serif font-bold text-ayur-green">Send us a Message</h2>
                                    <p className="text-gray-500 text-sm">We'll get back to you within 24 hours</p>
                                </div>
                            </div>

                            {submitted && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl">
                                    <p className="font-semibold">✓ Message sent successfully! We'll be in touch soon.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-ayur-green/20 text-gray-900"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-ayur-green/20 text-gray-900"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-ayur-green/20 text-gray-900"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-ayur-green/20 text-gray-900"
                                            placeholder="Product Inquiry"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-ayur-green/20 text-gray-900 resize-none"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-ayur-green text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-ayur-olive transition-all shadow-xl shadow-ayur-green/20 flex items-center justify-center gap-3 group"
                                >
                                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Contact */}
                        <div className="bg-ayur-green rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-serif font-bold mb-4">Patient Care Centre</h3>
                                <p className="text-white/90 mb-6 leading-relaxed font-medium">
                                    Corporate Office & Information
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 text-white">
                                        <MapPin size={20} className="flex-shrink-0 mt-1" />
                                        <span className="font-medium">Hospital Road, Kotlanala, Solan, Himachal Pradesh – 173212</span>
                                    </div>
                                    <a href="tel:+918894772187" className="flex items-center gap-3 text-white hover:text-ayur-gold transition-colors">
                                        <Phone size={20} />
                                        <span className="font-semibold">8894772187 / 8091134027</span>
                                    </a>
                                    <a href="mailto:thekaransinghvaidh@gmail.com" className="flex items-center gap-3 text-white hover:text-ayur-gold transition-colors">
                                        <Mail size={20} />
                                        <span className="font-semibold">thekaransinghvaidh@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div id="map" className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13694.461789075474!2d77.095068!3d30.897417!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f86ae3324e9c3%3A0x2c28814c987a2667!2sRadha%20Soami%20Satsang%20Beas%2C%20Solan!5e0!3m2!1sen!2sin!4v1769182809151!5m2!1sen!2sin"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
