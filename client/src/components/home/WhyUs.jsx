import React from 'react';
import { BookOpen, Leaf, ShieldCheck, Heart, Award } from 'lucide-react';

const reasons = [
    { icon: <BookOpen size={32} />, title: "100+ Years Legacy", desc: "Wisdom passed down through generations." },
    { icon: <Leaf size={32} />, title: "Ethical Sourcing", desc: "Herbs sourced from their natural habitats." },
    { icon: <ShieldCheck size={32} />, title: "GMP Certified", desc: "Manufactured in certified clean facilities." },
    { icon: <Heart size={32} />, title: "Holistic Healing", desc: "Treating the root cause, not just symptoms." },
    { icon: <Award size={32} />, title: "Clinically Proven", desc: "Formulations backed by modern research." },
];

const WhyUs = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-ayur-green mb-12">Why The Karan Singh Vaidh?</h2>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {reasons.map((reason, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-4 p-6 hover:bg-ayur-beige/20 rounded-lg transition-colors duration-300">
                            <div className="text-ayur-gold bg-ayur-green/5 p-4 rounded-full">
                                {reason.icon}
                            </div>
                            <h3 className="font-serif text-lg text-ayur-brown">{reason.title}</h3>
                            <p className="text-sm text-gray-500 max-w-[200px]">{reason.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
