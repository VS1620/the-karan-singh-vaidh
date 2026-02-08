import React, { useEffect } from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-full mb-6 shadow-lg">
                        <FileText className="text-white" size={36} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
                    <p className="text-lg text-gray-600">Last Updated: January 23, 2026</p>
                </div>

                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Welcome to <span className="font-semibold text-[#2C5F4F]">The Karan Singh&nbsp;&nbsp;Vaidh</span>. By accessing and using our website, you accept and agree to be bound by the terms and conditions outlined below. Please read them carefully before making any purchase or using our services.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceptance of Terms</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                By using this website, you confirm that you:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Are at least 18 years of age</li>
                                <li>Have the legal capacity to enter into binding contracts</li>
                                <li>Agree to provide accurate and complete information</li>
                                <li>Will comply with all applicable laws and regulations</li>
                                <li>Accept responsibility for all activities under your account</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                We strive to provide accurate product descriptions, images, and pricing. However:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Product colors may vary slightly due to screen settings</li>
                                <li>We reserve the right to correct pricing errors</li>
                                <li>Product availability is subject to change</li>
                                <li>We may update product information without prior notice</li>
                                <li>All Ayurvedic products are manufactured according to traditional formulations</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                <strong>Medical Disclaimer:</strong> Our Ayurvedic products are not intended to diagnose, treat, cure, or prevent any disease. Please consult with a qualified healthcare professional before using any herbal products.
                            </p>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders and Payment</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Confirmation</h3>
                                <p className="leading-relaxed">
                                    Once you place an order, you will receive an email confirmation. This confirms receipt of your order, not acceptance. We reserve the right to refuse or cancel any order for any reason.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Terms</h3>
                                <ul className="list-disc list-inside space-y-1 pl-4">
                                    <li>All prices are in Indian Rupees (INR)</li>
                                    <li>Payment must be received before order dispatch</li>
                                    <li>We accept credit/debit cards, UPI, net banking, and digital wallets</li>
                                    <li>Failed transactions may take 5-7 business days for refund processing</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                                <p className="leading-relaxed">
                                    Prices are subject to change without notice. The price applicable is the one displayed at the time of order placement. Any applicable taxes will be added at checkout.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">When you create an account with us:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>You must provide accurate and current information</li>
                                <li>You are responsible for maintaining account confidentiality</li>
                                <li>You must immediately notify us of unauthorized access</li>
                                <li>You are responsible for all activities under your account</li>
                                <li>We may suspend or terminate accounts that violate these terms</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Scale className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Intellectual Property</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of The Karan Singh Vaidh and is protected by copyright laws.
                            </p>
                            <p className="leading-relaxed">You may not:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Reproduce, distribute, or display any content without permission</li>
                                <li>Use our trademarks or branding without authorization</li>
                                <li>Modify or create derivative works from our content</li>
                                <li>Use automated systems to access or scrape our website</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="text-amber-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Limitation of Liability</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                The Karan Singh Vaidh shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Your use or inability to use our products or services</li>
                                <li>Unauthorized access to your personal information</li>
                                <li>Errors or omissions in product information</li>
                                <li>Delays or failures in delivery due to circumstances beyond our control</li>
                                <li>Any user-generated content or third-party links</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                These terms and conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Solan, Himachal Pradesh.
                            </p>
                        </div>
                    </div>

                    {/* Section 8 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified terms.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-2xl shadow-lg p-8 md:p-10 text-white">
                    <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
                    <div className="h-1 w-20 bg-white/50 mb-6"></div>

                    <p className="text-lg leading-relaxed mb-6">
                        If you have any questions about these Terms & Conditions, please contact us:
                    </p>

                    <div className="space-y-3">
                        <p>
                            <span className="font-semibold">Email:</span>{' '}
                            <a href="mailto:thekaransinghvaidh@gmail.com" className="hover:underline">
                                thekaransinghvaidh@gmail.com
                            </a>
                        </p>
                        <p>
                            <span className="font-semibold">Phone:</span>{' '}
                            <a href="tel:8219658454" className="hover:underline">
                                82196 58454 | 80911 34027 | 88947 72187
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
