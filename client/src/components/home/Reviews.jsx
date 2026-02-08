import React from 'react';
import { Star } from 'lucide-react';

const Reviews = () => {
    const videoIds = [
        "Dz2JQHmyTrE",
        "4JEW3wD63Yc",
        "1BH3R9-xps0",
        "5kuCBUzBTTY",
        "xyQYKouatuU",
        "2RNnnmhYgso",
        "tF-3vvgAp6I"
    ];

    return (
        <section className="py-12 bg-[#f9fdfa]">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="text-center mb-8">
                    <span className="text-ayur-gold text-sm tracking-widest uppercase font-bold">Success Stories</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-ayur-green mt-2 font-medium">Trusted by Thousands</h2>
                    <div className="w-20 h-1 bg-ayur-gold mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {videoIds.map((id, idx) => (
                        <div key={idx} className="group relative bg-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 aspect-[9/16] border-2 border-transparent hover:border-ayur-gold/50">
                            {/* Video Embed */}
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`}
                                title={`Customer Review ${idx + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            {/* Decorative Frame Overlay (Optional) */}
                            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                        </div>
                    ))}

                    {/* Placeholder for "Join the Family" */}
                    <div className="bg-ayur-green/5 rounded-2xl border-2 border-dashed border-ayur-green/20 flex flex-col items-center justify-center p-8 text-center aspect-[9/16]">
                        <div className="w-16 h-16 rounded-full bg-ayur-gold/10 text-ayur-gold flex items-center justify-center mb-4">
                            <Star size={32} fill="currentColor" />
                        </div>
                        <h4 className="text-ayur-green font-serif text-lg mb-2">Be Our Next<br />Success Story</h4>
                        <p className="text-sm text-gray-400">Join thousands of happy customers on their wellness journey.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
