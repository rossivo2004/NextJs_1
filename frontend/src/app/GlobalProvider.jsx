'use client'

import { AuthProvider } from "../context/AuthContext";
import { Provider } from "react-redux";
import { store } from '../redux/store.js'

export function GlobalProvider({ children }) {
    return (
        <AuthProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </AuthProvider>
    )
}