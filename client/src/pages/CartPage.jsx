import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Phone } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { getAssetUrl } from '../api/api';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQty, getCartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    const total = getCartTotal();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added any packs yet.</p>
                <Link to="/shop" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 font-serif">Your Cart ({cartItems.length} items)</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                                <img src={getAssetUrl(item.image)} alt={item.name} className="w-20 h-20 object-cover rounded-md" />

                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-emerald-600 font-medium">{item.pack.name}</p>
                                    <div className="text-xs text-gray-400 mt-1">MRP: ₹{item.pack.mrp}</div>
                                </div>

                                <div className="flex flex-col items-end gap-2 text-right">
                                    <div className="font-bold text-lg text-gray-900">₹{item.price * item.qty}</div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center border rounded">
                                            <button
                                                className="px-2 py-0.5 hover:bg-gray-100 text-gray-600"
                                                onClick={() => updateQty(item.product, item.pack.name, Math.max(1, item.qty - 1))}
                                            >-</button>
                                            <span className="px-2 text-sm font-medium">{item.qty}</span>
                                            <button
                                                className="px-2 py-0.5 hover:bg-gray-100 text-gray-600"
                                                onClick={() => updateQty(item.product, item.pack.name, item.qty + 1)}
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product, item.pack.name)}
                                            className="text-red-400 hover:text-red-600 p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="md:w-80">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">Order Summary</h3>

                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-emerald-700 text-white py-3 rounded-lg font-bold hover:bg-emerald-800 transition flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Premium Support Banner */}
                <div className="mt-12 bg-[#2D5A41] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>

                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                                <div className="w-1.5 h-1.5 bg-ayur-gold rounded-full animate-pulse"></div>
                                Expert Consultation Available
                            </div>
                            <div className="mb-6">
                                <span className="block text-2xl md:text-5xl font-serif font-bold text-white mb-2 leading-none">Need help with your</span>
                                <span className="text-4xl md:text-7xl font-serif font-bold text-ayur-gold relative inline-block leading-none">
                                    Order?
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-ayur-gold/30 rounded-full"></div>
                                </span>
                            </div>
                            <p className="text-white/80 text-sm md:text-lg font-medium max-w-xl leading-relaxed">
                                Our wellness experts are just a call away. Get personalized guidance and place your order directly.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <a
                                href="tel:+918894772187"
                                className="w-28 h-28 md:w-36 md:h-36 bg-[#FDFCFB] rounded-full flex items-center justify-center text-[#2D5A41] shadow-2xl hover:scale-105 transition-all duration-500 relative group/btn"
                            >
                                <div className="absolute inset-0 bg-white rounded-full transition-transform group-hover/btn:scale-110"></div>
                                <Phone size={48} className="relative z-10" />
                                <div className="absolute -inset-3 border border-white/20 rounded-full animate-pulse"></div>
                            </a>
                            <div className="mt-8 text-center">
                                <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Tap to Connect</div>
                                <div className="text-2xl font-bold tracking-wider text-white">+91 88947 72187</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
