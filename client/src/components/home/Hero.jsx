import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, Star, ShieldCheck, Leaf, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ConsultationModal from './ConsultationModal';

import banner1Web from '../../assets/BANNER 1 WEB.png';
import himAward from '../../assets/him award.png';

// Slider Settings
const Hero = () => {
    // State to track if the device is desktop (min-width: 768px for tablet/desktop)
    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true, // Smooth fade transition for premium feel
        cssEase: "linear",
        pauseOnHover: false,
        arrows: true, // Enable manual navigation
        customPaging: i => (
            <div className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-all cursor-pointer mt-4"></div>
        ),
        appendDots: dots => (
            <div style={{ bottom: "30px" }}>
                <ul className="m-0 p-0 flex justify-center gap-4"> {dots} </ul>
            </div>
        )
    };

    // Slide Data
    const slides = [
        {
            id: 'banner1',
            title: null,
            subtitle: null,
            cta: null,
            link: "/shop",
            bgImage: banner1Web,
            theme: "dark",
            icon: null,
            desktopOnly: true,
            hasOverlay: false
        },
        {
            id: 'himAward',
            title: null,
            subtitle: null,
            cta: null,
            link: "/about", // Assuming award links to about or similar
            bgImage: himAward,
            theme: "dark",
            icon: null,
            desktopOnly: true,
            hasOverlay: false
        },
        {
            id: 1,
            title: "Ayurvedic Legacy Since 2006",
            subtitle: "Trusted ancient formulations for modern lifestyle diseases",
            cta: "Shop Now",
            link: "/shop",
            bgImage: "https://img.freepik.com/free-photo/high-angle-assortment-fine-powders-bowls-with-stones_23-2148774961.jpg?t=st=1768658729~exp=1768662329~hmac=1305b1ea239fc0e17c5a82832bfd000b36c959d983f593b53d927ff3a0f872c2&w=1480", // Herbs/Heritage
            theme: "dark", // Text color
            icon: <Leaf className="text-yellow-400 mb-4" size={48} />
        },
        {
            id: 2,
            title: "Proven Results. Natural Healing.",
            subtitle: "Clinically inspired Ayurvedic medicines with no side effects",
            cta: "Consult Ayurveda Expert",
            link: "/consult",
            bgImage: "https://img.freepik.com/free-photo/hand-holding-rosemary-fresh-plant-bottle-rosemary-oil_1150-35585.jpg?t=st=1768658851~exp=1768662451~hmac=1c028731e810981051aa0fef9c9e9307cca949343962ee3e2ec3f1ec153508cf&w=1480", // Green gradient/leafy
            theme: "dark",
            icon: <ShieldCheck className="text-green-400 mb-4" size={48} />
        },
        {
            id: 3,
            title: "Targeted Relief for Chronic Disorders",
            subtitle: "Diabetes, Joint Pain, Digestion, Immunity & Lifestyle Issues",
            cta: "Explore Solutions",
            link: "/shop",
            bgImage: "https://img.freepik.com/premium-photo/midsection-doctor-patient-shaking-hand-while-sitting-clinic_1048944-15396134.jpg", // Wellness/Yoga
            theme: "dark",
            icon: <Star className="text-yellow-400 mb-4" size={48} />
        },
        {
            id: 4,
            title: "Trusted by Thousands of Happy Patients",
            subtitle: "⭐⭐⭐⭐⭐ Verified reviews with real success stories",
            cta: "View Reviews",
            link: "/reviews",
            bgImage: "https://img.freepik.com/free-photo/happy-senior-man-handshaking-with-female-doctor-while-talking-lobby-clinic_637285-460.jpg?t=st=1768659350~exp=1768662950~hmac=47863c5cbf9ae7d6df4f4df0a669a2a5fd118610566744e97e8a0b5dac1dac22&w=1480", // Happy people/Community
            theme: "dark",
            icon: <Users className="text-blue-400 mb-4" size={48} />
        }
    ];

    return (
        <section className="relative overflow-hidden w-full h-[600px] md:h-[700px]">
            <Slider {...settings} className="hero-slider h-full">
                {slides.filter(slide => !slide.desktopOnly || isDesktop).map((slide) => (
                    <div key={slide.id} className="relative h-[600px] md:h-[700px] w-full outline-none">
                        {/* Background Image with Overlay */}
                        <div
                            className={`absolute inset-0 bg-center bg-no-repeat transition-transform duration-[5000ms] ${slide.hasOverlay !== false ? "bg-cover hover:scale-105" : ""
                                }`}
                            style={{
                                backgroundImage: `url(${slide.bgImage})`,
                                backgroundSize: slide.hasOverlay !== false ? "cover" : "100% 100%"
                            }}
                        >
                            {/* Gradient Overlay for Readability - Only for slides with text */}
                            {slide.hasOverlay !== false && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0d2e1b]/90 via-[#0d2e1b]/60 to-transparent"></div>
                            )}
                        </div>

                        {/* Content Container - Only render if title exists */}
                        {slide.title && (
                            <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center max-w-7xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="max-w-2xl"
                                >
                                    {/* Slide Icon */}
                                    <div className="mb-2 animate-pulse">
                                        {slide.icon}
                                    </div>

                                    {/* Headline */}
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
                                        {slide.title}
                                    </h1>

                                    {/* Subtext */}
                                    <p className="text-lg md:text-xl text-gray-200 mb-10 font-light tracking-wide leading-relaxed border-l-4 border-yellow-500 pl-4">
                                        {slide.subtitle}
                                    </p>

                                    {/* CTA Button */}
                                    <button
                                        onClick={(e) => {
                                            if (slide.cta === "Consult Ayurveda Expert") {
                                                e.preventDefault();
                                                setIsModalOpen(true);
                                            } else {
                                                window.location.href = slide.link;
                                            }
                                        }}
                                        className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-[#0d2e1b] px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 hover:shadow-xl group"
                                    >
                                        {slide.cta}
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>

            {/* Custom Styles for Slider Dots/Arrows overrides if needed */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .hero-slider .slick-prev, .hero-slider .slick-next {
                    z-index: 20;
                    width: 50px;
                    height: 50px;
                    transition: all 0.3s;
                }
                .hero-slider .slick-prev { left: 30px; }
                .hero-slider .slick-next { right: 30px; }
                .hero-slider .slick-prev:before, .hero-slider .slick-next:before {
                    font-size: 40px;
                    opacity: 0.7;
                    color: white;
                }
                .hero-slider .slick-prev:hover:before, .hero-slider .slick-next:hover:before {
                    opacity: 1;
                    color: #eab308; /* yellow-500 */
                }
            `}} />
            {/* Appointment Modal */}
            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default Hero;
