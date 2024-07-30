'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie';
import PopUp from '../../components/PopUp';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';

const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL_FE;

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  const menuItems = [
    { href: '/admin', title: 'Dashboard' },
    { href: '/admin/admin_list_pr', title: 'Products' },
    { href: '/admin/admin_list_ct', title: 'Categories' },
    { href: '/admin/admin_list_or', title: 'Orders' },
    { href: '/admin/admin_list_us', title: 'Users' },
  ];

  useEffect(() => {
    const userString = Cookies.get('user');
    const userData = userString ? JSON.parse(userString) : null;
    setUser(userData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`bg-white shadow-lg w-full h-16 flex justify-between lg:justify-end items-center p-4 md:p-0 ${sidebarOpen ? 'md:z-10' : 'z-20'}`}>
        <button 
          className="md:hidden" 
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex justify-center items-center font-semibold uppercase md:ml-4 lg:px-4 text-black">
          <PopUp >{user?.name || ''}</PopUp>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className={`bg-blue-950 w-full md:w-60 fixed top-0 left-0 h-full transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
          <div className="w-full h-16 flex items-center justify-between px-4">
            <div>
              <img src={`${imageURL}/FoodHaven.png`} alt="Food Haven Logo" className="h-16 object-cover w-full"/>
            </div>
            <button 
              className="md:hidden text-white"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="px-4">
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className='my-2' key={title}>
                  <Link href={href}>
                    <div
                      className={`flex p-2 rounded cursor-pointer ${pathname === href ? 'bg-active_admin_nav' : 'hover:bg-hover_admin_nav'}`}
                    >
                      {title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={`flex-1 p-4 ${sidebarOpen ? 'ml-0' : 'lg:ml-60'} transition-all duration-300 bg-[#f2f3f6]`}>
          {children}
        </main>
      </div>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}
    </div>
  );
}
