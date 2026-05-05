import React, { useState } from 'react';
import { Phone, MessageCircle, FileEdit, X } from 'lucide-react';
import ConsultationModal from '../home/ConsultationModal';

const FloatingActionButtons = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const phoneNumber = "8219658454";
    const whatsappNumber = "918219658454";
    
    return (
        <>
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end">
                {/* Lead Form Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-3 bg-white text-ayur-green px-4 py-3 rounded-full shadow-2xl border border-ayur-green/20 hover:bg-ayur-green hover:text-white transition-all duration-300 transform hover:-translate-x-2"
                >
                    <span className="text-sm font-bold whitespace-nowrap hidden group-hover:block transition-all">Book Consultation</span>
                    <div className="bg-ayur-green/10 p-2 rounded-full group-hover:bg-white/20">
                        <FileEdit size={22} />
                    </div>
                </button>

                {/* WhatsApp Button */}
                <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi, I have a query about your Ayurvedic treatments.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 transform hover:-translate-x-2"
                >
                    <span className="text-sm font-bold whitespace-nowrap hidden group-hover:block transition-all">WhatsApp Us</span>
                    <div className="bg-white/20 p-2 rounded-full">
                        <MessageCircle size={22} fill="white" />
                    </div>
                </a>

                {/* Call Button */}
                <a
                    href={`tel:+91${phoneNumber}`}
                    className="group flex items-center gap-3 bg-ayur-green text-white px-4 py-3 rounded-full shadow-2xl hover:bg-ayur-olive transition-all duration-300 transform hover:-translate-x-2"
                >
                    <span className="text-sm font-bold whitespace-nowrap hidden group-hover:block transition-all">Call Now</span>
                    <div className="bg-white/20 p-2 rounded-full">
                        <Phone size={22} fill="white" />
                    </div>
                </a>
            </div>

            {/* Consultation Modal */}
            <ConsultationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
};

export default FloatingActionButtons;
