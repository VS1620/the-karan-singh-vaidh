import React, { useContext, useState } from 'react';
import { ShoppingCart, Star, Minus, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../api/api';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [imageError, setImageError] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Reconcile property names
    const id = product._id || product.id;
    const name = product.name;
    const image = getAssetUrl(product.image);
    const rating = product.rating || 4.8;
    const reviews = product.numReviews || product.reviews || 2500;
    const tags = product.tags || ["Natural", "Wellness"];

    // Pack selection
    const packs = (product.packs && product.packs.length > 0)
        ? product.packs
        : [{ name: 'PACK OF 1', sellingPrice: product.price || 0, mrp: product.mrp || 0 }];

    const [selectedPack, setSelectedPack] = useState(packs.find(p => p.isPopular || p.isDefault) || packs[0]);
    const [showPackDropdown, setShowPackDropdown] = useState(false);

    const price = selectedPack?.sellingPrice || selectedPack?.price || 0;
    const mrp = selectedPack?.mrp || 0;
    const discount = selectedPack.discount || (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

    const handleAddToCart = () => {
        addToCart(product, selectedPack, quantity);
    };

    return (
        <div className="bg-white rounded-3xl transition-all duration-300 border border-gray-100 hover:border-ayur-green/20 group overflow-hidden flex flex-col h-full w-full shadow-sm hover:shadow-xl relative">

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-4 left-0 z-20 bg-[#2ECC71] text-white text-[10px] font-bold px-3 py-1 rounded-r-full shadow-md">
                    {discount}% OFF
                </div>
            )}

            {/* Image Container */}
            <Link to={`/product/${product.slug || id}`} className="relative w-full aspect-[4/5] overflow-hidden bg-white block">
                <img
                    src={imageError ? '/logo.png' : image}
                    alt={name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 p-4"
                    loading="lazy"
                />
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow text-center">
                <div className="flex flex-col items-center mb-1">
                    {/* Star Rating */}

                    {/* Title */}
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-[#F1C40F] mb-1">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} className="text-[#F1C40F]" />
                            ))}
                        </div>
                        <span className="text-[11px] font-bold text-gray-700 ml-1">{rating}</span>
                    </div>

                    {/* Title */}
                    <Link to={`/product/${product.slug || id}`} className="block">
                        <h3 className="font-bold text-[16px] text-[#1A3C34] mb-1 line-clamp-1 group-hover:text-ayur-gold transition-colors">
                            {name}
                        </h3>
                    </Link>

                    {/* Tags */}
                    <p className="text-[11px] text-gray-400 font-medium tracking-tight mb-3">
                        {tags.join(" | ")}
                    </p>
                </div>

                <div className="mt-auto space-y-4">
                    {/* Price */}
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-black text-[#1A3C34]">Rs. {price.toFixed(2)}</span>
                        {mrp > price && (
                            <span className="text-xs text-gray-400 line-through">Rs. {mrp.toFixed(2)}</span>
                        )}
                    </div>

                    {/* Pack Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowPackDropdown(!showPackDropdown)}
                            className="w-full py-1.5 px-4 rounded-full border border-gray-200 text-[10px] font-bold text-[#1A3C34] flex items-center justify-center gap-2 hover:bg-gray-50 uppercase tracking-widest transition-colors"
                        >
                            {selectedPack.name} <ChevronDown size={14} className={showPackDropdown ? 'rotate-180 transition-transform' : 'transition-transform'} />
                        </button>

                        {showPackDropdown && (
                            <div className="absolute bottom-full left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 mb-2 py-2 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                                {packs.map((pack, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full px-4 py-2 text-left text-[11px] font-bold hover:bg-[#F4F9F6] text-[#1A3C34] transition-colors"
                                        onClick={() => {
                                            setSelectedPack(pack);
                                            setShowPackDropdown(false);
                                        }}
                                    >
                                        {pack.name} - Rs. {pack.sellingPrice}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quantity & Add to Cart Stack */}
                    <div className="space-y-2 w-full pt-1">
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between border border-gray-100 bg-[#F8FBF9] rounded-xl h-10 px-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-1 text-[#1A3C34] hover:text-ayur-gold"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="font-bold text-sm text-[#1A3C34]">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-1 text-[#1A3C34] hover:text-ayur-gold"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-[#419463] hover:bg-[#357a52] text-white h-11 rounded-xl text-[12px] font-black uppercase tracking-tight transition-all active:scale-[0.98] shadow-md shadow-[#419463]/10"
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
