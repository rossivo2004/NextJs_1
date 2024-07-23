import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        throw new Error;
    }
};

const initialState = loadState() || {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice += newItem.price_pr * newItem.quantity;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price_pr * newItem.quantity,
                });
            }

            state.totalQuantity += newItem.quantity;
            state.totalPrice += newItem.price_pr * newItem.quantity;
            saveState(state);
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item._id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                state.items = state.items.filter(item => item._id !== id);
                saveState(state);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            saveState(state);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item._id === id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price_pr;
                state.totalQuantity++;
                state.totalPrice += existingItem.price_pr;
                saveState(state);
            }
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item._id === id);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price_pr;
                state.totalQuantity--;
                state.totalPrice -= existingItem.price_pr;
                saveState(state);
            }
        }
    },
});

export const { addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
