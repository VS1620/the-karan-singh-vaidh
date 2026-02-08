import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, ListOrdered, LogOut, Bell, Search, User, Menu, X, Calendar } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

// Helper component for Shield icon
function ShieldCheck({ size }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

const AdminLayout = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(window.innerWidth >= 1024);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Also close sidebar on navigation in mobile
    React.useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname]);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { id: 'products', label: 'Products', icon: ShoppingBag, path: '/admin/products' },
        { id: 'categories', label: 'Categories', icon: Package, path: '/admin/categories' },
        { id: 'orders', label: 'Orders', icon: ListOrdered, path: '/admin/orders' },
        { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/admin/appointments' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#F8F9FA] font-sans selection:bg-ayur-green/10 selection:text-ayur-green">
            {/* Sidebar with Glassmorphism */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-8 flex items-center gap-3">
                        <div className="w-10 h-10 bg-ayur-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-ayur-green/20">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-serif font-bold text-ayur-green leading-none">Vaidh Portal</span>
                            <span className="text-[10px] text-ayur-gold font-bold uppercase tracking-widest mt-1">Admin Central</span>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                        <div className="px-4 mb-4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-2">Main Navigation</span>
                        </div>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`group flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${isActive
                                        ? 'bg-ayur-green text-white shadow-xl shadow-ayur-green/20'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-ayur-green'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        <span>{item.label}</span>
                                    </div>
                                    {isActive && <div className="w-1.5 h-1.5 bg-ayur-gold rounded-full shadow-sm animate-pulse"></div>}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-6 mt-auto">
                        <div className="bg-ayur-beige/10 rounded-3xl p-5 border border-ayur-beige/20 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xs font-bold text-ayur-green uppercase tracking-wider mb-2">Need Assistance?</h4>
                                <p className="text-[10px] text-gray-500 font-medium mb-3">Direct line to developer support</p>
                                <button className="w-full py-2 bg-white text-ayur-green text-[10px] font-bold rounded-xl border border-ayur-beige/30 shadow-sm hover:bg-ayur-green hover:text-white transition-all">
                                    Contact Support
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-ayur-gold/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="mt-6 flex items-center justify-center w-full gap-3 px-4 py-3 text-red-500 font-bold text-sm rounded-2xl hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 bg-ayur-green text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white active:scale-90 transition-transform"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Header and Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Modern Admin Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ayur-green transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search analytics, orders, products..."
                                className="w-full bg-gray-50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-ayur-green/20 placeholder:text-gray-400 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 ml-6">
                        <div className="hidden sm:flex flex-col items-end text-right">
                            <span className="text-sm font-bold text-gray-900 leading-none">{userInfo?.name || 'Administrator'}</span>
                            <span className="text-[10px] text-ayur-green font-bold uppercase tracking-widest mt-1">Master Access</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-ayur-beige/20 rounded-2xl flex items-center justify-center text-ayur-green relative cursor-pointer hover:bg-ayur-beige/40 transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div className="w-10 h-10 bg-ayur-green rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer">
                                {userInfo?.name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
