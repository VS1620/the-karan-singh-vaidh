import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                // Filter best sellers if the field exists, otherwise take first 4
                const filtered = data.filter(p => p.isBestSeller).slice(0, 4);
                setProducts(filtered.length > 0 ? filtered : data.slice(0, 4));
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-20 bg-ayur-beige/10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <span className="text-ayur-gold text-sm tracking-widest uppercase">Customer Favorites</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-ayur-green mt-2">Best Sellers</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-green"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <button className="border-b border-ayur-olive text-ayur-olive hover:text-ayur-green hover:border-ayur-green transition-colors pb-1 uppercase text-sm tracking-wide">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
