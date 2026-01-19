import React from 'react';

const steps = [
    { num: "01", title: "Select Concern", desc: "Choose your health goal." },
    { num: "02", title: "Choose Remedy", desc: "Pick the right Ayurvedic pack." },
    { num: "03", title: "Daily Routine", desc: "Follow the dosage consistently." },
    { num: "04", title: "Heal Naturally", desc: "Experience long-lasting relief." },
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-ayur-green text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-ayur-gold/30 -z-0" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-ayur-green border-2 border-ayur-gold flex items-center justify-center text-xl font-bold font-serif mb-6 shadow-xl">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-serif text-ayur-gold mb-2">{step.title}</h3>
                            <p className="text-white/80 text-sm max-w-[200px]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
