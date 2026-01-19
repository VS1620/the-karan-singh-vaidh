import React from 'react';
import { User, Package, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyAccount = () => {
    return (
        <div className="min-h-screen bg-ayur-beige/10 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-serif text-ayur-green mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sidebar */}
                    <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div className="w-12 h-12 bg-ayur-green/10 rounded-full flex items-center justify-center text-ayur-green">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Vikas User</h3>
                                <p className="text-sm text-gray-500">vikas@example.com</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-ayur-green/5 text-ayur-green rounded-lg font-medium">
                                <User size={18} /> Profile
                            </a>
                            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Package size={18} /> Orders
                            </a>
                            <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg mt-4">
                                <LogOut size={18} /> Logout
                            </Link>
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium text-gray-900 mb-4">Recent Orders</h3>
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <Package size={48} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-500">No orders yet.</p>
                                <Link to="/" className="text-ayur-green font-medium hover:underline mt-2 inline-block">Start Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
