import React, { useState } from 'react';
import { CheckCircle, Leaf, Sparkles, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import ConsultationModal from './ConsultationModal';
import expertConsultation from '../../assets/Ayurvedic Consultation Scene.png';

const Authenticity = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkItems = [
        "30-Minute 1-on-1 Consultation With Karan Singh Vaidh",
        "Specialized in Kidney & Gallbladder Stones",
        "Over 25+ Years of Expert Experience",
        "Deep Rooted Ayurvedic Wisdom"
    ];

    return (
        <section className="py-12 md:py-16 bg-gradient-to-br from-ayur-beige/40 via-white to-ayur-green/5 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-ayur-green/5 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-ayur-gold/5 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Image Side - Enhanced Presentation */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-11/20 relative"
                    >
                        {/* Decorative Frames */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-ayur-gold/30 rounded-tl-3xl hidden md:block" />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-ayur-green/30 rounded-br-3xl hidden md:block" />

                        <div className="relative group">
                            <div className="absolute inset-0 bg-ayur-green rounded-[2rem] transform rotate-3 scale-105 opacity-10 group-hover:rotate-1 transition-transform duration-500" />
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
                                <img
                                    src={expertConsultation}
                                    alt="Ayurveda Consultation"
                                    className="w-full h-auto max-h-[650px] object-contain bg-white"
                                />

                                {/* Overlay Gradient for Premium Look */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>


                        </div>
                    </motion.div>

                    {/* Content Side - Refined Typography & Layout */}
                    <div className="w-full lg:w-9/20 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-5xl lg:text-6xl font-serif text-ayur-green leading-[1.1] mb-6">
                                Get Expert Consultation with <span className="text-ayur-gold">Karan Singh Vaidh</span>
                            </h2>
                        </motion.div>

                        <motion.ul
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            className="space-y-5"
                        >
                            {checkItems.map((item, i) => (
                                <motion.li
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, x: 20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-center space-x-4 bg-white/50 p-4 rounded-2xl border border-transparent hover:border-ayur-gold/20 hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-md"
                                >
                                    <div className="bg-ayur-green/5 p-2 rounded-xl group-hover:bg-ayur-green group-hover:text-white transition-colors duration-300 shadow-inner">
                                        <CheckCircle size={20} className="text-ayur-gold group-hover:text-white" />
                                    </div>
                                    <span className="text-ayur-brown font-medium tracking-tight text-lg">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="pt-6"
                        >
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group relative bg-[#419463] text-white px-10 py-5 rounded-[2rem] font-bold uppercase text-xs tracking-[0.3em] shadow-2xl shadow-ayur-green/30 hover:bg-[#357a52] transition-all transform active:scale-95 flex items-center gap-4 overflow-hidden"
                            >
                                <span className="relative z-10 font-black">Book An Appointment</span>

                                {/* Button Hover Pulse Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms]" />
                            </button>
                            <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] ml-4 italic opacity-70">
                                Trusted Heritage Since 2006
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Appointment Modal */}
            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default Authenticity;
