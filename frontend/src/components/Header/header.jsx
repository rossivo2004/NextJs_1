"use client";
require('dotenv').config()

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { Avatar, Dropdown } from "flowbite-react";
import { useSelector, useDispatch } from 'react-redux';

import CartSlideOver from '../CartSlideOver/CartSlideOver';
import NavMenuMobile from '../NavMenuMobile/NavMenuMobile';
import SearchHeader from '../SearchHeader/SearchHeader';

const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL_FE;

function Header() {
    const [user, setUser] = useState(null);
    const pathname = usePathname();
    const [cartOpen, setCartOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const userString = Cookies.get('user');
        const userData = userString ? JSON.parse(userString) : null;
        setUser(userData);

        setIsMounted(true);
    }, []);


    const handleToggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const logout = () => {
        Cookies.remove('user');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setUser(null);
        window.location.reload();
    }


    return (
        <header className='lg:mb-2 z-20 fixed top-0 bg-black w-full'>
            <CartSlideOver open={cartOpen} setOpen={setCartOpen} />
            <NavMenuMobile open={navOpen} setOpen={setNavOpen} />

            <div className='flex px-40 w-full h-[80px] items-center justify-between z-20 relative'>
                <div className='flex items-center bg-black lg:relative fixed top-0 left-0 lg:w-auto w-full lg:h-auto h-[60px] lg:px-0 px-4'>

                    <div className='block lg:hidden' onClick={() => setNavOpen(true)}>
                        <FontAwesomeIcon icon={faBars} className='text-[20px]' />
                    </div>

                    <div className='logo w-full flex items-center justify-center h-10'>
                        <img src={`${imageURL}/FoodHaven.png`} alt="Logo" className='lg:w-52 lg:h-20 w-20 object-cover' />
                    </div>

                    <div className='lg:hidden block'>
                        <div>
                            <FontAwesomeIcon icon={faCartShopping} className='text-white text-[20px] lg:mx-2' onClick={() => setCartOpen(true)} />
                        </div>
                    </div>
                </div>
                <div className='lg:flex hidden items-center'>
                    <nav>
                        <ul className='flex items-center h-[60px] font-bold'>
                            <li className='pr-3 hover:text-orange-300 relative text-white'><Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link></li>
                            <li className='px-3 hover:text-orange-300 relative text-white'><Link className={`link ${pathname === '/shop' ? 'active' : ''}`} href="/shop">Shop</Link></li>
                            <li className='px-3 hover:text-orange-300 relative text-white'><Link className={`link ${pathname === '/aboutus' ? 'active' : ''}`} href="/aboutus">About Us</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className='lg:flex hidden items-center'>
                    <SearchHeader />

                    <div className='mx-2'>
                        {user ? (
                            <Dropdown
                                label={<Avatar alt="User settings" img={`http://localhost:3000/images/${user.image_us}`} rounded className='bg-white rounded-full' />}
                                arrowIcon={false}
                                inline
                                placement='bottom-end'
                                className='w-40'
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">Wellcome</span>
                                    <span className="block truncate text-sm font-semibold">{user.name}</span>
                                </Dropdown.Header>
                                <Dropdown.Item className='hover:bg-gray-100'><a href="/profile">Dashboard</a></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className='hover:bg-gray-100' onClick={logout}>Sign out</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <Link className='' href="/login">
                                <div>
                                    <FontAwesomeIcon icon={faUser} className='text-white hover:text-orange-300 h-5 w-5 mx-2' />
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className='relative h-5'>
                        <FontAwesomeIcon icon={faCartShopping} className='text-white relative cursor-pointer hover:text-orange-300 h-6 w-6 mx-2' onClick={() => setCartOpen(true)} />
                        {isMounted && (
                            <div className='text-white absolute right-0 bg-black h-4 w-4 rounded-full flex items-center justify-center border border-white text-xs -bottom-2'>
                                {cart.totalQuantity}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
