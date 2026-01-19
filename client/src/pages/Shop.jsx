import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/home/ProductCard';
import ScrollToTop from '../components/layout/ScrollToTop';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <ScrollToTop />
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-ayur-green mb-4">Shop All Products</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Explore our complete range of authentic Ayurvedic remedies, carefully formulated for your holistic well-being.
                    </p>
                    <div className="w-24 h-1 bg-ayur-gold mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-green"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        Error: {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                )}

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
                        <div className="text-ayur-green font-bold text-lg mb-1">Free Shipping</div>
                        <div className="text-xs text-gray-500">On all prepaid orders</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
