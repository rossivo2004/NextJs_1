require('dotenv').config()
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { Description } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';

import './globals.scss'
import { GlobalProvider } from "./GlobalProvider"
// import Providers from '../redux/Provider'


const imageURL = process.env.REACT_APP_IMAGE_URL;

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'FoodHeaven',
    description: 'Shop fodd'
}



export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <link rel="icon" href={`${imageURL}/favicon.ico`} />
            <GlobalProvider>
                    <body className={inter.className}>
                        <div><Toaster /></div>
                        <main className=''>{children}</main>
                    </body>
            </GlobalProvider>
        </html>
    )
}
