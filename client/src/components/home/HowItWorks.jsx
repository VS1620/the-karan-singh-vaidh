import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Clock, UserRound, ChevronRight } from 'lucide-react';
import selectConcernIcon from '../../assets/select_concern_icon.png';

const steps = [
    {
        num: "01",
        title: "Select Concern",
        desc: "Choose your health goal from our specialized categories.",
        icon: selectConcernIcon,
        isImage: true,
    },
    {
        num: "02",
        title: "Choose Remedy",
        desc: "Pick the right Ayurvedic pack designed for your needs.",
        icon: <Pill size={32} />,
        isImage: false,
    },
    {
        num: "03",
        title: "Daily Routine",
        desc: "Follow the dosage consistently for effective results.",
        icon: <Clock size={32} />,
        isImage: false,
    },
    {
        num: "04",
        title: "Heal Naturally",
        desc: "Experience long-lasting relief and holistic wellness.",
        icon: <UserRound size={32} />,
        isImage: false,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-6 md:py-8 mb-8 bg-[#4a7c59] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ayur-green/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ayur-gold/10 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">How Your Healing Begins</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Progress Path Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[100px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            {/* Icon Container */}
                            <div className="relative mb-10">
                                <motion.div
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.8, ease: "anticipate" }}
                                    className="w-24 h-24 bg-white rounded-[2rem] border border-ayur-green/10 flex items-center justify-center text-ayur-green shadow-xl relative z-10 group-hover:border-ayur-gold/40 transition-colors"
                                >
                                    {step.isImage ? (
                                        <img src={step.icon} alt={step.title} className="w-10 h-10" />
                                    ) : (
                                        step.icon
                                    )}
                                </motion.div>

                                {/* Step Number Badge */}
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-ayur-green text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg z-20 transition-transform group-hover:scale-110">
                                    {step.num}
                                </div>

                                {/* Pulse Animation */}
                                <div className="absolute inset-0 bg-ayur-green rounded-[2rem] opacity-20 scale-0 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700" />
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 + (idx * 0.1) }}
                            >
                                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-amber-200 transition-colors tracking-wide">
                                    {step.title}
                                </h3>
                                <p className="text-green-100 text-sm leading-relaxed max-w-[240px] font-light italic">
                                    {step.desc}
                                </p>
                            </motion.div>

                            {/* Decorative Arrow for Flow */}
                            {idx !== steps.length - 1 && (
                                <div className="hidden lg:flex absolute top-[85px] -right-4 text-white/30 translate-x-1/2">
                                    <ChevronRight size={32} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
