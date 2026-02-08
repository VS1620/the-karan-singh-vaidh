import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import karanSir from '../../assets/karan sir 3.png';
import happyPatientsIcon from '../../assets/happy_patients_icon.png';
import customersWorldwideIcon from '../../assets/customers_worldwide_icon.png';
import citiesCoveredIcon from '../../assets/cities_covered_icon.png';
import yearsExperienceIcon from '../../assets/years_experience_icon.png';
import resultGuaranteedIcon from '../../assets/result_guaranteed_icon.png';

const reasons = [
    {
        stat: "3,00,000+",
        label: "Happy Patients",
        desc: "Trusted by millions worldwide for holistic Ayurvedic healing.",
        icon: happyPatientsIcon,
        bgColor: "bg-blue-50"
    },
    {
        stat: "1,00,000+",
        label: "Happy Customer Worldwide",
        desc: "Delivering authentic Ayurvedic wellness across continents.",
        icon: customersWorldwideIcon,
        bgColor: "bg-emerald-50"
    },
    {
        stat: "3000+",
        label: "Cities Covered",
        desc: "Bringing traditional wisdom to urban communities nationwide.",
        icon: citiesCoveredIcon,
        bgColor: "bg-amber-50"
    },
    {
        stat: "25 Years",
        label: "of Experience",
        desc: "Over two decades of expertise in Ayurvedic medicine.",
        icon: yearsExperienceIcon,
        bgColor: "bg-purple-50"
    },
    {
        stat: "90%",
        label: "Result Guaranteed",
        desc: "Proven track record of successful patient outcomes.",
        icon: resultGuaranteedIcon,
        bgColor: "bg-green-50"
    },
];

const WhyUs = () => {
    return (
        <section className="py-12 md:py-16 bg-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ayur-green/20 to-transparent" />

            <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-10"
                >
                    <span className="inline-flex items-center gap-2 text-ayur-olive font-bold tracking-[0.2em] uppercase text-xs mb-4">
                        <Sparkles size={14} className="text-ayur-gold" />
                        Our Legacy of Trust
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-ayur-green">
                        Why Karan Singh Vaidh ?
                    </h2>
                </motion.div>

                {/* Doctor Profile Section */}
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full mx-auto rounded-[3rem] shadow-2xl overflow-hidden mb-20 flex flex-col md:flex-row"
                >
                    {/* Left: Doctor Image Section - Light Background */}
                    <div className="w-full md:w-5/12 bg-gray-200 relative flex items-end justify-center md:min-h-full">
                        <img
                            src={karanSir}
                            alt="Dr. Karan Singh Vaidh"
                            className="w-full h-auto md:h-full object-cover relative z-10"
                        />
                    </div>

                    {/* Right: Doctor Details Section - Deep Green Background */}
                    <div className="w-full md:w-7/12 bg-gradient-to-br from-emerald-700 to-teal-700 text-white p-8 md:p-14 flex flex-col justify-center relative text-left overflow-hidden">
                        {/* Palm Image Decoration */}
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30 mix-blend-multiply">
                            <img
                                src="https://img.freepik.com/free-psd/tropical-palm-fronds-lush-green-paradise_632498-25032.jpg?t=st=1770031966~exp=1770035566~hmac=3bb2da029bc828c0931494c97447e07cf06fefa7ea13db71de64e89be01875f7&w=1480"
                                alt="Palm Decoration"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <h3 className="text-4xl md:text-5xl font-sans font-bold leading-tight !text-white" style={{ color: 'white' }}>
                                Karan Singh Vaidh
                            </h3>

                            <div className="space-y-3 text-sm md:text-base">
                                <p>
                                    <span className="font-bold text-green-300">Specialization:</span> <span className="font-medium">Ayurvedic Expert & Holistic Healer</span>
                                </p>
                                <p>
                                    <span className="font-bold text-green-300">Total Experience:</span> <span className="font-medium">25+ Years</span>
                                </p>
                                <p>
                                    {/* <span className="font-bold text-green-300">Consultation Language Known:</span> <span className="font-medium">Hindi, English, Punjabi</span> */}
                                </p>
                            </div>

                            <p className="text-gray-200 text-sm md:text-base leading-relaxed border-t border-green-700/50 pt-6 mt-4">
                                Karan Singh Vaidh is a renowned Ayurvedic vaidh with over 25 years of experience. He has been dedicated to restoring balance in modern lives through authentic Ayurveda. His clinical expertise is known widely for treating various ailments, ensuring lifelong wellness for every patient.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link
                                    to="/about"
                                    className="bg-[#d4af37] text-[#0d2e1b] px-8 py-3 rounded-full font-bold text-base transition-all hover:bg-white hover:scale-105"
                                >
                                    Discover Our Story
                                </Link>

                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-[rgb(74,124,89)] p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(44,95,79,0.15)] border border-ayur-beige/30 transition-all duration-500 flex flex-col items-center text-center"
                        >
                            <div className={`p-5 rounded-3xl bg-white/20 backdrop-blur-sm mb-6 transform group-hover:rotate-12 transition-transform duration-500`}>
                                <img src={reason.icon} alt={reason.label} className="w-10 h-10 object-contain" />
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-1 transition-colors">
                                {reason.stat}
                            </h3>
                            <p className="font-serif text-lg text-[#d4af37] font-bold mb-3 tracking-tight">
                                {reason.label}
                            </p>
                            <p className="text-xs text-green-100 leading-relaxed font-medium">
                                {reason.desc}
                            </p>

                            <div className="mt-6 w-12 h-1 bg-[#d4af37]/40 rounded-full group-hover:w-20 group-hover:bg-[#d4af37] transition-all duration-300"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
