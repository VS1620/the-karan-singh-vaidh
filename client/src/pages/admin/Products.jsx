import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/api/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/api/products/${id}`);
                fetchProducts();
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    const createProductHandler = async () => {
        navigate('/admin/product/new');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                <button
                    onClick={createProductHandler}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <Plus size={20} />
                    Create Product
                </button>
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
                                <th className="p-4 font-medium">Image</th>
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                        />
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                    <td className="p-4 text-emerald-600 font-bold">₹{product.price}</td>
                                    <td className="p-4 text-gray-500">{product.category ? product.category.name : '-'}</td>
                                    <td className="p-4 flex gap-3">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-500 hover:text-blue-700">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
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

export default Products;
