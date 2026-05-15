import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            return [];
        }
    });

    // Save cart to local storage whenever it changes
    // We don't need the first mount effect anymore

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, selectedPack, qty = 1) => {
        setCartItems((prevItems) => {
            // Check if item with same product ID AND same pack name exists
            const existItem = prevItems.find((x) => x.product === product._id && x.pack?.name === selectedPack?.name);

            if (existItem) {
                // Update quantity
                return prevItems.map((x) =>
                    x.product === product._id && x.pack?.name === selectedPack?.name
                        ? { ...x, qty: x.qty + qty } // Just add qty, or replace? Usually add.
                        : x
                );
            } else {
                return [...prevItems, {
                    product: product._id,
                    name: product.name,
                    image: product.image,
                    price: selectedPack.sellingPrice, // Use pack price
                    pack: selectedPack,
                    qty
                }];
            }
        });
    };

    const removeFromCart = (productId, packName) => {
        setCartItems((prevItems) => prevItems.filter((x) => !(x.product === productId && x.pack?.name === packName)));
    };

    const updateQty = (productId, packName, qty) => {
        setCartItems((prevItems) =>
            prevItems.map(x => (x.product === productId && x.pack?.name === packName) ? { ...x, qty: Number(qty) } : x)
        );
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
