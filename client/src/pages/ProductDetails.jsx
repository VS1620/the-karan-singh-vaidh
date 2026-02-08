import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/home/ProductCard';
import api, { getAssetUrl } from '../api/api';
import { Star, Check, ShoppingCart, Truck, ShieldCheck, Heart, Info, Phone } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { idOrSlug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [selectedPackIndex, setSelectedPackIndex] = useState(0);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('benefits');
    const [imageError, setImageError] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Fallback image URL (Data URI for performance)
    const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23F4F7F6" width="600" height="600"/%3E%3Ctext fill="%23849A8E" font-family="system-ui" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${idOrSlug}`);
                setProduct(data);
                if (data && data.packs && data.packs.length > 0) {
                    const defaultIndex = data.packs.findIndex(p => p.isDefault);
                    setSelectedPackIndex(defaultIndex >= 0 ? defaultIndex : 0);
                }

                // Fetch related products
                const { data: allProducts } = await api.get('/products');
                const filtered = allProducts
                    .filter(p => (p._id || p.id) !== data._id && p.category?.name === data.category?.name)
                    .slice(0, 4);

                // If not enough related products in same category, just take other products
                if (filtered.length < 4) {
                    const others = allProducts
                        .filter(p => (p._id || p.id) !== data._id && !filtered.find(f => (f._id || f.id) === (p._id || p.id)))
                        .slice(0, 4 - filtered.length);
                    setRelatedProducts([...filtered, ...others]);
                } else {
                    setRelatedProducts(filtered);
                }

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [idOrSlug]);

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

    const packs = Array.isArray(product.packs) ? product.packs : [];
    const currentPack = packs[selectedPackIndex] || null;

    // Helper for visual badges on packs
    const getPackBadge = (pack, index) => {
        const name = pack.name.toLowerCase();
        if (name.includes('1') || name.includes('trial')) return { label: 'Trial Pack', color: 'bg-emerald-600' };
        if (name.includes('2') || name.includes('month') || name.includes('bestseller')) return { label: 'Bestseller', color: 'bg-gray-800' };
        if (name.includes('3') || name.includes('value') || name.includes('expert')) return { label: 'Expert Recommended', color: 'bg-ayur-green' };
        return index === 1 ? { label: 'Most Popular', color: 'bg-ayur-gold' } : null;
    };

    // Helper for visual tags
    const getProductTags = () => {
        const tags = [];
        if (product.category?.name) {
            tags.push({
                label: product.category.name,
                color: 'bg-green-100 text-green-800',
                link: `/shop?category=${product.category.slug || product.category._id}`
            });
        }
        if (product.isWellness) {
            tags.push({
                label: 'Wellness',
                color: 'bg-blue-100 text-blue-800',
                // Assuming there's a way to filter wellness, otherwise just text
                link: null
            });
        }
        // Add default tags if none exist to match design aesthetic
        if (tags.length === 0) {
            tags.push({ label: 'Ayurvedic', color: 'bg-orange-100 text-orange-800' });
            tags.push({ label: 'Natural', color: 'bg-yellow-100 text-yellow-800' });
        }
        return tags;
    };

    return (
        <div className="bg-white min-h-screen pt-16 lg:pt-20 pb-20 lg:pb-12 font-sans">
            <div className="container mx-auto px-0 md:px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 mb-16">

                    {/* LEFT: Gallery Layout (Vertical Strip + Main Image) */}
                    <div className="lg:w-[55%] flex flex-col lg:flex-row gap-0 lg:gap-4 h-fit lg:sticky lg:top-24">
                        {/* Vertical Thumbnail Strip - Desktop Only */}
                        <div className="hidden lg:flex flex-col gap-3 w-20 flex-shrink-0">
                            <div
                                className={`w-20 h-20 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${!activeTab ? 'border-ayur-gold' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <img
                                    src={imageError || !product.image ? fallbackImage : getAssetUrl(product.image)}
                                    alt="Main"
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = fallbackImage}
                                />
                            </div>
                            {product.images?.map((img, i) => (
                                <div key={i} className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-ayur-gold transition-all">
                                    <img
                                        src={getAssetUrl(img)}
                                        alt={`Thumbnail ${i}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.src = fallbackImage}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image Stage */}
                        <div className="flex-grow md:rounded-2xl overflow-hidden relative group aspect-square lg:aspect-auto lg:h-[600px] flex md:items-center md:justify-center md:bg-gray-50/30">
                            <img
                                src={imageError || !product.image ? fallbackImage : getAssetUrl(product.image)}
                                alt={product.name}
                                className="w-full h-full object-cover md:object-contain p-0 md:p-8 transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    if (!imageError) setImageError(true);
                                }}
                            />
                        </div>

                        {/* Horizontal Thumbnail Strip - Mobile Only */}
                        <div className="flex lg:hidden gap-3 overflow-x-auto no-scrollbar pb-2 px-4">
                            <div className="w-16 h-16 flex-shrink-0 rounded-lg border-2 border-ayur-gold overflow-hidden">
                                <img
                                    src={imageError || !product.image ? fallbackImage : getAssetUrl(product.image)}
                                    className="w-full h-full object-cover"
                                    alt="Main"
                                />
                            </div>
                            {product.images?.map((img, i) => (
                                <div key={i} className="w-16 h-16 flex-shrink-0 rounded-lg border border-gray-200 overflow-hidden">
                                    <img
                                        src={getAssetUrl(img)}
                                        className="w-full h-full object-cover"
                                        alt={`Thumb ${i}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Info & Actions */}
                    <div className="lg:w-[45%] flex flex-col pt-2 px-4 md:px-0">
                        {/* Title & Reviews */}
                        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">{product.shortDescription}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {getProductTags().map((tag, i) => (
                                tag.link ? (
                                    <Link key={i} to={tag.link} className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md tracking-wider transition-colors hover:opacity-80 ${tag.color}`}>
                                        {tag.label}
                                    </Link>
                                ) : (
                                    <span key={i} className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md tracking-wider ${tag.color}`}>
                                        {tag.label}
                                    </span>
                                )
                            ))}
                        </div>


                        {/* Main Price Display (Dynamic based on selection) */}
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-orange-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                            </div>
                            <span className="text-sm font-medium text-gray-600">4.89</span>
                        </div>

                        {/* Main Price Display (Dynamic based on selection) */}
                        <div className="mb-6 flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-gray-900">₹{currentPack?.sellingPrice || 0}</span>
                            {currentPack?.mrp > currentPack?.sellingPrice && (
                                <>
                                    <span className="text-lg text-gray-400 line-through">₹{currentPack.mrp}</span>
                                    <span className="bg-green-700 text-white text-xs font-bold px-2 py-1 rounded">
                                        {currentPack.discountPercentage}% OFF
                                    </span>
                                </>
                            )}
                            <span className="text-xs text-gray-400 italic ml-1">(Inclusive of All Taxes)</span>
                        </div>



                        {/* Pack Selection Cards - Responsive Grid/Stack */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-gray-900">Select Pack Size: <span className="text-emerald-700 font-bold ml-1">{currentPack?.name}</span></span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {packs.map((pack, index) => {
                                    const isSelected = selectedPackIndex === index;
                                    const badge = getPackBadge(pack, index);

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedPackIndex(index)}
                                            className={`relative border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-row lg:flex-col items-center lg:items-center lg:text-center group ${isSelected
                                                ? 'border-emerald-600 bg-emerald-50/10 ring-1 ring-emerald-600 shadow-md'
                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                                                }`}
                                        >
                                            {/* Header Badge */}
                                            {badge && (
                                                <div className={`${badge.color} absolute top-0 left-0 lg:relative text-white text-[9px] font-bold text-center px-2 py-1 lg:py-1 lg:w-full uppercase tracking-wide rounded-br-lg lg:rounded-br-none`}>
                                                    {badge.label}
                                                </div>
                                            )}

                                            {/* Card Content */}
                                            <div className={`p-3 flex flex-row lg:flex-col items-center flex-grow w-full gap-4 lg:gap-0 ${!badge ? 'lg:pt-6 pt-3' : ''}`}>
                                                {/* Mini Product Image */}
                                                <div className="w-16 h-16 lg:w-16 lg:h-28 lg:mb-3 relative flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg lg:bg-transparent">
                                                    <img
                                                        src={imageError || !product.image ? fallbackImage : getAssetUrl(product.image)}
                                                        className="w-full h-full object-contain relative z-10 mix-blend-multiply"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="flex flex-col lg:items-center flex-grow text-left lg:text-center">
                                                    <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wide">{pack.name}</h4>

                                                    {/* Discount Pill */}
                                                    {pack.discountPercentage > 0 && (
                                                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 w-fit">
                                                            {pack.discountPercentage}% OFF
                                                        </span>
                                                    )}

                                                    <div className="mt-1 lg:mt-auto lg:border-t lg:border-gray-100 lg:w-full lg:pt-2">
                                                        <div className="flex items-baseline gap-2 lg:justify-center">
                                                            <div className="font-bold text-gray-900 text-lg">₹{pack.sellingPrice}</div>
                                                            {pack.mrp > pack.sellingPrice && (
                                                                <div className="text-xs text-gray-400 line-through">₹{pack.mrp}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Selection Radio/Check for Mobile explicit clarity */}
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center lg:hidden ${isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
                                                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                                                </div>
                                            </div>

                                            {/* Desktop Checkmark */}
                                            {isSelected && (
                                                <div className="hidden lg:block absolute top-1 right-1 text-emerald-600 bg-white rounded-full p-0.5 shadow-sm z-20">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* INCLUDED IN THIS PACK */}
                        {currentPack?.medicines && currentPack.medicines.length > 0 && (
                            <div className="mb-6 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h4 className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-[0.15em] mb-4 flex items-center gap-2 opacity-80">
                                    <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                                    Included in this pack:
                                </h4>
                                <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100/50">
                                    <div className="grid grid-cols-1 gap-2">
                                        {currentPack.medicines.map((med, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="min-w-[4px] h-[4px] mt-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-xs font-semibold text-gray-700 leading-relaxed uppercase">{med}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sticky Action Footer for Mobile / Inline for Desktop */}
                        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-emerald-100 p-4 z-40 lg:static lg:bg-transparent lg:border-none lg:p-0 lg:z-auto shadow-[0_-5px_20px_rgba(0,0,0,0.05)] lg:shadow-none mb-6 lg:mb-8">
                            <div className="flex gap-3 container max-w-7xl mx-auto lg:px-0">
                                <div className="flex items-center border border-gray-300 rounded-lg h-12 w-28 bg-white flex-shrink-0">
                                    <button
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-lg font-bold text-lg"
                                    >-</button>
                                    <span className="flex-grow text-center font-bold text-gray-900">{qty}</span>
                                    <button
                                        onClick={() => setQty(q => q + 1)}
                                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-lg font-bold text-lg"
                                    >+</button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-grow bg-emerald-700 hover:bg-emerald-800 text-white h-12 rounded-lg font-bold text-base lg:text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all active:scale-[0.98]"
                                >
                                    <ShoppingCart size={20} />
                                    <span className="truncate">Add To Cart • ₹{(currentPack?.sellingPrice || 0) * qty}</span>
                                </button>
                            </div>
                        </div>

                        {/* Benefits Icons Grid - Matching Mobile Layout */}
                        <div className="mt-4 mb-8 lg:mb-0 grid grid-cols-2 gap-3 lg:gap-4">
                            <div className="bg-[#FDF7F5] p-3 rounded-lg flex items-center gap-3 border border-[#FBECE6]">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 flex-shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <div className="text-xs font-bold text-gray-700 leading-tight">100% Authentic<br />Ayurveda</div>
                            </div>
                            <div className="bg-[#FDF7F5] p-3 rounded-lg flex items-center gap-3 border border-[#FBECE6]">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 flex-shrink-0">
                                    <Truck size={20} />
                                </div>
                                <div className="text-xs font-bold text-gray-700 leading-tight">All India<br />Delivery</div>
                            </div>
                            <div className="bg-[#FDF7F5] p-3 rounded-lg flex items-center gap-3 border border-[#FBECE6]">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 flex-shrink-0">
                                    <Check size={20} />
                                </div>
                                <div className="text-xs font-bold text-gray-700 leading-tight">Secure & Safe<br />Payments</div>
                            </div>
                            <div className="bg-[#FDF7F5] p-3 rounded-lg flex items-center gap-3 border border-[#FBECE6]">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 flex-shrink-0">
                                    <Info size={20} />
                                </div>
                                <div className="text-xs font-bold text-gray-700 leading-tight">Expert<br />Support</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Lower Section (Tabs) */}
                <div className="border-t border-gray-200 pt-6 lg:pt-16 px-4 md:px-0">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tab Headers */}
                        <div className="md:w-1/5">
                            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 sticky top-24 no-scrollbar">
                                {['Benefits', 'Ingredients', 'Usage'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={`px-5 py-3 rounded-lg text-left font-bold transition-all whitespace-nowrap border-l-4 flex-shrink-0 ${activeTab === tab.toLowerCase()
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                                            : 'text-gray-500 hover:bg-gray-50 border-transparent'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="md:w-4/5">
                            <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-100 min-h-[300px]">
                                <h3 className="font-serif text-3xl text-gray-900 mb-8 capitalize flex items-center gap-3">
                                    <span className="w-8 h-1 bg-emerald-600 rounded-full"></span>
                                    {activeTab}
                                </h3>
                                <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed space-y-4">
                                    {activeTab === 'benefits' && (
                                        <div className="whitespace-pre-line">
                                            {product.benefits || "No specific benefits listed for this product."}
                                        </div>
                                    )}
                                    {activeTab === 'ingredients' && (
                                        <div className="whitespace-pre-line bg-[#fbfbfb] p-6 rounded-xl border border-gray-100 text-sm leading-relaxed">
                                            {product.ingredients || "Natural ingredients list not available."}
                                        </div>
                                    )}
                                    {activeTab === 'usage' && (
                                        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 text-emerald-900 italic font-medium">
                                            {product.usage || "Usage instructions not available."}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Order Expert Consultation Section - Neutral White Version */}
                <div className="mt-16 relative px-4 md:px-0">
                    <div className="relative bg-[rgb(74,124,89)] rounded-[2rem] p-8 lg:p-12 border border-white/10 overflow-hidden shadow-2xl shadow-ayur-green/20">
                        {/* Decorative Background Pattern - Very Subtle */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ayur-green/[0.02] rounded-full -mr-64 -mt-64 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-ayur-gold/[0.05] rounded-full -ml-20 -mb-20 blur-3xl"></div>

                        {/* Decorative Leaf SVG Overlay - Very Subtle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none text-ayur-green">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M10,10 Q50,0 90,10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M10,30 Q50,20 90,30" fill="none" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M10,50 Q50,40 90,50" fill="none" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M10,70 Q50,60 90,70" fill="none" stroke="currentColor" strokeWidth="0.1" />
                                <path d="M10,90 Q50,80 90,90" fill="none" stroke="currentColor" strokeWidth="0.1" />
                            </svg>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6 transition-transform hover:scale-105">
                                    <div className="w-2 h-2 rounded-full bg-ayur-gold animate-pulse"></div>
                                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Expert Consultation Available</span>
                                </div>
                                <h3 className="text-3xl lg:text-5xl font-serif font-bold mb-4 leading-tight text-white">
                                    Need help with your <span className="text-ayur-gold italic underline decoration-ayur-gold/30 underline-offset-8">Order?</span>
                                </h3>
                                <p className="text-ayur-beige text-base lg:text-xl max-w-lg leading-relaxed font-medium">
                                    Our wellness experts are just a call away. Get personalized guidance and place your order directly.
                                </p>
                            </div>

                            <div className="flex-shrink-0">
                                <a
                                    href="tel:+918894772187"
                                    className="relative flex flex-col items-center group"
                                >
                                    {/* Pulsing Button Effect */}
                                    <div className="absolute inset-0 bg-ayur-green rounded-full blur-2xl opacity-5 group-hover:opacity-15 transition-opacity animate-pulse"></div>

                                    <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center text-[rgb(74,124,89)] shadow-xl shadow-black/20 transition-all duration-500 group-hover:scale-110 group-active:scale-95 border-4 border-ayur-gold/30">
                                        <Phone size={40} className="lg:hidden" />
                                        <Phone size={56} className="hidden lg:block" />
                                    </div>

                                    <div className="mt-6 flex flex-col items-center gap-1">
                                        <span className="text-white font-bold uppercase text-xs tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                                            Tap to Connect
                                        </span>
                                        <span className="text-ayur-beige text-[11px] font-bold tracking-widest">+91 88947 72187</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Related Products Section (People also bought this) */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20 lg:mt-32 px-4 md:px-0">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-2">People also bought this</h2>
                                <p className="text-gray-500">Discover more natural solutions for your wellness</p>
                            </div>
                            <Link to="/shop" className="text-emerald-700 font-bold hover:text-emerald-800 transition-colors uppercase text-sm tracking-wider border-b-2 border-emerald-700 pb-1 hidden sm:block">
                                View Full Collection
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {relatedProducts.map(relProduct => (
                                <ProductCard key={relProduct._id || relProduct.id} product={relProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
