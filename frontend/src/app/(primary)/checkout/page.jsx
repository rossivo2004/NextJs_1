'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from "../../../services/userService";
import formatNumber from '../../../option/op_formatNumber';
import { createOrder } from "../../../services/orderService";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { clearCart } from "../../../redux/slices/cartSlice";
import axios from "axios";

const imageURLBE = process.env.NEXT_PUBLIC_IMAGE_URL_BE;

function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || { items: [], totalPrice: 0 });
  const [priceSum, setPriceSum] = useState(0);

  useEffect(() => {
    const sum = cart.items.reduce((total, item) => total + item.price_pr * item.discount_pr * item.quantity, 0);
    setPriceSum(sum);
  }, [cart]);

  useEffect(() => {
    const userString = Cookies.get('user');
    const userData = userString ? JSON.parse(userString) : null;
    setUser(userData);

    if (userData) {
      const fetchData = async () => {
        try {
          const data = await getUserDetail(userData.id);
          setUserDetails(data);
        } catch (error) {
          console.error('Failed to load: ', error);
          setError('Failed to fetch user details.');
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        cartItems: cart.items,
        totalAmount: priceSum,
        userId: user.id,
        fullName: userDetails.name_us,
        phoneNumber: userDetails.phone_us,
        address: userDetails.address_us,
        status: 'Processing',
      };

      
      const newOrder = await createOrder(orderData);
      dispatch(clearCart());
      toast.success('Order successfully!');
      router.push('/thank_order');
    } catch (error) {
      console.error('Failed to create order:', error);
      setError('Failed to create order.');
    }
  };

  return (
    <div className='bg-white lg:px-40 mb-40 pb-4'>
      <div className="py-4">
        <ol className="flex items-center whitespace-nowrap">
          <li className="inline-flex items-center">
            <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
              Home
            </a>
            <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="inline-flex items-center text-sm font-semibold text-primary truncate dark:text-neutral-200" aria-current="page">
            Checkout
          </li>
        </ol>
      </div>
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 pr-4 sm:py-12 lg:col-span-6 lg:py-2">
            <div className=" w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Secure Checkout<span className="mt-2 block h-1 w-10 bg-primary sm:w-20" /></h1>
              <form className="mt-10 flex flex-col space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="text-xs font-semibold text-gray-500">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name_us"
                    value={userDetails.name_us || ''}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-300 text-black"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold text-gray-500">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email_us"
                    value={userDetails.email_us || ''}
                    onChange={handleChange}
                    placeholder="Email"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-300 text-black"
                  />
                </div>
                <div>
                  <label htmlFor="phone_us" className="text-xs font-semibold text-gray-500">Phone number</label>
                  <input
                    type="text"
                    id="phone_us"
                    name="phone_us"
                    value={userDetails.phone_us || ''}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-300 text-black"
                  />
                </div>
                <div>
                  <label htmlFor="address_us" className="text-xs font-semibold text-gray-500">Address</label>
                  <input
                    type="text"
                    id="address_us"
                    name="address_us"
                    value={userDetails.address_us || ''}
                    onChange={handleChange}
                    placeholder="Address"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-300 text-black"
                  />
                </div>
                <button 
                  type="submit" 
                  className="mt-4 inline-flex w-full items-center justify-center rounded bg-primary py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-orange-500 sm:text-lg"
                  disabled={cart.items.length === 0}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img src="https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=600" alt className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-orange-300 to-teal-400 opacity-95" />
            </div>
            <div className="relative">
              {isMounted && (cart.items && cart.items.length > 0 ? (
                <ul className="space-y-5">
                  {cart.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <div className="inline-flex">
                        <img src={`${imageURLBE}/${item.image_pr}`} alt={item.name_pr} className="max-h-16" />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">{item.name_pr}</p>
                          <p className="text-sm font-medium text-white text-opacity-80">x{item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">{formatNumber(item.price_pr)} VND</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-white">No items in cart</div>
              ))}
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30" />
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>{formatNumber(priceSum)} VND</span></p>
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="text-sm font-semibold">+01 653 235 211 <span className="font-light">(International)</span></p>
              <p className="mt-1 text-sm font-semibold">support@nanohair.com <span className="font-light">(Email)</span></p>
              <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
            </div>
            <div className="relative mt-10 flex">
              <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
