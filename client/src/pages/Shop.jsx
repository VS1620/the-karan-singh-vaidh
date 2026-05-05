import React, { useEffect, useState } from 'react';
import SEO from '../components/seo/SEO';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LayoutGrid, Activity, Wind, HeartPulse } from 'lucide-react';
import api from '../api/api';
import ProductCard from '../components/home/ProductCard';
import ScrollToTop from '../components/layout/ScrollToTop';

// Category Image Imports
import asthmaImg from '../assets/Asthma.webp';
import diabetesImg from '../assets/Diabetes.webp';
import gallBladderImg from '../assets/Gall Bladder.webp';
import gastricImg from '../assets/Gastric.webp';
import kidneyStoneImg from '../assets/Kidney Stone.webp';
import migraineImg from '../assets/Migraine.webp';
import pilesImg from '../assets/Piles.webp';
import thyroidImg from '../assets/Thyroid.webp';
import tuberculosisImg from '../assets/Tuberculosis.webp';
import allProductsImg from '../assets/AllProducts.webp';

const seoData = {
    'All': {
        '/ayurvedic-products': {
            title: 'Buy Ayurvedic Products in Solan | 100% Natural & Trusted – Karan Singh Vaidh',
            description: 'Shop 100% natural Ayurvedic medicines in Solan by Karan Singh Vaidh (23+ yrs experience). Effective remedies for diabetes, piles, kidney stones & more. Order now for safe & herbal treatment.',
            keywords: 'Ayurvedic Products in Solan',
            h1: 'Buy 100% Natural Ayurvedic Products in Solan for Safe Healing',
            url: '/ayurvedic-products'
        },
        '/ayurvedic-treatment-products': {
            title: 'Ayurvedic Disease Wise Products | Herbal Health Care',
            description: 'Explore Ayurvedic Disease Wise Products for natural healing. Target root causes & improve health with safe, effective herbal remedies for every condition.',
            keywords: 'Ayurvedic Disease Wise Products',
            h1: 'Ayurvedic Disease Wise Products for Effective Treatment',
            url: '/ayurvedic-treatment-products'
        },
        default: {
            title: 'Buy Ayurvedic Products in Solan | 100% Natural & Trusted – Karan Singh Vaidh',
            description: 'Shop 100% natural Ayurvedic medicines in Solan by Karan Singh Vaidh (23+ yrs experience). Effective remedies for diabetes, piles, kidney stones & more. Order now for safe & herbal treatment.',
            keywords: 'Ayurvedic Products in Solan',
            h1: 'Buy 100% Natural Ayurvedic Products in Solan for Safe Healing',
            url: '/ayurvedic-products'
        }
    },
    'Asthma': {
        title: 'Ayurvedic Asthma Treatment in Solan | Herbal & Safe Solutions',
        description: 'Get effective Ayurvedic Asthma Treatment in Solan with natural herbal remedies. Improve breathing, reduce symptoms & boost immunity with safe, side-effect-free care.',
        keywords: 'Ayurvedic Asthma Treatment in Solan',
        h1: 'Best Ayurvedic Asthma Treatment in Solan with Safe Herbal Remedies',
        url: '/ayurvedic-asthma-treatment'
    },
    'Gall Bladder': {
        title: 'Best Gallbladder Stone Treatment in Solan | Ayurvedic Care',
        description: 'Get effective Gallbladder Stone Treatment in Solan with Ayurvedic care. Natural remedies help dissolve stones, reduce pain & improve digestion without surgery.',
        keywords: 'Gallbladder Stone Treatment in Solan',
        h1: 'Gallbladder Stone Treatment in Solan – Ayurvedic Care',
        url: '/gallbladder-stone-ayurvedic-treatment'
    },
    'Piles': {
        title: 'Best Piles Treatment in Solan | Natural & Affordable Care',
        description: 'Get effective Piles Treatment in Solan with Ayurvedic care. Reduce pain, swelling & bleeding naturally with safe, affordable remedies for long-term relief.',
        keywords: 'Piles Treatment in Solan',
        h1: 'Best Piles Treatment in Solan with Safe Ayurvedic Care',
        url: '/ayurvedic-piles-treatment'
    },
    'Gastric': {
        title: 'Best Gastric Treatment in Solan | Natural Ayurvedic Care',
        description: 'Get expert Gastric Treatment in Solan with Ayurvedic care. Relieve acidity, gas & indigestion naturally with safe, effective and long-lasting solutions.',
        keywords: 'Gastric Treatment in Solan',
        h1: 'Gastric Treatment in Solan for Acidity & Digestive Issues',
        url: '/ayurvedic-gastric-treatment'
    },
    'Diabetes': {
        title: 'Best Diabetes Treatment in Solan | Natural Ayurvedic Care',
        description: 'Get effective Diabetes Treatment in Solan with Ayurvedic care. Control blood sugar naturally, improve insulin function & achieve long-term health safely.',
        keywords: 'Diabetes Treatment in Solan',
        h1: 'Effective Diabetes Treatment in Solan for Long-Term Control',
        url: '/ayurvedic-diabetes-treatment'
    },
    'Tuberculosis (TB)': {
        title: 'Tuberculosis Support in Solan | Safe Ayurvedic Treatment',
        description: 'Find trusted Tuberculosis Treatment Support in Solan. Ayurvedic care helps reduce symptoms, improve strength & support faster, safer recovery naturally.',
        keywords: 'Tuberculosis Treatment Support in Solan',
        h1: 'Tuberculosis Treatment Support in Solan for Faster Recovery',
        url: '/ayurvedic-tuberculosis-support'
    },
    'Migraine': {
        title: 'Best Migraine Treatment in Solan | Natural Ayurvedic Care',
        description: 'Get effective Migraine Treatment in Solan with Ayurvedic care. Reduce headache frequency, relieve pain & achieve long-term relief naturally without side effects.',
        keywords: 'Migraine Treatment in Solan',
        h1: 'Migraine Treatment in Solan for Chronic Headache Relief',
        url: '/ayurvedic-migraine-treatment'
    },
    'Thyroid': {
        title: 'Best Thyroid Treatment in Solan | Ayurvedic Care & Relief',
        description: 'Get effective Thyroid Treatment in Solan with Ayurvedic care. Balance hormones naturally, manage symptoms & improve overall health with safe solutions.',
        keywords: 'Thyroid Treatment in Solan',
        h1: 'Thyroid Treatment in Solan for Safe Hormone Control',
        url: '/ayurvedic-thyroid-treatment'
    },
    'Kidney Stone': {
        title: 'Kidney Stone Treatment in Solan for Pain & Stone Relief',
        description: 'Find trusted Kidney Stone Treatment in Solan. Ayurvedic solutions help reduce pain, dissolve stones & improve kidney health naturally without surgery.',
        keywords: 'Kidney Stone Treatment in Solan',
        h1: 'Natural Kidney Stone Treatment in Solan Without Surgery',
        url: '/kidney-stone-ayurvedic-treatment'
    }
};

const categorySlugMap = {
    'Asthma': '/ayurvedic-asthma-treatment',
    'Gall Bladder': '/gallbladder-stone-ayurvedic-treatment',
    'Piles': '/ayurvedic-piles-treatment',
    'Gastric': '/ayurvedic-gastric-treatment',
    'Diabetes': '/ayurvedic-diabetes-treatment',
    'Tuberculosis (TB)': '/ayurvedic-tuberculosis-support',
    'Migraine': '/ayurvedic-migraine-treatment',
    'Thyroid': '/ayurvedic-thyroid-treatment',
    'Kidney Stone': '/kidney-stone-ayurvedic-treatment',
};

const Shop = ({ defaultCategory }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('az');
    const [searchParams, setSearchParams] = useSearchParams();

    // Sync selectedCategory with searchParams or defaultCategory prop
    useEffect(() => {
        const catId = searchParams.get('category');
        
        // Old Category ID to New SEO URL Mapping
        const categoryIdToSlugMap = {
            '696fa8160b6f6dc6db28bd16': '/ayurvedic-asthma-treatment',
            '69739e5df6c84d69035b1fec': '/gallbladder-stone-ayurvedic-treatment',
            '69739e67f6c84d69035b1ff1': '/ayurvedic-piles-treatment',
            '69739e6df6c84d69035b1ff6': '/ayurvedic-gastric-treatment',
            '69739e78f6c84d69035b1ffd': '/ayurvedic-diabetes-treatment',
            '69739e7df6c84d69035b2002': '/ayurvedic-tuberculosis-support',
            '69739e81f6c84d69035b2007': '/ayurvedic-migraine-treatment',
            '69739e86f6c84d69035b200c': '/ayurvedic-thyroid-treatment',
            '69760bf4f06a3c1381aab1a0': '/kidney-stone-ayurvedic-treatment',
            '69761f81bd94a7bc32beb998': '/ayurvedic-treatment-products',
        };

        // If the URL has an old category ID, redirect to the new SEO URL
        if (catId && categoryIdToSlugMap[catId]) {
            navigate(categoryIdToSlugMap[catId], { replace: true });
            return;
        }

        if (defaultCategory) {
            setSelectedCategory(defaultCategory);
        } else {
            if (catId) {
                setSelectedCategory(catId);
            } else {
                setSelectedCategory('All');
            }
        }
    }, [searchParams, defaultCategory, navigate]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, sortBy]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            // If defaultCategory is set, filter by name; otherwise use ID from search params
            if (selectedCategory !== 'All') {
                if (defaultCategory) {
                    params.append('categoryName', selectedCategory);
                } else {
                    params.append('category', selectedCategory);
                }
            }
            params.append('sort', sortBy);

            const { data } = await api.get(`/products?${params.toString()}`);
            
            // Client-side sorting as a foolproof fallback
            let sortedData = Array.isArray(data) ? [...data] : [];
            
            if (sortBy === 'az') {
                sortedData.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            } else if (sortBy === 'za') {
                sortedData.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
            } else if (sortBy === 'low') {
                sortedData.sort((a, b) => {
                    const priceA = a.packs?.[0]?.sellingPrice || 0;
                    const priceB = b.packs?.[0]?.sellingPrice || 0;
                    return priceA - priceB;
                });
            } else if (sortBy === 'high') {
                sortedData.sort((a, b) => {
                    const priceA = a.packs?.[0]?.sellingPrice || 0;
                    const priceB = b.packs?.[0]?.sellingPrice || 0;
                    return priceB - priceA;
                });
            }

            setProducts(sortedData);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const currentPath = window.location.pathname;
    const currentSEO = selectedCategory === 'All' 
        ? (seoData['All'][currentPath] || seoData['All'].default)
        : (seoData[selectedCategory] || seoData['All'].default);

    // Category Configuration for Visuals
    const categoryConfig = {
        'Asthma': { image: asthmaImg, color: 'bg-blue-100 text-blue-600', label: 'Asthma' },
        'Gall Bladder': { image: gallBladderImg, color: 'bg-green-100 text-green-600', label: 'Gall Bladder' },
        'Piles': { image: pilesImg, color: 'bg-red-100 text-red-600', label: 'Piles' },
        'Gastric': { image: gastricImg, color: 'bg-orange-100 text-orange-600', label: 'Gastric' },
        'Diabetes': { image: diabetesImg, color: 'bg-purple-100 text-purple-600', label: 'Diabetes' },
        'Tuberculosis (TB)': { image: tuberculosisImg, color: 'bg-cyan-100 text-cyan-600', label: 'Tuberculosis' },
        'Migraine': { image: migraineImg, color: 'bg-yellow-100 text-yellow-600', label: 'Migraine' },
        'Thyroid': { image: thyroidImg, color: 'bg-pink-100 text-pink-600', label: 'Thyroid' },
        'Kidney Stone': { image: kidneyStoneImg, color: 'bg-emerald-100 text-emerald-600', label: 'Kidney Stone' },
    };

    const [showAllCategories, setShowAllCategories] = useState(false);
    const displayedCategories = showAllCategories ? categories : categories?.slice(0, 5);

    return (
        <div className="min-h-screen bg-gray-50 pt-16 lg:pt-24 pb-12 -mt-16">
            <SEO 
                title={currentSEO.title}
                description={currentSEO.description}
                keywords={currentSEO.keywords}
                url={currentSEO.url}
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://thekaransinghvaidh.com/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": selectedCategory === 'All' ? "Products" : selectedCategory,
                                "item": window.location.href
                            }
                        ]
                    })}
                </script>
            </SEO>
            <ScrollToTop />
            
            {/* Hidden H1 for SEO if no visible H1 exists */}
            <h1 className="sr-only">
                {currentSEO.h1}
            </h1>
            
            {/* Mobile Scrolling Marquee - Fills the gap with dynamic info */}
            <div className="lg:hidden bg-ayur-green text-white py-2.5 overflow-hidden sticky top-0 z-40 shadow-md">
                <style>
                    {`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            display: inline-flex;
                            animation: marquee 25s linear infinite;
                            white-space: nowrap;
                        }
                    `}
                </style>
                <div className="animate-marquee flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase">
                    <span className="flex items-center gap-2">ALL INDIA DELIVERY <span className="text-ayur-gold text-lg">•</span></span>
                    <span className="flex items-center gap-2">100% PURE & HERBAL <span className="text-ayur-gold text-lg">•</span></span>
                    <span className="flex items-center gap-2">EXPERT CONSULTATION <span className="text-ayur-gold text-lg">•</span></span>
                    <span className="flex items-center gap-2">SECURE PAYMENTS <span className="text-ayur-gold text-lg">•</span></span>
                    {/* Duplicate for seamless scroll */}
                    <span className="flex items-center gap-2">ALL INDIA DELIVERY <span className="text-ayur-gold text-lg">•</span></span>
                    <span className="flex items-center gap-2">100% PURE & HERBAL <span className="text-ayur-gold text-lg">•</span></span>
                    <span className="flex items-center gap-2">EXPERT CONSULTATION <span className="text-ayur-gold text-lg">•</span></span>
                    <span className="flex items-center gap-2">SECURE PAYMENTS <span className="text-ayur-gold text-lg">•</span></span>
                </div>
            </div>

            {/* Visual Category Section (Mobile Only) */}
            <div className="lg:hidden bg-white border-b border-gray-100 mb-6 sticky top-16 z-30 pt-4 pb-2 shadow-sm relative overflow-hidden">
                <div className="w-full px-4">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h2 className="text-lg font-bold text-gray-900 border-l-4 border-ayur-green pl-3">
                            Shop by Concern
                        </h2>
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Scroll →</span>
                    </div>

                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-2 snap-x scroll-smooth group">
                        <div
                            onClick={() => navigate('/ayurvedic-products')}
                            className={`flex flex-col items-center gap-3 min-w-[80px] cursor-pointer group snap-start transition-all duration-300 ${selectedCategory === 'All' ? 'scale-110' : 'scale-100'}`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedCategory === 'All' ? 'bg-ayur-green text-white rotate-3 shadow-lg shadow-ayur-green/10' : 'bg-white border border-gray-100 text-gray-500 group-hover:border-ayur-green/10 hover:shadow-md'}`}>
                                <LayoutGrid size={28} />
                            </div>
                            <span className={`text-xs font-bold text-center transition-colors ${selectedCategory === 'All' ? 'text-ayur-green' : 'text-gray-500 group-hover:text-gray-900'}`}>All</span>
                        </div>

                        {categories?.map(cat => {
                            const config = categoryConfig[cat?.name] || { image: allProductsImg };
                            const isSelected = selectedCategory === cat._id || selectedCategory === cat.name;
                            const slug = categorySlugMap[cat.name];

                            return (
                                <div
                                    key={cat._id}
                                    onClick={() => slug ? navigate(slug) : setSearchParams({ category: cat._id })}
                                    className={`flex flex-col items-center gap-3 min-w-[90px] cursor-pointer group snap-start transition-all duration-300 ${isSelected ? 'scale-110' : 'scale-100'}`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border overflow-hidden ${isSelected ? `border-ayur-green/20 shadow-lg shadow-gray-100 -rotate-2` : 'border-gray-100 bg-white group-hover:border-ayur-green/10 group-hover:shadow-md'}`}>
                                        <img
                                            src={config.image || allProductsImg}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                                        />
                                    </div>
                                    <span className={`text-[11px] font-bold text-center leading-tight max-w-[80px] transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                                        {cat.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress Indicator Track */}
                    <div className="absolute bottom-2 left-0 right-0 h-1 px-8">
                        <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-ayur-green rounded-full transition-all duration-300" style={{ width: '40%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full px-2 md:px-4">
                {/* Filters and Search Bar Placeholder */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="text-gray-600 text-sm">
                        Showing <span className="font-bold text-ayur-green">{products.length}</span> products
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-sm text-gray-500">Sort by:</label>
                        <select
                            className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ayur-green"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="az">Alphabetically, A-Z</option>
                            <option value="za">Alphabetically, Z-A</option>
                            <option value="newest">Newest First</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block lg:w-[15%]">
                        <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 sticky top-28 transition-all hover:shadow-md max-h-[calc(100vh-140px)] overflow-y-auto">
                            <h3 className="font-serif text-2xl text-gray-900 mb-8 pb-3 border-b-2 border-ayur-green/10 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-ayur-green rounded-full"></span>
                                Categories
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => navigate('/ayurvedic-products')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${selectedCategory === 'All' ? 'bg-ayur-green text-white font-bold shadow-md shadow-ayur-green/10 translate-x-1' : 'text-gray-600 hover:bg-gray-50 hover:translate-x-1'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg transition-colors overflow-hidden ${selectedCategory === 'All' ? 'ring-2 ring-white/50' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                                            <img
                                                src={allProductsImg}
                                                alt="All Products"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-sm tracking-wide">All Products</span>
                                    </button>
                                </li>
                                {displayedCategories?.map(cat => {
                                    const config = categoryConfig[cat?.name] || { image: allProductsImg };
                                    const isSelected = selectedCategory === cat._id || selectedCategory === cat.name;
                                    const slug = categorySlugMap[cat.name];

                                    return (
                                        <li key={cat._id}>
                                            <button
                                                onClick={() => slug ? navigate(slug) : setSearchParams({ category: cat._id })}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isSelected ? 'bg-ayur-green text-white font-bold shadow-md shadow-ayur-green/10 translate-x-1' : 'text-gray-600 hover:bg-gray-50 hover:translate-x-1'}`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg transition-colors overflow-hidden ${isSelected ? 'ring-2 ring-white/50' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                                                    <img
                                                        src={config.image || allProductsImg}
                                                        alt={cat.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm tracking-wide">{cat.name}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            {categories?.length > 5 && (
                                <button
                                    onClick={() => setShowAllCategories(!showAllCategories)}
                                    className="mt-4 w-full text-xs font-bold text-ayur-green hover:text-ayur-olive transition-colors flex items-center justify-center gap-2 py-2 border border-ayur-green/10 rounded-lg hover:bg-ayur-green/5"
                                >
                                    {showAllCategories ? 'Show Less' : `+ See More (${categories.length - 5})`}
                                </button>
                            )}

                            <div className="mt-12 pt-10 border-t border-gray-50">
                                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-6">Why shop with us?</h4>
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover/item:scale-110">
                                            <Activity size={18} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-600">100% Pure & Herbs</span>
                                    </div>
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover/item:scale-110">
                                            <Wind size={18} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-600">No side effects</span>
                                    </div>
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center transition-transform group-hover/item:scale-110">
                                            <HeartPulse size={18} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-600">Expert consultation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>


                    {/* Product Grid */}
                    <div className="w-full lg:w-[85%]">
                        {loading ? (
                            <div className="flex justify-center items-center py-40">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-green"></div>
                                    <p className="text-ayur-green font-serif italic">Brewing your herbal collection...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-red-50 text-red-500">
                                <p className="font-bold">Oops! Something went wrong.</p>
                                <p className="text-sm">{error}</p>
                                <button onClick={fetchProducts} className="mt-4 text-xs underline decoration-ayur-gold">Try Again</button>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-32 bg-white rounded-xl shadow-sm border border-gray-50">
                                <p className="text-gray-400 font-serif text-xl italic mb-4">No products found in this category.</p>
                                <button
                                    onClick={() => setSearchParams({})}
                                    className="bg-ayur-green text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    View All Products
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {products.map(product => (
                                    <ProductCard key={product._id || product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Trust Badges (Mini) */}
                <div className="grid grid-cols-3 gap-4 mt-20 border-t border-gray-200 pt-12 text-center">
                    <div>
                        <div className="text-ayur-green font-bold text-lg mb-1">100% Authentic</div>
                        <div className="text-xs text-gray-500">Genuine Ayurvedic Products</div>
                    </div>
                    <div>
                        <div className="text-ayur-green font-bold text-lg mb-1">Ayush Certified</div>
                        <div className="text-xs text-gray-500">Approved by Ministry</div>
                    </div>
                    <div>
                        <div className="text-ayur-green font-bold text-lg mb-1">All India Delivery</div>
                        <div className="text-xs text-gray-500">Fast & Secure Shipping</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
