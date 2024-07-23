'use client';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import 'react-tabs/style/react-tabs.css';
import { getUserDetail, editUser } from '../../services/userService';
import { getByIdUserOrder } from '../../services/orderService';
import toast from 'react-hot-toast';
import formatNumber from '../../option/op_formatNumber';

function TabPageProfile() {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [error, setError] = useState('');
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const userString = Cookies.get('user');
        const userData = userString ? JSON.parse(userString) : null;
        setUser(userData);

        if (userData) {
            const fetchUserData = async () => {
                try {
                    const data = await getUserDetail(userData.id);
                    setUserDetails(data);
                } catch (error) {
                    console.error('Failed to load user details: ', error);
                    setError('Failed to fetch user details.');
                }
            };

            fetchUserData();
        }
    }, []);

    useEffect(() => {
        const userString = Cookies.get('user');
        const userData = userString ? JSON.parse(userString) : null;

        if (userData) {
            const fetchOrderData = async () => {
                try {
                    const data = await getByIdUserOrder(userData.id);
                    setOrder(data);
                } catch (error) {
                    console.error('Failed to load orders: ', error);
                    setError('Failed to fetch orders.');
                }
            };

            fetchOrderData();
        }
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
            const updatedUser = await editUser(user.id, userDetails);
            setUserDetails(updatedUser);
            toast.success('Profile updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Failed to update user: ', error);
            setError('Failed to update user.');
        }
    };

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Processing':
                return 'bg-yellow-200';
            case 'Fail':
                return 'bg-red-300';
            case 'Success':
                return 'bg-green-200';
            default:
                return 'bg-gray-200';
        }
    };

    return (
        <Tabs className="text-black">
            <TabList>
                <Tab>Information</Tab>
                <Tab>Order</Tab>
            </TabList>

            <TabPanel>
                <div>
                    <div className="font-bold text-2xl">
                        Welcome {userDetails?.name_us || 'Loading...'}
                    </div>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm sm:max-w-md">
                                                <input
                                                    id="username"
                                                    name="user_name_us"
                                                    type="text"
                                                    value={userDetails?.user_name_us || ''}
                                                    placeholder="janesmith"
                                                    autoComplete="username"
                                                    className="block px-2 flex-1 border-0 bg-transparent py-1.5 pl-1 ring-1 ring-inset ring-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name_us" className="block text-sm font-medium leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name_us"
                                                name="name_us"
                                                type="text"
                                                value={userDetails?.name_us || ''}
                                                autoComplete="given-name"
                                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="email_us" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email_us"
                                                name="email_us"
                                                type="email"
                                                value={userDetails?.email_us || ''}
                                                autoComplete="email"
                                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="phone_us" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone_us"
                                                name="phone_us"
                                                type="text"
                                                value={userDetails?.phone_us || ''}
                                                autoComplete="phone"
                                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="address_us" className="block text-sm font-medium leading-6 text-gray-900">
                                            Address
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="address_us"
                                                name="address_us"
                                                autoComplete="address"
                                                value={userDetails?.address_us || ''}
                                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </TabPanel>
            <TabPanel>
                <div className='h-[400px]'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.length > 0 ? (
                                    order.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item._id}
                                            </th>
                                            <td className="px-6 py-4">{formatNumber(item.totalAmount)} VND</td>
                                            <td className="px-6 py-4">{item.orderDate}</td>
                                            <td className={`px-6 py-4  `}>
                                                <div className={`${getStatusColorClass(item.orderStatus)} flex items-center justify-center rounded-md py-1 font-bold text-white`}>
                                                    {item.orderStatus}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                            <a href={`/order?id=${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400" colSpan="5">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </TabPanel>
        </Tabs>
    );
}

export default TabPageProfile;
