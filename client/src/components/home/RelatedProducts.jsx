import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

const RelatedProducts = () => {
    // Show 3 related products (e.g., skip the first one)
    const relatedProducts = products.slice(1, 4);

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-serif text-ayur-green mb-8">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
