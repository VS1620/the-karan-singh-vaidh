import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookSquare } from 'react-icons/fa';
import logo from '../../assets/thekaransinghvaidh-logo.png';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-[#1a4d3e] via-[#2C5F4F] to-[#1a4d3e] text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* Column 1: Brand & Contact */}
                    <div className="lg:col-span-5">
                        {/* Logo */}
                        <div className="mb-6">
                            <div className="bg-white/95 px-5 py-3 inline-block rounded-lg shadow-lg">
                                <img
                                    src={logo}
                                    alt="The Karan Singh  Vaidh - Ancient Ayurvedas"
                                    className="h-14 md:h-16 object-contain"
                                />
                            </div>
                        </div>

                        {/* Tagline */}
                        <p className="text-xl md:text-2xl text-[#d4af37] font-bold mb-6 leading-tight">
                            Ancient Wisdom for Modern Wellness
                        </p>


                        {/* Our Hospital & Facilities */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider border-b border-[#d4af37]/30 pb-2">
                                Our Hospital & Facilities
                            </h3>

                            {/* Hospital */}
                            <div>
                                <h4 className="text-base font-bold text-[#d4af37] mb-2 flex items-center gap-2">
                                    Hospital
                                </h4>
                                <div className="text-sm text-gray-100 leading-relaxed space-y-1">
                                    <p className="font-semibold text-white">Karan Singh Vaidh Hospital – Excellence in Patient Care</p>
                                    <p>📍 Anji, Radhasoami Satsang Road, Reboun P.O., Solan, Himachal Pradesh – 173211</p>
                                </div>
                            </div>

                            {/* Corporate Office */}
                            <div>
                                <h4 className="text-base font-bold text-[#d4af37] mb-2 flex items-center gap-2">
                                    Corporate Office / Patient Care & Information Centre
                                </h4>
                                <div className="text-sm text-gray-100 leading-relaxed space-y-1">
                                    <p className="font-semibold text-white">Supporting Your Health Journey & Patient Assistance</p>
                                    <p>📍 Hospital Road, Kotlanala, Solan, Himachal Pradesh – 173212</p>
                                </div>
                            </div>

                            {/* Manufacturing Plant */}
                            <div>
                                <h4 className="text-base font-bold text-[#d4af37] mb-2 flex items-center gap-2">
                                    Manufacturing Plant
                                </h4>
                                <div className="text-sm text-gray-100 leading-relaxed space-y-1">
                                    <p className="font-semibold text-white">Quality Ayurvedic Medicines Made with Care</p>
                                    <p>📍 Radiana, P.O. Solan, Himachal Pradesh – 173206</p>
                                </div>
                            </div>

                            {/* Warehouse */}
                            <div>
                                <h4 className="text-base font-bold text-[#d4af37] mb-2 flex items-center gap-2">
                                    Warehouse & Dispatch Office
                                </h4>
                                <div className="text-sm text-gray-100 leading-relaxed space-y-1">
                                    <p className="font-semibold text-white">Ensuring Timely Delivery Across Himachal Pradesh, India, Asia & Worldwide</p>
                                    <p>📍 Subathu, Solan, Himachal Pradesh – 173206</p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3 pt-3 border-t border-[#d4af37]/30">
                                <a
                                    href="tel:8894772187"
                                    className="flex items-center gap-3 text-base text-gray-100 hover:text-[#d4af37] transition-colors group"
                                >
                                    <Phone size={20} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">82196 58454 | 80911 34027 | 88947 72187</span>
                                </a>

                                <a
                                    href="mailto:thekaransinghvaidh@gmail.com"
                                    className="flex items-center gap-3 text-base text-gray-100 hover:text-[#d4af37] transition-colors group"
                                >
                                    <Mail size={20} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">thekaransinghvaidh@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-span-3">
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-[0.2em] relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#d4af37]">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/account" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://thekaransinghvaidh.com/real-stores-real-people.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center text-[#d4af37] hover:text-white transition-all duration-300 font-bold"
                                >
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-white mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    See Our Patients Report
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Policies & Social */}
                    <div className="lg:col-span-4">
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-[0.2em] relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#d4af37]">
                            Policies
                        </h4>
                        <ul className="space-y-4 mb-10">
                            <li>
                                <Link to="/privacy" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/cancellation" className="group flex items-center text-gray-300 hover:text-[#d4af37] transition-all duration-300 font-medium">
                                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                    Refund & Cancellation
                                </Link>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div>
                            <h5 className="text-lg font-bold mb-6 text-white uppercase tracking-[0.2em] relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#d4af37]">
                                Follow Us
                            </h5>
                            <div className="flex gap-4 items-center">
                                <a
                                    href="https://www.instagram.com/karan_singh_vaidh/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group transform hover:scale-110 transition-all duration-300"
                                    aria-label="Instagram"
                                >
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-500 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                                        <Instagram size={20} className="text-white brightness-90 group-hover:brightness-100" />
                                    </div>
                                </a>
                                <a
                                    href="https://www.facebook.com/AncientAyurvedas.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group transform hover:scale-110 transition-all duration-300"
                                    aria-label="Facebook"
                                >
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1877F2] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(24,119,242,0.3)]">
                                        <FaFacebookSquare size={20} color="white" className="brightness-90 group-hover:brightness-100" />
                                    </div>
                                </a>
                                <a
                                    href="https://www.youtube.com/c/karansinghvaidhhp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group transform hover:scale-110 transition-all duration-300"
                                    aria-label="YouTube"
                                >
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF0000] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                                        <Youtube size={20} className="text-white brightness-90 group-hover:brightness-100" fill="white" strokeWidth={0} />
                                    </div>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/karan-singh-vaidh-hp-56a903204?originalSubdomain=in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group transform hover:scale-110 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#0A66C2] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]">
                                        <svg className="w-5 h-5 text-white brightness-90 group-hover:brightness-100" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 bg-black/20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
                        <p className="text-gray-200">
                            © {new Date().getFullYear()} Karan Singh Vaidh - A unit of Maxxi Pharma Pvt Ltd. All rights reserved.
                        </p>
                        <p className="text-gray-200">
                            Developed by A unit of Maxxi Pharma Pvt Ltd
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
