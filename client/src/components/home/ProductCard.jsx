import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // Reconcile property names between static data and API data
    const id = product._id || product.id;
    const name = product.name;
    const image = product.image;
    const rating = product.rating || 5;
    const reviews = product.numReviews || product.reviews || 0;
    const shortDesc = product.shortDescription || product.shortDesc;

    // Default to the first pack or the popular one for display price
    const packs = product.packs || [];
    const defaultPack = packs.find(p => p.isPopular || p.isDefault) || packs[0] || {};

    const price = defaultPack.sellingPrice || defaultPack.price || 0;
    const mrp = defaultPack.mrp || 0;
    const discount = defaultPack.discount || (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ayur-gold/30 group overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <Link to={`/product/${id}`} className="relative h-64 overflow-hidden bg-ayur-beige/10 block">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-ayur-gold text-ayur-green text-xs font-bold px-2 py-1 rounded">
                        {discount}% OFF
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                    <Link to={`/product/${id}`} className="block">
                        <div className="flex items-center text-yellow-500 text-xs space-x-1 mb-1">
                            <Star size={12} fill="currentColor" />
                            <span>{rating}</span>
                            <span className="text-gray-400">({reviews})</span>
                        </div>
                        <h3 className="font-serif text-lg text-ayur-green leading-tight line-clamp-2 min-h-[3rem] group-hover:underline decoration-ayur-gold underline-offset-2 transition-all">
                            {name}
                        </h3>
                    </Link>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{shortDesc}</p>
                </div>

                {/* Price & Action (Simplified) */}
                <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                        {mrp > price && <span className="block text-xs text-gray-400 line-through">₹{mrp}</span>}
                        <span className="block text-lg font-bold text-ayur-green">₹{price}</span>
                    </div>
                    <button className="bg-ayur-green hover:bg-ayur-olive text-white p-2 rounded-full transition-colors flex items-center justify-center">
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
