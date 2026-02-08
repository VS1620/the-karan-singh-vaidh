import React from 'react';
import { Phone } from 'lucide-react';

const FloatingCallButton = () => {
    const phoneNumber = "8894772187";
    const callUrl = `tel:+91${phoneNumber}`;

    return (
        <a
            href={callUrl}
            className="fixed bottom-36 md:bottom-8 right-6 z-[100] group"
            aria-label="Call Us"
        >
            {/* Pulse Effect */}
            <div className="absolute inset-0 bg-ayur-green rounded-full animate-ping opacity-25 group-hover:animate-none"></div>

            {/* Button */}
            <div className="relative transition-all duration-300 transform group-hover:scale-110 group-active:scale-95 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-ayur-green rounded-full shadow-2xl">
                <Phone className="text-white w-8 h-8 md:w-10 md:h-10" />

                {/* Tooltip */}
                <div className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-xl text-sm font-bold whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none border border-gray-100 flex flex-col items-center">
                    <span className="text-ayur-green">Call Us</span>
                    <span className="text-[11px] text-gray-500 font-medium">+91 88947 72187</span>
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-t border-r border-gray-100"></div>
                </div>
            </div>
        </a>
    );
};

export default FloatingCallButton;
