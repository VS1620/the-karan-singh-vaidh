import React, { useState, useEffect, useContext } from 'react';
import SEO from '../components/seo/SEO';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/home/ProductCard';
import api, { getAssetUrl } from '../api/api';
import { Star, Check, ShoppingCart, Truck, ShieldCheck, Heart, Info, Phone, ZoomIn, MousePointerClick } from 'lucide-react';
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
    const [imageError, setImageError] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fallback image URL (Data URI for performance)
    const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23F4F7F6" width="600" height="600"/%3E%3Ctext fill="%23849A8E" font-family="system-ui" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                if (data && data.packs && data.packs.length > 0) {
                    const defaultIndex = data.packs.findIndex(p => p.isDefault);
                    setSelectedPackIndex(defaultIndex >= 0 ? defaultIndex : 0);
                }
                if (data && data.image) {
                    setSelectedImage(data.image);
                }

                // Fetch related products
                const { data: allProducts } = await api.get('/products');
                const filtered = allProducts
                    .filter(p => (p._id || p.id) !== id && p.category?.name === data.category?.name)
                    .slice(0, 4);

                // If not enough related products in same category, just take other products
                if (filtered.length < 4) {
                    const others = allProducts
                        .filter(p => (p._id || p.id) !== id && !filtered.find(f => (f._id || f.id) === (p._id || p.id)))
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
    }, [id]);

    // Track ViewContent when product is loaded
    useEffect(() => {
        if (product && window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: product.name,
                content_category: product.category?.name,
                content_ids: [product._id || product.id],
                content_type: 'product',
                value: product.packs?.[selectedPackIndex]?.sellingPrice || 0,
                currency: 'INR'
            });
        }
    }, [product, selectedPackIndex]);

    const handleAddToCart = () => {
        if (!product || !product.packs || product.packs.length === 0) return;
        const pack = product.packs[selectedPackIndex];
        
        // Track AddToCart
        if (window.fbq) {
            window.fbq('track', 'AddToCart', {
                content_name: product.name,
                content_category: product.category?.name,
                content_ids: [product._id || product.id],
                content_type: 'product',
                value: pack.sellingPrice * qty,
                currency: 'INR'
            });
        }

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
        if (product.category?.name) tags.push({ label: product.category.name, color: 'bg-green-100 text-green-800' });
        if (product.isWellness) tags.push({ label: 'Wellness', color: 'bg-blue-100 text-blue-800' });
        // Add default tags if none exist to match design aesthetic
        if (tags.length === 0) {
            tags.push({ label: 'Ayurvedic', color: 'bg-orange-100 text-orange-800' });
            tags.push({ label: 'Natural', color: 'bg-yellow-100 text-yellow-800' });
        }
        return tags;
    };

    return (
        <div className="bg-white min-h-screen pt-16 lg:pt-20 pb-20 lg:pb-12 font-sans">
            <SEO 
                title={product.metaTitle || `${product.name} | Ayurvedic Treatment & Medicine`}
                description={product.metaDescription || product.shortDescription || `Buy ${product.name} online. Authentic Ayurvedic remedy by Karan Singh Vaidh. Effective results, 100% natural ingredients.`}
                url={`/product/${product.slug || product._id || product.id || id}`}
                image={getAssetUrl(product.image)}
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://thekaransinghvaidh.com/#organization",
                                "name": "Karan Singh Vaidh",
                                "url": "https://thekaransinghvaidh.com/",
                                "logo": "https://thekaransinghvaidh.com/thekaransinghvaidh-logo.webp",
                                "sameAs": [
                                    "https://www.youtube.com/c/karansinghvaidhhp",
                                    "https://www.facebook.com/AncientAyurvedas.org/",
                                    "https://www.instagram.com/karan_singh_vaidh/",
                                    "https://www.linkedin.com/in/karan-singh-vaidh-hp-56a903204?originalSubdomain=in"
                                ],
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "+91-8219658454",
                                    "contactType": "Customer Support",
                                    "areaServed": "IN",
                                    "availableLanguage": ["Hindi", "English"]
                                }
                            },
                            {
                                "@type": "MedicalBusiness",
                                "@id": "https://thekaransinghvaidh.com/#localbusiness",
                                "name": "Karan Singh Vaidh Ayurvedic Hospital",
                                "image": "https://thekaransinghvaidh.com/thekaransinghvaidh-logo.webp",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "Radhasoami Satsang Ghar Road, Rebuan, Deoghat, Anji",
                                    "addressLocality": "Solan",
                                    "addressRegion": "Himachal Pradesh",
                                    "postalCode": "173211",
                                    "addressCountry": "IN"
                                },
                                "telephone": "+91-8219658454",
                                "openingHours": "Mo-Su 10:00-17:00",
                                "priceRange": "₹₹",
                                "areaServed": "India"
                            },
                            {
                                "@type": "Person",
                                "@id": "https://thekaransinghvaidh.com/#doctor",
                                "name": "Dr. Karan Singh Vaidh",
                                "jobTitle": "Ayurvedic Doctor",
                                "worksFor": {
                                    "@id": "https://thekaransinghvaidh.com/#organization"
                                },
                                "description": "Experienced Ayurvedic doctor specializing in chronic disease treatment using natural herbal formulations.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Solan",
                                    "addressRegion": "Himachal Pradesh",
                                    "addressCountry": "India"
                                }
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://thekaransinghvaidh.com/#website",
                                "url": "https://thekaransinghvaidh.com/",
                                "name": "Karan Singh Vaidh Ayurveda",
                                "publisher": {
                                    "@id": "https://thekaransinghvaidh.com/#organization"
                                },
                                "potentialAction": {
                                    "@type": "SearchAction",
                                    "target": "https://thekaransinghvaidh.com/ayurvedic-products?s={search_term_string}",
                                    "query-input": "required name=search_term_string"
                                }
                            },
                            {
                                "@type": "WebPage",
                                "@id": "https://thekaransinghvaidh.com/#webpage",
                                "url": window.location.href,
                                "name": product.metaTitle || product.name,
                                "isPartOf": {
                                    "@id": "https://thekaransinghvaidh.com/#website"
                                },
                                "about": {
                                    "@id": "https://thekaransinghvaidh.com/#organization"
                                },
                                "primaryImageOfPage": {
                                    "@type": "ImageObject",
                                    "url": "https://thekaransinghvaidh.com/banner1-web.webp"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://thekaransinghvaidh.com/#faq",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Is Ayurvedic treatment safe?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, Ayurvedic treatments use natural herbs and are generally safe when used under expert guidance."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How long does it take to see results?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Most users start noticing improvements within 15 to 30 days depending on the condition and regular usage."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Do these treatments have side effects?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "These herbal formulations are designed to be natural and safe, with minimal side effects when used as directed."
                                        }
                                    }
                                ]
                            },
                            {
                                "@type": "Product",
                                "name": product.name,
                                "image": getAssetUrl(product.image),
                                "description": product.shortDescription,
                                "brand": {
                                    "@type": "Brand",
                                    "name": "Karan Singh Vaidh"
                                },
                                "offers": {
                                    "@type": "Offer",
                                    "priceCurrency": "INR",
                                    "price": currentPack?.sellingPrice || 0,
                                    "availability": "https://schema.org/InStock",
                                    "url": window.location.href
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.8",
                                    "reviewCount": "300"
                                }
                            },
                            {
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
                                        "name": "Products",
                                        "item": "https://thekaransinghvaidh.com/ayurvedic-products"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": product.name,
                                        "item": window.location.href
                                    }
                                ]
                            }
                        ]
                    })}
                </script>
            </SEO>
            <div className="container mx-auto px-4 md:px-4 max-w-7xl">
                {/* SEO Breadcrumb UI */}
                <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 py-2 overflow-x-auto no-scrollbar whitespace-nowrap">
                    <Link to="/" className="hover:text-ayur-green transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link to="/ayurvedic-products" className="hover:text-ayur-green transition-colors">Products</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-ayur-green truncate max-w-[150px] md:max-w-none">{product.name}</span>
                </nav>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 mb-16">

                    {/* LEFT: Gallery Layout (Vertical Strip + Main Image) */}
                    <div className="lg:w-[55%] flex flex-col lg:flex-row gap-0 lg:gap-4 h-fit lg:sticky lg:top-24">
                        {/* Vertical Thumbnail Strip - Desktop Only */}
                        <div className="hidden lg:flex flex-col gap-3 w-20 flex-shrink-0">
                            <div
                                onClick={() => {
                                    setSelectedImage(product.image);
                                    setImageError(false);
                                }}
                                className={`w-20 h-20 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${selectedImage === product.image ? 'border-ayur-gold' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <img
                                    src={imageError || !product.image ? fallbackImage : getAssetUrl(product.image)}
                                    alt="Main"
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = fallbackImage}
                                />
                            </div>
                            {product.images?.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setImageError(false);
                                    }}
                                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${selectedImage === img ? 'border-ayur-gold' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <img
                                        src={getAssetUrl(img, 200)} // Small thumbnail for speed
                                        alt={`Thumbnail ${i}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => e.target.src = fallbackImage}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image Stage */}
                        <div className="flex-grow md:rounded-2xl overflow-hidden relative group aspect-square lg:aspect-auto lg:h-[600px] flex md:items-center md:justify-center md:bg-gray-50/30">
                            <img
                                src={imageError || !selectedImage ? (product.image ? getAssetUrl(product.image, 800) : fallbackImage) : getAssetUrl(selectedImage, 800)}
                                alt={product.name}
                                className="w-full h-full object-cover md:object-contain p-0 md:p-8 transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    if (!imageError) setImageError(true);
                                    e.target.src = fallbackImage;
                                }}
                            />
                        </div>

                        {/* Horizontal Thumbnail Strip - Mobile Only */}
                        <div className="flex lg:hidden gap-3 overflow-x-auto no-scrollbar pb-2 px-4">
                            <div
                                onClick={() => {
                                    setSelectedImage(product.image);
                                    setImageError(false);
                                }}
                                className={`w-16 h-16 flex-shrink-0 rounded-lg border-2 overflow-hidden ${selectedImage === product.image ? 'border-ayur-gold' : 'border-gray-200'}`}
                            >
                                <img
                                    src={imageError || !product.image ? fallbackImage : getAssetUrl(product.image)}
                                    className="w-full h-full object-cover"
                                    alt="Main"
                                />
                            </div>
                            {product.images?.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setImageError(false);
                                    }}
                                    className={`w-16 h-16 flex-shrink-0 rounded-lg border-2 overflow-hidden ${selectedImage === img ? 'border-ayur-gold' : 'border-gray-200'}`}
                                >
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
                        <h1 className="text-xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
                        <p className="text-gray-500 text-xs md:text-sm mb-4 leading-relaxed line-clamp-3 md:line-clamp-none">{product.shortDescription}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {getProductTags().map((tag, i) => (
                                <span key={i} className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md tracking-wider ${tag.color}`}>
                                    {tag.label}
                                </span>
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
                            <div className="mb-6 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center w-full">
                                <h4 className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-[0.15em] mb-4 flex items-center justify-center gap-2 opacity-80 w-full">
                                    <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                                    Included in this pack:
                                </h4>
                                <div className="bg-emerald-50/60 rounded-2xl p-1 border border-emerald-100/50 w-fit max-w-full">
                                    <div className="flex flex-wrap items-center justify-center gap-5">
                                        {currentPack.medicines.map((med, idx) => {
                                            let medData = med;
                                            if (typeof med === 'string' && med.trim().startsWith('{')) {
                                                try {
                                                    medData = JSON.parse(med);
                                                } catch (e) {}
                                            }

                                            let medName = '';
                                            let medImage = '';

                                            if (typeof medData === 'string') {
                                                const val = medData.trim();
                                                if (val.startsWith('/') || val.startsWith('http')) {
                                                    medImage = val;
                                                    medName = '';
                                                } else {
                                                    medName = val;
                                                }
                                            } else if (medData && typeof medData === 'object') {
                                                medName = medData.name || '';
                                                medImage = medData.image || '';
                                            }

                                            // Use product main image as fallback if medicine has no image
                                            const displayImage = medImage
                                                ? getAssetUrl(medImage)
                                                : (product.image ? getAssetUrl(product.image) : null);

                                            return (
                                                <div key={idx} className="flex flex-col items-center gap-2 w-[100px] sm:w-[120px] group/med flex-shrink-0">
                                                    <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-emerald-100 shadow-sm bg-white">
                                                        {displayImage ? (
                                                            <img
                                                                src={displayImage}
                                                                alt={medName || 'Medicine'}
                                                                className="w-full h-full object-cover cursor-zoom-in group-hover/med:scale-110 transition-transform duration-500"
                                                                onClick={() => setLightboxImage(displayImage)}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = '/logo.png';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                                                                <img src="/logo.png" alt="" className="w-12 h-12 object-contain opacity-40" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {medName && (
                                                        <span className="text-[10px] font-bold text-gray-700 text-center uppercase tracking-wide leading-tight line-clamp-2 px-1">
                                                            {medName}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        
                                        {/* Clickable Text to Enlarge First Image */}
                                        {currentPack.medicines.length > 0 && (
                                            <div 
                                                className="flex items-center justify-center cursor-pointer pl-3 hover:opacity-80 transition-opacity select-none"
                                                onClick={() => {
                                                    // Logic to open the first image in lightbox
                                                    let medData = currentPack.medicines[0];
                                                    if (typeof medData === 'string' && medData.trim().startsWith('{')) {
                                                        try { medData = JSON.parse(medData); } catch (e) {}
                                                    }
                                                    let medImage = '';
                                                    if (typeof medData === 'string') {
                                                        const val = medData.trim();
                                                        if (val.startsWith('/') || val.startsWith('http')) medImage = val;
                                                    } else if (medData && typeof medData === 'object') {
                                                        medImage = medData.image || '';
                                                    }
                                                    const dispImg = medImage ? getAssetUrl(medImage) : (product.image ? getAssetUrl(product.image) : null);
                                                    if (dispImg) setLightboxImage(dispImg);
                                                }}
                                            >
                                                <span className="text-xs font-bold text-emerald-700 underline underline-offset-4 decoration-emerald-600/40 flex items-center gap-1">
                                                    <ZoomIn size={14} />
                                                    Click to view image
                                                </span>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Lightbox Modal */}
                        {lightboxImage && (
                            <div
                                className="fixed inset-0 bg-black/80 z-[999] flex items-center justify-center p-4 backdrop-blur-sm"
                                onClick={() => setLightboxImage(null)}
                            >
                                <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setLightboxImage(null)}
                                        className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-lg font-bold text-lg hover:bg-gray-100 z-10"
                                    >
                                        ✕
                                    </button>
                                    <img
                                        src={lightboxImage}
                                        alt=""
                                        className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                                    />
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
                                <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8 capitalize flex items-center gap-3">
                                    <span className="w-6 h-1 bg-emerald-600 rounded-full"></span>
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
                                <h3 className="text-2xl lg:text-5xl font-serif font-bold mb-4 leading-tight text-white">
                                    Need help with your <span className="text-ayur-gold italic underline decoration-ayur-gold/30 underline-offset-8">Order?</span>
                                </h3>
                                <p className="text-ayur-beige text-sm lg:text-xl max-w-lg leading-relaxed font-medium">
                                    Our wellness experts are just a call away. Get personalized guidance and place your order directly.
                                </p>
                            </div>

                            <div className="flex-shrink-0">
                                <a
                                    href="tel:+918219658454"
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
                                        <span className="text-ayur-beige text-[11px] font-bold tracking-widest">+91 82196 58454</span>
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
                            <Link to="/ayurvedic-products" className="text-emerald-700 font-bold hover:text-emerald-800 transition-colors uppercase text-sm tracking-wider border-b-2 border-emerald-700 pb-1 hidden sm:block">
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
