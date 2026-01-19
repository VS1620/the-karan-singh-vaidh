import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ArrowRight, Lock } from 'lucide-react';

const CheckoutPage = () => {
    const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        user_name: '', // Display name if different? Usually just one name
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India', // Default
    });

    const total = getCartTotal();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            orderItems: cartItems.map(item => ({
                product: item.product,
                name: item.name,
                image: item.image,
                price: item.price,
                qty: item.qty,
                pack: {
                    name: item.pack.name,
                    medicines: item.pack.medicines,
                }
            })),
            shippingAddress: {
                address: form.address,
                city: form.city,
                postalCode: form.postalCode,
                country: form.country,
                phone: form.phone,
                email: form.email,
                name: form.name
            },
            paymentMethod: 'COD',
            itemsPrice: total,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: total,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            await axios.post('http://localhost:5000/api/orders', orderData, config);

            clearCart();
            // Store order details in local storage or something if needed, or query by email later
            alert('Order Placed Successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Error placing order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 font-serif">Checkout</h1>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Address Form */}
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Details</h2>
                        <form id="checkout-form" onSubmit={placeOrderHandler} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input required type="text" name="name" onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input required type="tel" name="phone" onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input required type="email" name="email" onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Address (House No, Street, Area)</label>
                                <textarea required name="address" rows="2" onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input required type="text" name="city" onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                    <input required type="text" name="postalCode" onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="md:w-80">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">Your Order</h3>

                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                                {cartItems.map((item, i) => (
                                    <div key={i} className="flex gap-3 text-sm">
                                        <div className="relative w-12 h-12 flex-shrink-0">
                                            <img src={item.image} alt="" className="w-full h-full object-cover rounded" />
                                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{item.qty}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800 line-clamp-1">{item.name}</div>
                                            <div className="text-gray-500 text-xs">{item.pack.name}</div>
                                        </div>
                                        <div className="font-medium text-gray-900">₹{item.price * item.qty}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6 text-sm space-y-2">
                                <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2 mt-2">
                                    <span>Total Amount</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 mb-6">
                                <h4 className="font-bold text-emerald-800 text-sm mb-2">Payment Method</h4>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    </div>
                                    <span className="text-sm font-medium text-emerald-900">Cash on Delivery (COD)</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className={`w-full bg-emerald-800 text-white py-4 rounded-lg font-bold hover:bg-emerald-900 transition flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Processing...' : 'Place Order'} <Lock size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
