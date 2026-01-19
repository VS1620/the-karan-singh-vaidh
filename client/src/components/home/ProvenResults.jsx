import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, Star, ShieldCheck, Award } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        quote: "Changed my life in 3 months. Highly recommended!",
        author: "Priya K., Verified Buyer",
        rating: 5
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
        quote: "The best natural solution I have found for my diabetes.",
        author: "Rahul M., Verified Buyer",
        rating: 5
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1528740561666-dc24705f08a7?q=80&w=2070&auto=format&fit=crop",
        quote: "Effective and genuine ayurvedic products.",
        author: "Suman T., Verified Buyer",
        rating: 4
    }
];

const ProvenResults = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        appendDots: dots => (
            <div style={{ bottom: "20px" }}>
                <ul className="m-0 p-0 flex justify-center gap-2"> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all cursor-pointer"></div>
        )
    };

    return (
        <section className="bg-[#1a4d2e] text-white py-20 overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-8 z-10">
                        <div className="inline-block border border-yellow-500/50 rounded-full px-4 py-1.5">
                            <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">100+ Years of Legacy</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-serif text-yellow-500 italic leading-tight">
                            Proven Results.
                        </h2>

                        <p className="text-gray-200 text-lg leading-relaxed max-w-lg">
                            Clinically inspired Ayurvedic medicines crafted for modern life. Experience the power of natural healing without side effects.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-[#1a4d2e] px-8 py-3.5 rounded-lg font-bold flex items-center gap-2 transition-all">
                                Shop Now <ArrowRight size={18} />
                            </button>
                            <button className="border border-white/30 hover:border-white text-white px-8 py-3.5 rounded-lg font-medium transition-all">
                                Consult Ayurveda Expert
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-8 pt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400"><ShieldCheck size={20} /></span>
                                <span className="text-sm font-medium">100% Natural</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400"><Award size={20} /></span>
                                <span className="text-sm font-medium">GMP Certified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400"><Star size={20} /></span>
                                <span className="text-sm font-medium">Doctor Recommended</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Slider */}
                    <div className="lg:w-1/2 w-full relative">
                        {/* Background Arch Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#143d24] to-transparent rounded-t-[1000px] transform scale-110 translate-y-20 opacity-50 pointer-events-none"></div>

                        <Slider {...settings} className="proven-results-slider relative z-10">
                            {testimonials.map((item) => (
                                <div key={item.id} className="outline-none relative pt-10 px-4 pb-12">
                                    <div className="relative max-w-sm mx-auto">
                                        {/* Product/Result Image in Arch */}
                                        <div className="relative rounded-t-[200px] rounded-b-lg overflow-hidden h-[450px] shadow-2xl border-4 border-white/10">
                                            <img
                                                src={item.image}
                                                alt="Result"
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                                        </div>

                                        {/* Review Card Floating */}
                                        <div className="absolute top-10 -right-6 md:-right-12 bg-white text-gray-800 p-5 rounded-lg shadow-xl max-w-[220px] animate-fade-in-up">
                                            <div className="flex text-yellow-400 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < item.rating ? "currentColor" : "none"} strokeWidth={i < item.rating ? 0 : 2} />
                                                ))}
                                            </div>
                                            <p className="text-sm font-medium italic mb-3">"{item.quote}"</p>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">- {item.author}</p>
                                        </div>

                                        {/* Text Overlay on Image */}
                                        <div className="absolute bottom-8 left-0 right-0 text-center">
                                            <h3 className="text-3xl font-serif text-yellow-400 drop-shadow-md">Targeted Relief</h3>
                                            <p className="text-white/90 text-sm tracking-wide uppercase mt-1">For Chronic Lifestyle Disorders</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProvenResults;
