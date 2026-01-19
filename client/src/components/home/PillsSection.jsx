import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

const PillsSection = () => {
    // Filter pills products (IDs starting with 100)
    const pillsProducts = products.filter(p => p.id > 100);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#0d2e1b] font-medium">Ayurvedic Pills & Capsules</h2>
                    <p className="text-gray-500 mt-2">Explore our specialized natural solutions for holistic health</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillsProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PillsSection;
