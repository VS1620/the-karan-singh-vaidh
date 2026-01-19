import React from 'react';
import { Star, Leaf, Check, Ban, TestTube, Recycle, Award, Stethoscope } from 'lucide-react';

const trustItems = [
    { icon: <Star size={18} className="text-yellow-400" />, text: "ISO Certified Manufacturing" },
    { icon: <Leaf size={18} className="text-green-400" />, text: "100% Natural Ayurvedic Formulations" },
    { icon: <Check size={18} className="text-blue-400" />, text: "GMP Certified Facility" },
    { icon: <Ban size={18} className="text-red-400" />, text: "No Added Sugar" },
    { icon: <TestTube size={18} className="text-purple-400" />, text: "No Extracts Used" },
    { icon: <Recycle size={18} className="text-emerald-400" />, text: "BPA Free Packaging" },
    { icon: <Award size={18} className="text-yellow-500" />, text: "Best in Quality – Trusted Since 1920" },
    { icon: <Stethoscope size={18} className="text-white" />, text: "Doctor Recommended Formulas" }
];

const TrustMarquee = () => {
    return (
        <div className="bg-[#0d2e1b] py-4 overflow-hidden border-y border-yellow-500/20 relative z-20">
            <div className="flex w-max animate-marquee hover:pause-animation">
                {/* Original Set */}
                <div className="flex items-center gap-12 px-6">
                    {trustItems.map((item, index) => (
                        <div key={`trust-${index}`} className="flex items-center gap-3 group cursor-default">
                            <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                                {item.icon}
                            </span>
                            <span className="text-white text-sm md:text-base font-medium tracking-wide whitespace-nowrap group-hover:text-yellow-400 transition-colors">
                                {item.text}
                            </span>
                            {/* Divider Dot */}
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 ml-8"></div>
                        </div>
                    ))}
                </div>

                {/* Duplicate Set for Seamless Loop */}
                <div className="flex items-center gap-12 px-6">
                    {trustItems.map((item, index) => (
                        <div key={`trust-dup-${index}`} className="flex items-center gap-3 group cursor-default">
                            <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                                {item.icon}
                            </span>
                            <span className="text-white text-sm md:text-base font-medium tracking-wide whitespace-nowrap group-hover:text-yellow-400 transition-colors">
                                {item.text}
                            </span>
                            {/* Divider Dot */}
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 ml-8"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Inline Styles for Keyframes since standard Tailwind config might not have custom animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .hover\\:pause-animation:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};

export default TrustMarquee;
