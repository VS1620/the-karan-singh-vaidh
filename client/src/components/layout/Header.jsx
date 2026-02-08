import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, LogOut, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

import logo from '../../assets/thekaransinghvaidh-logo.png';

const Header = () => {
    const { userInfo, logout } = React.useContext(AuthContext);
    const { cartItems } = React.useContext(CartContext);
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
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
                : 'bg-white/80 backdrop-blur-sm py-4 border-b border-gray-100'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Mobile: Logo on Left, Menu Button Hidden, Icons on Right */}
                {/* Desktop: Menu Button Hidden, Logo Center-Left, Nav Center, Icons Right */}

                {/* Logo - First on Mobile */}
                <Link to="/" className="flex-shrink-0 order-1 md:order-2">
                    <img
                        src={logo}
                        alt="The Karan Singh  Vaidh"
                        className="h-11 md:h-14 object-contain transition-all duration-300 hover:scale-105"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-10 order-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="relative text-gray-700 hover:text-ayur-green transition-colors font-semibold text-sm tracking-wide group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ayur-green transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Icons and Mobile Menu */}
                <div className="flex items-center space-x-5 md:space-x-6 order-2 md:order-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 hover:text-ayur-green transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={26} strokeWidth={2} />
                    </button>

                    <button className="text-gray-600 hover:text-ayur-green transition-colors hidden md:block">
                        <Search size={22} strokeWidth={2} />
                    </button>

                    {userInfo ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                to="/account"
                                className="flex items-center gap-2 text-gray-700 hover:text-ayur-green transition-colors bg-gray-100 hover:bg-ayur-beige/30 px-3 py-2 rounded-full"
                            >
                                <User size={18} strokeWidth={2} />
                                <span className="text-xs font-bold">{userInfo.name.split(' ')[0]}</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-gray-600 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={20} strokeWidth={2} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden md:flex items-center gap-2 text-gray-700 hover:text-ayur-green transition-colors bg-gray-100 hover:bg-ayur-beige/30 px-4 py-2 rounded-full font-semibold text-sm"
                        >
                            <User size={18} strokeWidth={2} />
                            <span>Login</span>
                        </Link>
                    )}

                    <Link to="/cart" className="relative text-gray-700 hover:text-ayur-green transition-colors">
                        <ShoppingBag size={23} strokeWidth={2} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-ayur-green text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg animate-in zoom-in duration-300">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-[9999] flex flex-col p-6 h-screen w-screen overflow-y-auto"
                        style={{ backgroundColor: '#ffffff' }}
                    >
                        <div className="flex justify-between items-center mb-10">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-12"
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-700 hover:text-ayur-green transition-colors"
                            >
                                <X size={28} strokeWidth={2} />
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-800 text-2xl font-semibold hover:text-ayur-green transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-gray-200 my-4" />
                            {userInfo ? (
                                <>
                                    <Link
                                        to="/account"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center space-x-3 text-gray-700 text-lg font-medium"
                                    >
                                        <User size={22} />
                                        <span>My Account</span>
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                        className="flex items-center space-x-3 text-red-500 text-lg font-medium"
                                    >
                                        <LogOut size={22} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 text-ayur-green text-lg font-semibold"
                                >
                                    <User size={22} />
                                    <span>Login / Register</span>
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
