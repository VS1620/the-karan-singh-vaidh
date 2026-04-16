import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

// Common Components for initial load
import Home from './pages/Home'; // Home stays for faster LCP

// Lazy Pages
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

// Policy Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const RefundCancellation = lazy(() => import('./pages/RefundCancellation'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Products = lazy(() => import('./pages/admin/Products'));
const ProductForm = lazy(() => import('./pages/admin/ProductForm'));
const Categories = lazy(() => import('./pages/admin/Categories'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Appointments = lazy(() => import('./pages/admin/Appointments'));

const AdminRoute = lazy(() => import('./components/admin/AdminRoute'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <Loader2 size={40} className="text-[#0d2e1b] animate-spin mb-4" />
    <p className="text-gray-400 font-medium">Loading...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />

                {/* Shop - SEO URL */}
                <Route path="/ayurvedic-products" element={<Shop />} />
                {/* Redirect old /shop URL */}
                <Route path="/shop" element={<Navigate to="/ayurvedic-products" replace />} />

                {/* SEO-friendly category routes */}
                <Route path="/ayurvedic-asthma-treatment" element={<Shop defaultCategory="Asthma" />} />
                <Route path="/gallbladder-stone-ayurvedic-treatment" element={<Shop defaultCategory="Gall Bladder" />} />
                <Route path="/ayurvedic-piles-treatment" element={<Shop defaultCategory="Piles" />} />
                <Route path="/ayurvedic-gastric-treatment" element={<Shop defaultCategory="Gastric" />} />
                <Route path="/ayurvedic-diabetes-treatment" element={<Shop defaultCategory="Diabetes" />} />
                <Route path="/ayurvedic-tuberculosis-support" element={<Shop defaultCategory="Tuberculosis (TB)" />} />
                <Route path="/ayurvedic-migraine-treatment" element={<Shop defaultCategory="Migraine" />} />
                <Route path="/ayurvedic-thyroid-treatment" element={<Shop defaultCategory="Thyroid" />} />
                <Route path="/kidney-stone-ayurvedic-treatment" element={<Shop defaultCategory="Kidney Stone" />} />
                <Route path="/ayurvedic-treatment-products" element={<Shop />} />

                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success/:id" element={<OrderSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<MyAccount />} />

                {/* About - SEO URL */}
                <Route path="/about-ayurvedic-doctor-in-solan" element={<AboutUs />} />
                {/* Redirect old /about URL */}
                <Route path="/about" element={<Navigate to="/about-ayurvedic-doctor-in-solan" replace />} />

                <Route path="/contact" element={<ContactUs />} />

                {/* Policy Pages */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/cancellation" element={<RefundCancellation />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="product/new" element={<ProductForm />} />
                    <Route path="product/:id/edit" element={<ProductForm />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="appointments" element={<Appointments />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </MainLayout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
