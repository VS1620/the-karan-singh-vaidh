import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-full mb-6 shadow-lg">
                        <Shield className="text-white" size={36} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-gray-600">Last Updated: January 23, 2026</p>
                </div>

                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        At <span className="font-semibold text-[#2C5F4F]">The Karan Singh  Vaidh</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Database className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Information We Collect</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                                <p className="leading-relaxed mb-2">When you make a purchase or create an account, we collect:</p>
                                <ul className="list-disc list-inside space-y-1 pl-4">
                                    <li>Name and contact information (email, phone number)</li>
                                    <li>Billing and shipping addresses</li>
                                    <li>Payment information (processed securely through payment gateways)</li>
                                    <li>Order history and preferences</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatic Information</h3>
                                <p className="leading-relaxed mb-2">We automatically collect certain information when you visit our website:</p>
                                <ul className="list-disc list-inside space-y-1 pl-4">
                                    <li>IP address and browser type</li>
                                    <li>Device information and operating system</li>
                                    <li>Pages visited and time spent on our website</li>
                                    <li>Referring website addresses</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Eye className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">How We Use Your Information</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-3 text-gray-700">
                            <p className="leading-relaxed">We use your information to:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Process and fulfill your orders</li>
                                <li>Communicate with you about your orders and account</li>
                                <li>Send promotional emails and newsletters (with your consent)</li>
                                <li>Improve our website and customer service</li>
                                <li>Detect and prevent fraud</li>
                                <li>Comply with legal obligations</li>
                                <li>Personalize your shopping experience</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Lock className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Security</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                We implement industry-standard security measures to protect your personal information. This includes:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>SSL encryption for all data transmissions</li>
                                <li>Secure payment processing through trusted gateways</li>
                                <li>Regular security audits and updates</li>
                                <li>Restricted access to personal information</li>
                                <li>Secure server infrastructure</li>
                            </ul>
                            <p className="leading-relaxed">
                                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Remember your preferences and settings</li>
                                <li>Keep items in your shopping cart</li>
                                <li>Analyze website traffic and usage patterns</li>
                                <li>Provide personalized content and advertisements</li>
                            </ul>
                            <p className="leading-relaxed">
                                You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Object to processing of your personal information</li>
                                <li>Request data portability</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Disclosure</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                We do not sell, trade, or otherwise transfer your personal information to third parties except:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Trusted service providers who assist in operating our website</li>
                                <li>Payment processors for transaction processing</li>
                                <li>Shipping carriers for order delivery</li>
                                <li>When required by law or to protect our rights</li>
                            </ul>
                            <p className="leading-relaxed">
                                All third parties are required to maintain the confidentiality of your information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-2xl shadow-lg p-8 md:p-10 text-white">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mail className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                            <div className="h-1 w-20 bg-white/50"></div>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed mb-6">
                        If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                    </p>

                    <div className="space-y-3">
                        <p className="flex items-center gap-3">
                            <span className="font-semibold">Email:</span>
                            <a href="mailto:thekaransinghvaidh@gmail.com" className="hover:underline">
                                thekaransinghvaidh@gmail.com
                            </a>
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="font-semibold">Phone:</span>
                            <a href="tel:8219658454" className="hover:underline">
                                82196 58454 | 80911 34027 | 88947 72187
                            </a>
                        </p>
                        <p className="flex items-start gap-3">
                            <span className="font-semibold flex-shrink-0">Address:</span>
                            <span>Hospital Road, Kotlanala, Solan, Himachal Pradesh – 173212</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
