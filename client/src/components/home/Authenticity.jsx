import React from 'react';
import { CheckCircle } from 'lucide-react';

const Authenticity = () => {
    return (
        <section className="py-20 bg-ayur-beige/30">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative">
                    <div className="absolute top-4 -left-4 w-full h-full border-2 border-ayur-gold/30 rounded-lg" />
                    <img
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
                        alt="Ayurveda Doctor"
                        className="relative z-10 rounded-lg shadow-xl w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-8 right-[-20px] bg-white p-6 rounded shadow-lg max-w-[250px] z-20">
                        <p className="font-serif text-ayur-green text-lg">"Ayurveda is not just medicine, it's a way of life."</p>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                    <span className="text-ayur-olive font-bold tracking-widest uppercase text-sm">Authenticity Guaranteed</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-ayur-green leading-tight">
                        Rooted in Tradition, <br /> Backed by Science.
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Every formulation at The Karan Singh Vaidh is crafted under the strict guidance of experienced Vaidyas.
                        We combine ancient Ayurvedic texts (Charaka Samhita) with modern clinical research to ensure safety and efficacy.
                    </p>

                    <ul className="space-y-4 pt-4">
                        {[
                            "Formulated by Experienced Vaidyas",
                            "100% Herb-based (No Synthetic Filters)",
                            "Rigorous Quality Testing",
                            "Personalised Dosage Support"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center space-x-3 text-ayur-brown font-medium">
                                <CheckCircle className="text-ayur-gold" size={20} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button className="mt-8 bg-ayur-green text-white px-8 py-3 rounded hover:bg-ayur-olive transition-colors">
                        Meet Our Experts
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Authenticity;
