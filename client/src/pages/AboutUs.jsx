import React from 'react';
import { Heart, Leaf, Users, Award, ShieldCheck, Sparkles, CheckCircle, ArrowRight, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import founderImage from '../assets/karan singh vaidh img.jpeg';

const AboutUs = () => {
    const heritageSteps = [
        {
            title: "Ethical Sourcing",
            subtitle: "From its Natural Home",
            description: "We source our ingredients from regions where they grow most potently—Amla from Pratapgarh, Aloe Vera from Rajasthan, and Neem from its indigenous soil.",
            icon: "🌿"
        },
        {
            title: "Traditional Precision",
            subtitle: "Slow-Cooked Extraction",
            description: "Following the traditional 'Quath' (decoction) process, we slow-cook our herbs for hours to ensure maximum bioactive retention without harsh chemicals.",
            icon: "⚗️"
        },
        {
            title: "Scientific Rigor",
            subtitle: "Lab-Tested Purity",
            description: "Every batch undergoes stringent quality checks in certified labs to ensure it's free from heavy metals, pesticides, and contaminants.",
            icon: "🔬"
        },
        {
            title: "Modern Wellness",
            subtitle: "Accessible Nutrition",
            description: "We modernize 5,000 years of Ayurvedic wisdom into easy-to-consume formats, making ancient nutrition fit for the fast-paced modern world.",
            icon: "⚡"
        }
    ];

    return (
        <div className="bg-[#fdfbf6] font-sans overflow-hidden">
            {/* Cinematic Hero Section */}
            <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Visual Background - Orchards/Nature */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://img.freepik.com/free-photo/ayurvedic-treatment-composition-high-angle_23-2149339757.jpg?t=st=1769181991~exp=1769185591&w=1480"
                        className="w-full h-full object-cover scale-110"
                        alt="Ayurvedic Heritage"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0d2e1b]/40 to-[#0d2e1b]/80 backdrop-blur-[1px]"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8 mt-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block border border-ayur-gold/50 text-ayur-gold px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md">
                            Legacy Since 2006
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-serif font-bold text-white leading-[1.1] drop-shadow-2xl"
                    >
                        Modernizing <br />
                        <span className="text-ayur-gold italic">Ancient Wisdom</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-emerald-50/80 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Bridging the 5,000-year-old gap between traditional Ayurveda and your modern nutrition needs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-12 pt-8"
                    >
                        <div className="text-center group">
                            <p className="text-3xl font-serif text-white font-bold mb-1">20,000+</p>
                            <p className="text-[10px] text-ayur-gold uppercase tracking-widest font-bold">Happy Patients</p>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                        <div className="text-center">
                            <p className="text-3xl font-serif text-white font-bold mb-1">100%</p>
                            <p className="text-[10px] text-ayur-gold uppercase tracking-widest font-bold">Natural Sourcing</p>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                        <div className="text-center">
                            <p className="text-3xl font-serif text-white font-bold mb-1">10+</p>
                            <p className="text-[10px] text-ayur-gold uppercase tracking-widest font-bold">Expert Vaidhs</p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Wave/Curve */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-full h-[50px] fill-[#fdfbf6]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.39,110.19,153.13,108.67,249.49,89.5,286,82.26,321.39,56.44,321.39,56.44Z"></path>
                    </svg>
                </div>
            </div>

            {/* The Brand Story - Modern Ayurveda */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-ayur-green/5 rounded-full blur-[100px]"></div>
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                                <img
                                    src="https://img.freepik.com/free-photo/ayurvedic-medicine-still-life-arrangement_23-2149339744.jpg"
                                    alt="Traditional Processing"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 border-[20px] border-white/20"></div>
                            </div>
                        </motion.div>

                        <div className="w-full lg:w-1/2 space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-ayur-gold font-bold tracking-[0.2em] uppercase text-xs">Our Purpose</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-ayur-green mt-4 leading-tight font-bold">
                                    Bridging the Gap Between <br />
                                    Tradition & Today
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6 text-gray-700 text-lg leading-relaxed font-light"
                            >
                                <p>
                                    At <span className="font-bold text-ayur-green">The Karan Singh Vaidh</span>, we believe that Ayurveda is not just a treatment, but a way of life that has been forgotten in the noise of modern synthetic solutions.
                                </p>
                                <p>
                                    Our journey began with a single mission: to provide <span className="italic font-serif">Amodh-Shiv-Yog</span> (Infallible Divine Healing) to every household. We don't just sell products; we offer a 5,000-year-old promise of purity and balance.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div className="border-l-4 border-ayur-gold pl-6">
                                    <h4 className="font-bold text-ayur-green">Purity First</h4>
                                    <p className="text-sm text-gray-500 mt-1">No artificial colors or preservatives.</p>
                                </div>
                                <div className="border-l-4 border-ayur-gold pl-6">
                                    <h4 className="font-bold text-ayur-green">Expert Guided</h4>
                                    <p className="text-sm text-gray-500 mt-1">Formulated by real Ayurvedic Vaidhs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Heritage Way - Process Showcase - Refined with Light Green Background */}
            <section className="py-24 bg-[#f1f7f3] text-ayur-green overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-ayur-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-ayur-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-ayur-gold font-bold tracking-[0.3em] uppercase text-xs"
                        >
                            The Process
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-serif mt-4 font-bold text-ayur-green"
                        >
                            The Heritage Way
                        </motion.h2>
                        <div className="w-24 h-1 bg-ayur-gold/30 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden lg:block absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-ayur-green/10 to-transparent"></div>

                        {heritageSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex flex-col items-center text-center space-y-6 group"
                            >
                                <div className="w-24 h-24 bg-white border border-ayur-green/10 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 group-hover:shadow-[0_20px_40px_-15px_rgba(13,46,27,0.1)] group-hover:border-ayur-gold/30 transition-all duration-500 relative z-10 shadow-sm">
                                    {step.icon}
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-ayur-gold font-bold uppercase tracking-widest text-[10px]">{step.subtitle}</h4>
                                    <h3 className="text-xl font-serif font-bold text-ayur-green">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed font-light">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sourcing - Natural Home */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 pt-12">
                                    <img src="https://img.freepik.com/free-photo/ayurvedic-treatment-composition-with-herbs_23-2149339743.jpg" className="rounded-3xl shadow-xl hover:scale-[1.02] transition-transform" alt="Ingredients" />
                                </div>
                                <div className="space-y-4">
                                    <img src="https://img.freepik.com/free-photo/top-view-ayurvedic-powders-bowls_23-2148774953.jpg" className="rounded-3xl shadow-xl hover:scale-[1.02] transition-transform" alt="Quality" />
                                    <img src="https://img.freepik.com/free-photo/composition-with-fresh-herbs-ayurvedic-oil_23-2149339741.jpg" className="rounded-3xl shadow-xl hover:scale-[1.02] transition-transform" alt="Purity" />
                                </div>
                            </div>
                        </motion.div>

                        <div className="w-full lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <span className="text-ayur-green font-bold tracking-[0.2em] uppercase text-xs">Purity in Sourcing</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-[#1b3a27] mt-4 leading-tight font-bold">
                                    Ingredients from their <br />
                                    <span className="text-ayur-gold italic">Natural Home</span>
                                </h2>
                            </motion.div>

                            <p className="text-gray-600 text-lg leading-relaxed font-light">
                                We don't settle for mass-cultivated herbs. Our team travels to the farthest corners of India to source ingredients where they grow naturally, ensuring higher bioactive concentrations and superior efficacy.
                            </p>

                            <ul className="space-y-5">
                                {[
                                    { herb: "Amla", location: "Pratapgarh, UP", benefit: "Vitamins & Immunity" },
                                    { herb: "Aloe Vera", location: "Thar Desert, Rajasthan", benefit: "Skin & Digestion" },
                                    { herb: "Neem", location: "Central India", benefit: "Blood Purification" }
                                ].map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-6 p-4 rounded-2xl hover:bg-[#fdfbf6] transition-colors border border-transparent hover:border-ayur-gold/20"
                                    >
                                        <div className="w-12 h-12 bg-ayur-gold/10 rounded-full flex items-center justify-center text-ayur-gold font-serif font-black">
                                            {item.herb[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#1b3a27]">{item.herb}</h4>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest">{item.location} • {item.benefit}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section - Refined */}
            <section className="py-24 md:py-32 bg-[#fdfbf6] relative overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-ayur-green/5 rounded-full blur-[120px]"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="w-full lg:w-1/3 relative text-center"
                            >
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-ayur-gold/20 rounded-full blur-3xl transform scale-110"></div>
                                    <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
                                        <img src={founderImage} className="w-full h-full object-cover" alt="Karan Singh Vaidh" />
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-2xl shadow-xl border border-ayur-gold/20 min-w-[200px] z-20">
                                        <h3 className="font-serif font-bold text-ayur-green text-xl whitespace-nowrap">Karan Singh Vaidh</h3>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-1">Founder & Chief Consultant</p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="w-full lg:w-2/3 space-y-10">
                                <Quote size={64} className="text-ayur-gold/20" />
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <p className="text-2xl md:text-3xl font-serif text-ayur-green leading-relaxed font-bold italic">
                                        "At The Karan Singh Vaidh, our mission is to simplify health. We take the complexities of 5,000-year-old Ayurveda and turn them into solutions for the modern home."
                                    </p>
                                    <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                                        <p>
                                            Our dedication goes beyond formulations. We believe in the holistic growth of the individual—mind, body, and spirit. Every product that leaves our facility is a symbol of our commitment to your health journey.
                                        </p>
                                        <p>
                                            We source ethically, process traditionally, and validate scientifically—so you can heal naturally.
                                        </p>
                                    </div>

                                    <div className="pt-8 border-t border-ayur-gold/20">
                                        <p className="font-serif text-3xl text-ayur-green font-black tracking-wider opacity-60 italic">Karan Singh Vaidh</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
