import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const PillsSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                // Filter products that are intended for the pills section
                // Based on the original logic (id > 100), but now we check isWellness 
                // or specific names/categories since IDs are now MongoDB ObjectIds
                const filtered = data.filter(p => p.isWellness || p.category?.name?.toLowerCase().includes('capsule') || p.name.toLowerCase().includes('capsule') || p.name.toLowerCase().includes('pill'));
                setProducts(filtered.slice(0, 4));
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products for PillsSection:', err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-12 bg-gray-50">
            <div className="w-full px-2 md:px-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#0d2e1b] font-medium">Explore our specialized natural solutions</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-green"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {products.map(product => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link to="/shop" className="inline-block border-b-2 border-ayur-gold text-ayur-green hover:text-ayur-gold font-bold transition-all pb-1 uppercase text-sm tracking-wider">
                                View All Products
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default PillsSection;
