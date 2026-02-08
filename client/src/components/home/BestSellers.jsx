import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                const bestSellers = data.filter(p => p.isBestSeller).slice(0, 8);
                setProducts(bestSellers);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-12 md:py-16 bg-[#E8F3ED]/40 overflow-hidden w-full">
            <div className="w-full relative">
                {/* Header - Centered */}
                <div className="max-w-[1400px] mx-auto px-5 md:px-12 text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1A3C34] mb-8">Our Best Sellers</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-green"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="relative overflow-visible">
                        {/* Full Width Horizontal Scroll Container */}
                        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar scroll-smooth px-5 md:px-12 lg:px-24">
                            {products.map(product => (
                                <div
                                    key={product._id || product.id}
                                    className="min-w-[280px] md:min-w-[320px] lg:min-w-[340px] snap-start"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                            {/* Spacer to allow scrolling to the end with padding */}
                            <div className="min-w-[1px] md:min-w-[20px] shrink-0"></div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-[1400px] mx-auto px-5 md:px-12 text-center py-20 bg-white/50 rounded-3xl border border-dashed border-[#1A3C34]/20">
                        <p className="text-gray-500 font-serif italic">No best selling products available at the moment.</p>
                    </div>
                )}

                {/* Footer Link - Centered */}
                <div className="max-w-[1400px] mx-auto px-5 md:px-12 text-center mt-4 md:mt-8">
                    <Link to="/shop" className="inline-flex items-center gap-2 border-b-2 border-ayur-gold/30 text-ayur-green hover:border-ayur-gold hover:text-ayur-gold font-bold transition-all pb-1 uppercase text-xs md:text-sm tracking-[0.2em]">
                        Explore All Products
                    </Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
};

export default BestSellers;
