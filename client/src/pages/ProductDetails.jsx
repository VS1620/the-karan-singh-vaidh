import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Check, ShoppingCart, Truck, ShieldCheck, Heart, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [selectedPackIndex, setSelectedPackIndex] = useState(0);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('benefits');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                if (data.packs && data.packs.length > 0) {
                    const defaultIndex = data.packs.findIndex(p => p.isDefault);
                    setSelectedPackIndex(defaultIndex >= 0 ? defaultIndex : 0);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product || !product.packs || product.packs.length === 0) return;
        const pack = product.packs[selectedPackIndex];
        addToCart(product, pack, qty);
        navigate('/cart');
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-green"></div>
        </div>
    );

    if (!product) return <div className="text-center py-20 font-serif text-2xl text-gray-800">Product not found</div>;

    const currentPack = product.packs && product.packs[selectedPackIndex];

    // Helper to get pack context/description
    const getPackDescription = (name) => {
        const n = name.toLowerCase();
        if (n.includes('starter') || n.includes('15') || n.includes('trial')) return "Perfect for beginners to test effectiveness.";
        if (n.includes('1 month') || n.includes('30') || n.includes('standard')) return "Recommended for consistent results.";
        if (n.includes('3 month') || n.includes('90') || n.includes('complete') || n.includes('value')) return "Complete course for long-term holistic healing.";
        return "Expertly formulated for your specific health needs.";
    };

    return (
        <div className="bg-[#FCFAFA] min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-12">

                    {/* LEFT: Premium Image Gallery */}
                    <div className="md:w-5/12">
                        <div className="sticky top-28">
                            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {currentPack?.discountPercentage > 0 && (
                                    <div className="absolute top-6 left-6 bg-ayur-gold text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                        Save {currentPack.discountPercentage}%
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Optimized Content Section */}
                    <div className="md:w-7/12 flex flex-col pt-2">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex text-ayur-gold">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-xs font-medium text-gray-400">4.9/5 (125 Verified Reviews)</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ayur-green mb-4 leading-tight">{product.name}</h1>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xl">{product.shortDescription}</p>
                        </div>

                        {/* PACK SELECTION - Compact Grid */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Info size={14} className="text-ayur-gold" /> Select Your Healing Plan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {product.packs.map((pack, index) => {
                                    const isSelected = selectedPackIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedPackIndex(index)}
                                            className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between h-full ${isSelected
                                                ? 'border-ayur-green bg-ayur-green/[0.03] shadow-inner'
                                                : 'border-slate-100 bg-white hover:border-ayur-beige shadow-sm'
                                                }`}
                                        >
                                            {pack.isDefault && (
                                                <div className="absolute -top-2 left-4 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                                                    Best Value
                                                </div>
                                            )}
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className={`text-sm font-bold ${isSelected ? 'text-ayur-green' : 'text-gray-800'}`}>{pack.name}</h4>
                                                    {isSelected && <div className="w-4 h-4 rounded-full bg-ayur-green flex items-center justify-center"><Check size={10} className="text-white" /></div>}
                                                </div>
                                                <p className="text-[11px] text-gray-400 leading-tight mb-2">{getPackDescription(pack.name)}</p>
                                            </div>
                                            <div className="flex items-baseline gap-2 mt-auto">
                                                <span className="text-lg font-bold text-gray-900">₹{pack.sellingPrice}</span>
                                                {pack.mrp > pack.sellingPrice && (
                                                    <span className="text-xs text-gray-300 line-through">₹{pack.mrp}</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Included Medicines - Always visible for selected pack */}
                            {currentPack?.medicines?.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-[10px] font-bold text-ayur-olive uppercase tracking-[0.2em] mb-3">Included in this pack:</h4>
                                    <div className="p-4 bg-emerald-50/30 rounded-2xl border border-ayur-green/10">
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                                            {currentPack.medicines.map((med, i) => (
                                                <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-ayur-gold" /> {med}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* DYNAMIC ACTION SECTION */}
                        <div className="mt-auto border-t border-gray-100 pt-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                                    <button
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
                                    >-</button>
                                    <span className="w-10 text-center font-bold text-sm">{qty}</span>
                                    <button
                                        onClick={() => setQty(q => q + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-500 transition-colors"
                                    >+</button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-grow bg-ayur-green text-white py-4 px-8 rounded-full font-bold text-sm md:text-base hover:bg-ayur-olive transition-all shadow-lg shadow-ayur-green/20 flex items-center justify-center gap-3 transform active:scale-95"
                                >
                                    <ShoppingCart size={18} />
                                    <span>Add {currentPack?.name} – ₹{currentPack?.sellingPrice * qty}</span>
                                </button>
                            </div>

                            <div className="flex justify-between md:justify-start md:gap-8 mt-6 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><Truck size={14} className="text-ayur-gold" /> Free Shipping</span>
                                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-ayur-gold" /> Quality Assured</span>
                                <span className="flex items-center gap-1.5"><Heart size={14} className="text-ayur-gold" /> 100% Ayurvedic</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM TABBED CONTENT - Drastically reduces page height */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-50">
                    <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                        {['benefits', 'ingredients', 'usage'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-6 text-xs uppercase tracking-[0.2em] font-bold transition-all shrink-0 ${activeTab === tab
                                    ? 'text-ayur-green border-b-2 border-ayur-green'
                                    : 'text-gray-300 hover:text-gray-500'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[200px] animate-in fade-in duration-500">
                        {activeTab === 'benefits' && (
                            <div className="prose prose-sm prose-slate max-w-none">
                                <h3 className="font-serif text-2xl text-ayur-green mb-6">Unlocking Nature's Potency</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <p className="text-gray-600 leading-relaxed italic border-l-4 border-ayur-gold pl-4 py-2 bg-ayur-beige/5 rounded-r-lg">
                                            {product.fullDescription}
                                        </p>
                                    </div>
                                    <div className="bg-ayur-green/5 p-6 rounded-2xl">
                                        <h4 className="font-bold text-ayur-green mb-4 text-sm uppercase tracking-wider">Key Wellness Highlights</h4>
                                        <ul className="space-y-3">
                                            {[
                                                "Sourced from the heart of the Himalayas",
                                                "Ancient wisdom paired with modern precision",
                                                "Sustainable and ethical gathering practices",
                                                "Triple-tested for purity and potency"
                                            ].map((point, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                                    <div className="mt-1 shrink-0"><Check size={14} className="text-ayur-olive" /></div>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'ingredients' && (
                            <div className="grid md:grid-cols-3 gap-6">
                                {["Ashwagandha", "Shatavari", "Safed Musli", "Shilajit", "Gokshura", "Amla"].map((ing, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-ayur-gold/30 transition-colors group">
                                        <div className="w-12 h-12 rounded-full bg-ayur-beige/20 flex items-center justify-center font-bold text-ayur-green text-xs group-hover:bg-ayur-beige transition-colors">
                                            {ing.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">{ing}</h4>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-tight">Ancient Potent Herb</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'usage' && (
                            <div className="max-w-2xl mx-auto">
                                <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-ayur-beige">
                                    {[
                                        { step: "Morning Routine", desc: "Take 1 capsule with luke-warm water or milk after breakfast." },
                                        { step: "Evening Balance", desc: "Take 1 capsule with milk 30 minutes before bed for optimal absorption." },
                                        { step: "Consistency is Key", desc: "Continue for at least 90 days for complete rejuvenation and lasting results." }
                                    ].map((item, i) => (
                                        <div key={i} className="relative pl-10">
                                            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-ayur-gold flex items-center justify-center text-[10px] font-bold text-ayur-green z-10">
                                                {i + 1}
                                            </div>
                                            <h4 className="font-bold text-gray-800 text-sm mb-1">{item.step}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
