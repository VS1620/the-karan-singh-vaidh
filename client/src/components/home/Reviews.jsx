import React from 'react';
import { Star } from 'lucide-react';

const Reviews = () => {
    const reviews = [
        { name: "Rahul Sharma", role: "Diabetes Care", msg: "My sugar levels are under control within 2 months. Highly effective!", rating: 5 },
        { name: "Sneha Patel", role: "Skin Glow", msg: "My acne has reduced significantly. Love the natural ingredients.", rating: 5 },
        { name: "Vikram Singh", role: "Joint Pain", msg: "Finally some relief for my knees. Doing yoga again thanks to this.", rating: 4 },
        { name: "Anjali Gupta", role: "Hair Care", msg: "Hair fall stopped in 3 weeks. Recommended to all my friends.", rating: 5 },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-center text-ayur-green mb-16">Trusted by Thousands</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="bg-ayur-beige/10 p-6 rounded-lg border border-transparent hover:border-ayur-gold/30 transition-all hover:shadow-lg">
                            <div className="flex text-yellow-500 mb-4">
                                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-600 italic mb-6">"{rev.msg}"</p>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-ayur-olive/20 text-ayur-olive flex items-center justify-center font-bold">
                                    {rev.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-serif text-ayur-brown">{rev.name}</h4>
                                    <span className="text-xs text-ayur-olive uppercase tracking-wide">{rev.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
