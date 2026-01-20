import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/api/dashboard/stats');
                setStats(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-6">Loading dashboard...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
                    <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
                </div>
            </div>
            {/* Recent Orders Placeholder */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                <p className="text-gray-500">
                    {stats.totalOrders > 0 ? `You have ${stats.totalOrders} total orders in the system.` : 'No recent activity.'}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
