import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../../assets/thekaransinghvaidh-logo.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Shop', path: '/shop' },
        { name: 'Concerns', path: '/shop?category=concern' },
        { name: 'Consult Doctor', path: '/consult' },
        { name: 'About Us', path: '/about' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-ayur-green"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>

                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src={logo}
                        alt="The Karan Singh Vaidh"
                        className="h-10 md:h-12 object-contain"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-ayur-brown hover:text-ayur-green transition-colors font-medium text-sm tracking-wide uppercase"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <button className="text-ayur-brown hover:text-ayur-green transition-colors">
                        <Search size={22} strokeWidth={1.5} />
                    </button>
                    <Link to="/account" className="hidden md:block text-ayur-brown hover:text-ayur-green transition-colors">
                        <User size={22} strokeWidth={1.5} />
                    </Link>
                    <Link to="/cart" className="relative text-ayur-brown hover:text-ayur-green transition-colors">
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-1 bg-ayur-green text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        className="fixed inset-0 bg-ayur-beige z-50 flex flex-col p-6"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10"
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-ayur-brown"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-ayur-green text-xl font-serif font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-ayur-olive/20 my-4" />
                            <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 text-ayur-brown">
                                <User size={20} />
                                <span>My Account</span>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
