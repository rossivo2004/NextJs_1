'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Loading from '../../../../components/Loading/Loading';
import formatNumber from '../../../../option/op_formatNumber';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

import { getOrder } from '../../../../services/orderService';
import { deleteOrder } from '../../../../services/orderService';
import { updateOrder } from '../../../../services/orderService';

export default function Admin_list_or() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrder();
                setData(response);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

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

    const delete_or = async (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure you want to delete the order ${id}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const response = await axios.delete(`http://localhost:3000/orders/delete/${id}`);
                            if (response.status === 200) {
                                toast.success("Product deleted successfully");
                                setData(data.filter(order => order._id !== id));
                            } else {
                                toast.error("Failed to delete product");
                            }
                        } catch (error) {
                            console.error('Error deleting product:', error);
                            toast.error("Error deleting product");
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const status_change = async (id, event) => {
        const selectedValue = event.target.value;
        setStatus(selectedValue);
    
        try {
            const response = await axios.put(`http://localhost:3000/orders/update/${id}`, { orderStatus: selectedValue });
            if (response.status === 200) {
                toast.success('Status updated successfully!');
    
                setData(data.map(order => 
                    order._id === id ? { ...order, orderStatus: selectedValue } : order
                ));
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error("Error updating order status");
        }
    };
    

    console.log(status);

   
    return (
        <div className="text-black bg-white p-4">
            <div className="flex justify-between items-center w-full mb-2">
                <h1 className="font-bold text-3xl">Order List</h1>
            </div>
            <div>
                <div className="flex flex-col">
                    {loading ? <Loading /> : (
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">ID</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Price</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Status</th>
                                                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                            {data.map((item, i) => (
                                                <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700 py-2 mt-2 h-24" key={i}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{formatNumber(item.totalAmount)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.orderDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                        <div className={`${getStatusColorClass(item.orderStatus)} flex items-center justify-center rounded-md py-1 font-bold text-white`}>
                                                            {item.orderStatus}
                                                        </div>
                                                        <div>
                                                            <select onChange={(event) => status_change(item._id, event)} value={item.orderStatus}>
                                                                <option value="Processing" key="Processing">Processing</option>
                                                                <option value="Fail" key="Fail">Fail</option>
                                                                <option value="Success" key="Success">Success</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        <Popup
                                                            trigger={
                                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
                                                                    <FontAwesomeIcon icon={faCircleInfo} className='text-xl' />
                                                                </button>
                                                            }
                                                            position="left top"
                                                            on="click"
                                                            closeOnDocumentClick
                                                            mouseLeaveDelay={300}
                                                            mouseEnterDelay={0}
                                                            contentStyle={{ padding: '0px', border: 'none' }}
                                                            arrow={false}
                                                        >
                                                            <div className="">
                                                                <Link href={`http://localhost:4000/admin/admin_list_or/${item._id}`} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">View Details</Link>
                                                                <button onClick={() => delete_or(item._id)} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">Delete</button>
                                                            </div>
                                                        </Popup>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
