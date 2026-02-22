import React from 'react';
import { motion } from 'framer-motion';
// No icons needed here anymore

const FactoryVideo = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    {/* Tag removed as per user request */}

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ayur-green mb-4 tracking-tight">
                        Purity in Process. <span className="text-ayur-gold italic font-medium">Trust in Every Product</span>
                    </h2>
                </motion.div>

                {/* Video Player Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Subtle frame for light background */}
                    <div className="relative bg-white rounded-[1.8rem] p-1 shadow-[0_20px_50px_rgba(13,46,27,0.1)] border border-ayur-green/5 overflow-hidden">
                        <div className="rounded-[1.6rem] overflow-hidden aspect-video">
                            <video
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster="https://res.cloudinary.com/diqj5p308/video/upload/v1770738730/factory001_mp4_fg1ksq.jpg"
                            >
                                <source src="https://res.cloudinary.com/diqj5p308/video/upload/v1770738730/factory001_mp4_fg1ksq.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default FactoryVideo;
