import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, ArrowRight } from 'lucide-react';

const RealStores = () => {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden font-sans">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://img.freepik.com/free-photo/flat-lay-natural-medicinal-herbs_23-2148776511.jpg?t=st=1769862254~exp=1769865854~hmac=7e893ae120786cb1fcab58b18c7864b6ba98ed1f24584f6f1cb5d63dbfc2e83b&w=1480"
                    alt="Ayurvedic Herbs Background"
                    className="w-full h-full object-cover scale-105"
                />
                {/* Premium Gradient Overlay using brand colors */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(13, 46, 27, 0.92), rgba(13, 46, 27, 0.85))'
                    }}
                ></div>

                {/* Subtle texture for premium feel */}
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Decorative Top Label */}
                    {/* <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-ayur-gold/30 bg-ayur-gold/5 backdrop-blur-md mb-8 shadow-2xl"> */}
                    {/* <span className="w-2 h-2 rounded-full bg-ayur-gold animate-pulse"></span> */}
                    {/* <span className="text-ayur-gold text-xs font-bold uppercase tracking-[0.25em]">Authentic Ayurveda</span> */}
                    {/* </div> */}

                    {/* Headline */}
                    <h2 className="text-[3.5rem] font-serif font-medium text-white mb-6 md:mb-8 tracking-wide leading-tight">
                        Real People's <span className="text-ayur-gold/90 italic">Real Stories</span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-12 md:mb-16 max-w-2xl mx-auto font-light antialiased opacity-90">
                        We believe in transparency and authenticity. That is why real patient medical reports have been shared on our website. These case studies provide insight into the treatment approach, process, and outcomes, helping visitors evaluate the information objectively.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8">

                        {/* Primary Button - Download Guide */}
                        <a
                            href="https://thekaransinghvaidh.com/real-stores-real-people.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full sm:w-auto overflow-hidden bg-white text-[#132e1b] px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-sm md:text-base tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-95 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <FileText size={18} className="text-ayur-green" />
                                See Our Patients Report
                            </span>
                        </a>

                        {/* Secondary Button - Send Reports */}
                        <a
                            href="https://wa.me/918894772187?text=Hi, I want to send my medical reports for consultation."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full sm:w-auto overflow-hidden px-8 py-4 md:px-10 md:py-5 rounded-full border-2 border-ayur-gold/50 bg-ayur-gold/10 backdrop-blur-sm text-ayur-gold font-bold text-sm md:text-base tracking-widest uppercase transition-all duration-300 hover:bg-ayur-gold hover:text-[#132e1b] hover:border-ayur-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Send Your Reports
                                <MessageCircle size={18} />
                            </span>
                        </a>

                    </div>
                </motion.div>
            </div >
        </section >
    );
};

export default RealStores;
