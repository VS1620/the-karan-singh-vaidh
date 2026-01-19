import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, ListOrdered, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b flex items-center justify-center">
                    <h1 className="text-xl font-bold text-emerald-800">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        <ShoppingBag size={20} />
                        <span>Products</span>
                    </Link>
                    <Link to="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        <Package size={20} />
                        <span>Categories</span>
                    </Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        <ListOrdered size={20} />
                        <span>Orders</span>
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
