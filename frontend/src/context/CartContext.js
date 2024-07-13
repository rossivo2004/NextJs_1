'use client'
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const router = useRouter();
    const [cart, setCart] = useState({ cartItems: [] });

    useEffect(() => {
        setCartToState();
    }, []);

    const setCartToState = () => {
        const storedCart = localStorage.getItem('cart');
        setCart(storedCart ? JSON.parse(storedCart) : { cartItems: [] });
    };

    const addItemToCart = ({
        product,
        name,
        price,
        image,
        stock,
        seller,
        quantity = 1,
        newQuantity = null, // Add newQuantity parameter
    }) => {
        const item = { product, name, price, image, stock, seller, quantity };
        const existingItemIndex = cart.cartItems.findIndex(
            (i) => i.product === item.product
        );
    
        let newCartItems;
        if (existingItemIndex !== -1) {
            newCartItems = cart.cartItems.map((i, index) =>
                index === existingItemIndex
                    ? { ...i, quantity: newQuantity !== null ? newQuantity : i.quantity + 1 }
                    : i
            );
        } else {
            newCartItems = [...cart.cartItems, item];
        }
    
        localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }));
        setCart({ cartItems: newCartItems });
    };
    

    const deleteItemCart = (id) => {
        const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

        localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }));
        setCart({ cartItems: newCartItems });
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart, deleteItemCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
