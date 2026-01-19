import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

import logo from '../../assets/thekaransinghvaidh-logo.png';

const Footer = () => {
    return (
        <footer className="bg-ayur-green text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <img
                            src={logo}
                            alt="The Karan Singh Vaidh"
                            className="h-12 bg-white/10 p-2 rounded"
                        />
                        <p className="text-sm text-gray-200 leading-relaxed">
                            Bringing 100+ years of Ayurvedic wisdom to modern lifestyle. Pure, authentic, and clinically proven herbal formulations.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-ayur-gold"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-ayur-gold"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-ayur-gold"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif mb-6 text-ayur-gold">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-200">
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/shop" className="hover:text-white">Our Products</Link></li>
                            <li><Link to="/consult" className="hover:text-white">Consult a Vaidya</Link></li>
                            <li><Link to="/blog" className="hover:text-white">Health Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Concerns */}
                    <div>
                        <h4 className="text-lg font-serif mb-6 text-ayur-gold">Shop By Concern</h4>
                        <ul className="space-y-3 text-sm text-gray-200">
                            <li><Link to="/shop?c=immunity" className="hover:text-white">Immunity Care</Link></li>
                            <li><Link to="/shop?c=digestive" className="hover:text-white">Digestive Health</Link></li>
                            <li><Link to="/shop?c=diabetes" className="hover:text-white">Diabetes Care</Link></li>
                            <li><Link to="/shop?c=skin" className="hover:text-white">Hair & Skin</Link></li>
                            <li><Link to="/shop?c=sexual" className="hover:text-white">Sexual Wellness</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-lg font-serif mb-6 text-ayur-gold">Get in Touch</h4>
                        <ul className="space-y-4 text-sm text-gray-200">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <span>123 Ayurveda Marg, New Delhi, India 110001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} />
                                <span>care@thekaransinghvaidh.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-white/10 my-10" />

                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} The Karan Singh Vaidh. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/shipping">Shipping Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
