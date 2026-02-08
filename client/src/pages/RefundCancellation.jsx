import React, { useEffect } from 'react';
import { RotateCcw, CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';

const RefundCancellation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-full mb-6 shadow-lg">
                        <RotateCcw className="text-white" size={36} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Refund & Cancellation Policy</h1>
                    <p className="text-lg text-gray-600">Last Updated: January 23, 2026</p>
                </div>

                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        At <span className="font-semibold text-[#2C5F4F]">The Karan Singh&nbsp;&nbsp;Vaidh</span>, customer satisfaction is our priority. We understand that sometimes you may need to cancel an order or request a refund. Please review our policy below to understand the process and conditions.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <XCircle className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Cancellation</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-700">
                            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                                    <CheckCircle2 size={20} className="text-green-600" />
                                    Before Dispatch - Full Cancellation Available
                                </h3>
                                <p className="leading-relaxed text-green-800">
                                    You can cancel your order for free before it has been dispatched. Simply contact our customer service team or cancel directly from your account dashboard.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Cancel Before Dispatch</h3>
                                <ol className="list-decimal list-inside space-y-2 pl-4">
                                    <li>Log into your account and go to "My Orders"</li>
                                    <li>Select the order you wish to cancel</li>
                                    <li>Click on "Cancel Order" button</li>
                                    <li>Select a reason for cancellation</li>
                                    <li>Confirm cancellation</li>
                                </ol>
                                <p className="mt-4 leading-relaxed">
                                    You will receive a confirmation email once the cancellation is processed. Refund will be initiated immediately.
                                </p>
                            </div>

                            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                                <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center gap-2">
                                    <AlertCircle size={20} className="text-amber-600" />
                                    After Dispatch - Limited Cancellation
                                </h3>
                                <p className="leading-relaxed text-amber-800">
                                    Once your order has been dispatched, cancellation is not available. However, you can refuse delivery or initiate a return after receiving the product (subject to our return conditions).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <RotateCcw className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Return & Refund Eligibility</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-700">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Products Eligible for Return</h3>
                                <p className="leading-relaxed mb-4">
                                    We accept returns for the following reasons within <strong>7 days of delivery</strong>:
                                </p>
                                <ul className="list-disc list-inside space-y-2 pl-4">
                                    <li>Product received is damaged or defective</li>
                                    <li>Wrong product delivered</li>
                                    <li>Product does not match the description</li>
                                    <li>Packaging is tampered or broken</li>
                                    <li>Missing items from your order</li>
                                </ul>
                            </div>

                            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                                <h3 className="text-lg font-semibold text-red-900 mb-3">Products NOT Eligible for Return</h3>
                                <ul className="list-disc list-inside space-y-2 pl-4 text-red-800">
                                    <li>Products with broken seals or used/consumed items</li>
                                    <li>Products without original packaging</li>
                                    <li>Products damaged due to misuse</li>
                                    <li>Return request made after 7 days of delivery</li>
                                    <li>Products purchased during clearance/final sale</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <h4 className="font-semibold text-blue-900 mb-2">📦 Return Conditions</h4>
                                <p className="text-blue-800 leading-relaxed">
                                    Products must be returned in their original condition with all tags, labels, and packaging intact. The product should be unused and in a resalable condition.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Process</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-6 text-gray-700">
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#2C5F4F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        1
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
                                    <p className="text-sm">Email or call us within 7 days of delivery</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#2C5F4F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        2
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Provide Details</h4>
                                    <p className="text-sm">Share order number and reason for return</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#2C5F4F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        3
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Get Approval</h4>
                                    <p className="text-sm">Wait for return authorization and pickup details</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#2C5F4F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        4
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Ship Product</h4>
                                    <p className="text-sm">Our courier will pick up the product</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes</h3>
                                <ul className="list-disc list-inside space-y-2 pl-4">
                                    <li>Keep the product in its original packaging until pickup</li>
                                    <li>Include all accessories, manuals, and free gifts (if any)</li>
                                    <li>Take photos of the product before shipping (for your records)</li>
                                    <li>Do not write or mark on the original packaging</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Clock className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Refund Process & Timeline</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-700">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-900 mb-3">Refund Timeline</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="text-2xl font-bold text-green-700 min-w-[80px]">2-3 Days</div>
                                        <p className="text-green-800">Quality check after product is received</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="text-2xl font-bold text-green-700 min-w-[80px]">1-2 Days</div>
                                        <p className="text-green-800">Refund initiation</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="text-2xl font-bold text-green-700 min-w-[80px]">5-7 Days</div>
                                        <p className="text-green-800">Refund credit to your account (bank processing time)</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Refund Methods</h3>
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-xl p-5">
                                        <h4 className="font-semibold text-[#2C5F4F] mb-2">Original Payment Method</h4>
                                        <p className="text-sm leading-relaxed">
                                            Refunds are processed to the original payment method used during purchase. For card payments, the amount will be credited to the same card.
                                        </p>
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-5">
                                        <h4 className="font-semibold text-[#2C5F4F] mb-2">Bank Transfer (Alternative)</h4>
                                        <p className="text-sm leading-relaxed">
                                            If the original payment method is no longer available, we can process a bank transfer. Please provide your bank details for the same.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm italic bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <strong>Note:</strong> Shipping charges are non-refundable except in cases where the product received is defective or incorrect.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchange Policy</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                <strong>We currently do not offer direct product exchanges.</strong> If you wish to exchange a product:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 pl-4">
                                <li>Initiate a return for the original product</li>
                                <li>Place a new order for the desired product</li>
                                <li>Your refund will be processed once we receive the returned item</li>
                            </ol>
                            <p className="leading-relaxed">
                                This ensures faster processing and gives you the flexibility to choose any product from our catalog.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged or Defective Products</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                If you receive a damaged or defective product:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Contact us within 48 hours of delivery</li>
                                <li>Provide clear photos of the damaged product and packaging</li>
                                <li>Do not use or open the product (keep seals intact)</li>
                                <li>We will arrange immediate pickup and replacement</li>
                            </ul>
                            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mt-4">
                                <p className="text-green-800 font-semibold">
                                    ✅ For damaged or defective products, we offer a full refund including shipping charges OR a free replacement - your choice!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-2xl shadow-lg p-8 md:p-10 text-white">
                    <h2 className="text-2xl font-bold mb-4">Need Help with Returns or Refunds?</h2>
                    <div className="h-1 w-20 bg-white/50 mb-6"></div>

                    <p className="text-lg leading-relaxed mb-6">
                        Our customer support team is ready to assist you with any return or refund queries.
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
                        <p className="text-sm opacity-90">Support Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundCancellation;
