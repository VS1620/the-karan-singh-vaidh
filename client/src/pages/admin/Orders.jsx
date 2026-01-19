import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/orders', config);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Order ID</th>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Total</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-800 text-sm">{order._id}</td>
                                    <td className="p-4 font-medium text-gray-800">{order.user ? order.user.name : 'Guest'}</td>
                                    <td className="p-4 text-gray-500">{order.createdAt.substring(0, 10)}</td>
                                    <td className="p-4 text-emerald-600 font-bold">₹{order.totalPrice}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium 
                                            ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-700'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-900 font-medium">
                                            {order.orderItems.map(item => (
                                                <div key={item._id} className="mb-1">
                                                    {item.name} <span className="text-emerald-600 text-xs">({item.pack?.name || 'Standard'})</span>
                                                    <span className="text-gray-500 text-xs"> x{item.qty}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {/* Future: Link to Order Details */}
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;
