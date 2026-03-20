import React, { useState } from 'react';
import { Heart, Leaf, Users, Award, ShieldCheck, Sparkles, CheckCircle, ArrowRight, Star, Quote, Shield, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import founderImage from '../assets/karan singh vaidh img.jpeg';
import ConsultationModal from '../components/home/ConsultationModal';

import natureIsGoodSeal from '../assets/nature-is-good-seal.webp';
import hereForYourHealthSeal from '../assets/here-for-your-health-seal.webp';
import noShortcutsSeal from '../assets/no-shortcuts-seal.webp';
import modernAyurLogo from '../assets/modern-ayur-k.png';
import karanTradAttire from '../assets/Himachali Vaidh in Clinical Setting.png';
import herbBowl1 from '../assets/WhatsApp Image 2026-03-06 at 9.39.06 PM.jpeg';
import spiceTray from '../assets/WhatsApp Image 2026-03-06 at 9.40.30 PM.jpeg';
import cinnamonBowl from '../assets/WhatsApp Image 2026-03-06 at 9.40.56 PM.jpeg';
import herbTable from '../assets/WhatsApp Image 2026-03-06 at 9.41.02 PM.jpeg';



const StampIcon = ({ icon: Icon, image, text, color }) => (
    <div className="relative w-32 h-32 flex items-center justify-center">
        {image ? (
            <img
                src={image}
                alt={text}
                className="w-full h-full object-contain"
            />
        ) : (
            <>
                {/* Static Text Circle */}
                <div className="absolute inset-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                            id="circlePath"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            fill="none"
                        />
                        <text className="text-[10px] uppercase tracking-[0.2em] font-bold fill-current opacity-60">
                            <textPath href="#circlePath" startOffset="0%">
                                {text} • {text} • {text} •
                            </textPath>
                        </text>
                    </svg>
                </div>
                {/* Center Icon */}
                <div className={`relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5`}>
                    <Icon size={32} className={`text-current`} />
                </div>
            </>
        )}
    </div>
);

const FloatingDecoration = ({ src, className, delay = 0, duration = 6, rotate = 0 }) => (
    <div
        className={`absolute pointer-events-none z-0 ${className}`}
        style={{ transform: rotate ? `rotate(${rotate}deg)` : 'none' }}
    >
        <img 
            src={src} 
            alt="Decoration" 
            className="w-full h-full object-cover rounded-full shadow-lg border-2 border-white/20"
        />
    </div>
);


const AboutUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const differences = [
        {
            title: "Natural is good",
            description: "Karan Singh Vaidh ensures that all of Our products are natural and organic",
            bgColor: "bg-[#fff0f0]", // Light Pink
            accentColor: "text-[#d17a7a]",
            text: "Natural is good",
            image: natureIsGoodSeal,
            icon: null
        },
        {
            title: "Here for your health",
            description: "Our products are made with the knowledge of ancient Ayurveda & the backing of modern science.",
            bgColor: "bg-[#eaffee]", // Light Green
            accentColor: "text-[#4a9161]",
            text: "Here for your health",
            image: hereForYourHealthSeal,
            icon: null
        },
        {
            title: "No shortcuts",
            description: "Karan Singh Vaidh products are sourced in their purest form.",
            bgColor: "bg-[#fffce6]", // Light Yellow
            accentColor: "text-[#b09b30]",
            text: "No shortcuts",
            image: noShortcutsSeal,
            icon: null
        }
    ];

    return (
        <div className="bg-white font-sans overflow-hidden">
            {/* Modern Ayurvedic Nutrition Hero (The New Requested Top Section) */}
            <section className="relative min-h-[90vh] bg-white flex flex-col items-center justify-center pt-20 overflow-hidden">
                {/* Decorative Elements (Spread across the section) */}
                <FloatingDecoration 
                    src={herbBowl1} 
                    className="w-20 h-20 md:w-32 md:h-32 top-[10%] left-[10%] opacity-80" 
                    delay={0} 
                />
                <FloatingDecoration 
                    src={spiceTray} 
                    className="w-24 h-24 md:w-36 md:h-36 top-[10%] right-[10%] opacity-80" 
                    delay={1} 
                />
                <FloatingDecoration 
                    src={cinnamonBowl} 
                    className="w-24 h-24 md:w-40 md:h-40 bottom-[10%] left-[10%] opacity-80" 
                    delay={0.5} 
                    rotate={-15}
                />
                <FloatingDecoration 
                    src={herbTable} 
                    className="w-24 h-24 md:w-40 md:h-40 bottom-[10%] right-[10%] opacity-80" 
                    delay={1.5} 
                />

                {/* Center Content */}
                <div className="container mx-auto px-6 text-center z-20 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
                        className="relative inline-block"
                    >

                        {/* New High-Quality K Logo */}
                        {/* KSV Text Logo */}
                        <div className="relative flex items-center justify-center">
                            <div className="text-8xl md:text-[12rem] font-serif font-bold text-[#1b3a27] tracking-tighter relative z-10 leading-none">
                                KSV
                            </div>
                            {/* Subtle decorative ring */}
                            <div className="absolute inset-0 border-[1px] border-[#1b3a27]/10 rounded-full transform scale-[1.2] md:scale-[1.4]"></div>
                            {/* Subtle glow behind the text */}
                            <div className="absolute inset-0 bg-ayur-green/5 blur-[100px] rounded-full transform scale-90"></div>
                        </div>
                    </motion.div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-3xl md:text-5xl font-serif font-bold text-[#1b3a27] leading-tight"
                        >
                            Karan Singh Vaidh-<br />
                            Modern Ayurvedic Nutrition
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-lg md:text-xl text-gray-600 font-light tracking-wide italic"
                        >
                            We're with you to help you live consciously, in synergy with Mother nature.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex justify-center"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-[#1b3a27]/20 to-transparent"></div>
                    </motion.div>
                </div>

                {/* Subtle Overlay to blend with next section */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fdfbf6] to-transparent"></div>
            </section>

            {/* The Difference Section (From User Image) */}
            <section className="py-24 bg-[#f4f1ea]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16 space-y-4">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-ayur-gold font-bold tracking-[0.3em] uppercase text-xs"
                        >
                            About Us
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-4xl font-serif font-bold text-[#1b3a27] leading-tight"
                        >
                            A growing family of Ayurvedic experts, nutritionists, <br className="hidden md:block" />
                            and scientists dedicated to you.
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {differences.map((diff, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex flex-col items-center text-center p-8 md:p-12 rounded-[2rem] ${diff.bgColor} transition-transform hover:scale-[1.02] duration-500`}
                            >
                                <div className={diff.accentColor}>
                                    <StampIcon icon={diff.icon} image={diff.image} text={diff.text} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#1b3a27] mt-8 mb-4">
                                    {diff.title}
                                </h3>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    {diff.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Philosophy Grid Section */}
            <section className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Top Row - Full Width in Grid Context */}
                    <div className="md:col-span-2 bg-[#e8fcf0] relative min-h-[300px] md:min-h-[400px] flex items-center overflow-hidden rounded-t-[3rem] md:rounded-none m-4 md:m-0">

                        <div className="container mx-auto px-8 md:px-16 py-16 grid md:grid-cols-2 items-center gap-12">
                            <div className="space-y-6 z-10">
                                <span className="text-ayur-gold font-bold uppercase tracking-widest text-xs">Our Philosophy</span>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1b3a27] leading-tight">
                                    Your simple guide to <br />
                                    everyday Ayurveda
                                </h2>
                                <p className="text-gray-600 max-w-lg leading-relaxed font-light">
                                    Karan Singh Vaidh understands the worries in your mind. Which is why we have pilled off the complications and left you with pure unadulterated nature. Crafted as fresh as plucked, we take the pains to go the longest route possible.
                                </p>
                            </div>
                            <div className="relative flex justify-center">
                                {/* Hand with Juice Product Image */}
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="relative z-10"
                                >
                                    <img
                                        src="https://cdn11.bigcommerce.com/s-5h8rqg02f8/product_images/uploaded_images/mealreplacement-mango-final-2.png"
                                        alt="Mango Meal Replacement"
                                        className="w-full max-w-[400px] h-auto drop-shadow-2xl"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Left (Pink) */}
                    <div className="bg-[#fff0f0] min-h-[350px] md:min-h-[450px] flex items-center p-8 md:p-16 relative overflow-hidden">
                        <div className="space-y-6 z-10">
                            <h3 className="text-3xl font-serif font-bold text-[#1b3a27]">
                                Learn from the past, <br />
                                created for the present
                            </h3>
                            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
                                Bringing a modern touch to Ayurveda, Karan Singh Vaidh sources, examines, undertakes all traditional procedures as laid down in our ancient Ayurvedic texts. Taking ancient principles and the human soul, we create Ayurvedic products with a modern touch, thus helping authentic Ayurvedic nutrition meet the demands of convenience.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row - Right (Yellow) */}
                    <div className="bg-[#fffce6] min-h-[350px] md:min-h-[450px] flex items-center p-8 md:p-16 relative overflow-hidden">
                        <div className="space-y-6 z-10">
                            <h3 className="text-3xl font-serif font-bold text-[#1b3a27]">
                                Preserving Nature, one <br />
                                ingredient at a time
                            </h3>
                            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
                                Years of study told us that freshest ingredients when matched with the right Ayurvedic process can result in nothing short of 'natural, good health'. This is precisely why, our amlas are ripe-yellow, our wheatgrass arrives only on the 8th day of harvest and our aloe vera juices are fresh born 4 hours old.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Doctor Consultation Section */}
            <section className="py-24 bg-[#f4f1ea]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rounded-tr-none">
                                <img
                                    src={karanTradAttire}
                                    alt="Doctor Consultation"
                                    className="w-full h-[400px] object-cover"
                                />
                                <div className="absolute inset-0 bg-ayur-green/5"></div>
                            </div>
                            {/* Overlapping Stamp */}
                            <div className="absolute -top-12 -left-12 z-20">
                                <StampIcon icon={null} image={hereForYourHealthSeal} text="Here for your health" />
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="w-full lg:w-1/2 space-y-8"
                        >
                            <div className="space-y-4">
                                {/* <span className="text-ayur-gold font-bold uppercase tracking-widest text-xs">Doctor Consultation</span> */}
                                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1b3a27] leading-tight">
                                    Book your 15 min session with <br className="hidden md:block" />
                                    Karan Singh Vaidh
                                </h2>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed font-light">
                                Ayurveda is a holistic science that is focussed on the individual nature and helps you attain a balance of mind and body for optimum well-being. Start on the path to better health and wellness.
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="pt-4"
                            >
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group relative bg-[#419463] text-white px-8 py-4 rounded-[2rem] font-bold uppercase text-xs tracking-[0.3em] shadow-xl shadow-ayur-green/20 hover:bg-[#357a52] transition-all transform active:scale-95 flex items-center gap-4 overflow-hidden"
                                >
                                    <span className="relative z-10 font-black">Book An Appointment</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms]" />
                                </button>
                            </motion.div>


                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Appointment Modal */}
            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default AboutUs;
