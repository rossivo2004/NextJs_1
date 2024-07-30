'use client'

import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../../../../components/Loading/Loading';
import formatNumber from '../../../../../option/op_formatNumber';

import { getOrderDetail } from '../../../../../services/orderService';

const imageURL_BE = process.env.NEXT_PUBLIC_IMAGE_URL_BE;


function Admin_detail_order(prams) {
    const id = prams.params.slug;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrderDetail(id);
                setData(response);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
            setLoading(false);
        }
        fetchData();
    }, [id])

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

    console.log(data);
    return (
        <div className="text-black bg-white p-4">
            {loading ? <Loading /> : (
                <div>
                    <div className=" w-full mb-2">
                        <h1 className="font-bold text-3xl mb-2">Order id: #{data._id}</h1>
                        <div className='mb-2'>Order date: {data.orderDate}</div>
                        <div className='flex items-center'>Order status:  <div className={`${getStatusColorClass(data.orderStatus)} flex ml-2 w-32 items-center justify-center rounded-md py-1 font-bold text-white`}>
                            {data.orderStatus}
                        </div></div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">ID</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Image</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Price</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                                {data.cartItems.map((item, i) => (
                                                    <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700 py-2 mt-2 h-24" key={i}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.productId}</td>
                                                        <td className=" whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                            <img className='w-20 h-20 object-cover' src={`${imageURL_BE}/${item.productImage}`} alt="" />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.productName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{formatNumber(item.productPrice)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.quantity}</td>

                                                    </tr>
                                                ))}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Admin_detail_order;