'use client';
import { useState, useEffect } from "react";
import { getOrderDetail } from "../../../../services/orderService";
import Loading from "../../../../components/Loading/Loading";
import formatNumber from "../../../../option/op_formatNumber";

const imageURLBE = process.env.NEXT_PUBLIC_IMAGE_URL_BE;

function OrderDetailPage({ searchParams }) {
    const id = searchParams.id; // Ensure this is correct based on how you're passing searchParams
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrderDetail(id);
                setData(response);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!data) {
        return <Loading /> 
    }

    console.log(data);

    return (
        <div className="bg-white mb-40">
            <div className='bg-white lg:px-40'>
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
                            Profile
                        </li>
                    </ol>
                </div>
                <section className="pb-16 relative">
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="border border-gray-300 pt-9">
                            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                                <div className="data">
                                    <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #{data._id}</p>
                                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Payment : ${data.orderDate}</p>
                                </div>
                            </div>
                            <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width={1216} height={2} viewBox="0 0 1216 2" fill="none">
                                <path d="M0 1H1216" stroke="#D1D5DB" />
                            </svg>
                            {data.cartItems && data.cartItems.length > 0 ? (
                                data.cartItems.map((item, index) => (
                                    <div key={index} className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                                        <div className="grid grid-cols-4 w-full">
                                            <div className="col-span-4 sm:col-span-1">
                                                <img src={`${imageURLBE}/${item.image_pr}`} alt={item.name_pr} className="max-sm:mx-auto" />
                                            </div>
                                            <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                                <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                                    {item.name_pr}
                                                </h6>
                                                <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: {item.quantity}</span>
                                                    <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price: {formatNumber(item.totalPrice)} VND</p>
                                                </div>
                                            </div>
                                        </div>
                                     
                                    </div>
                                ))
                            ) : (
                                <div>No orders found.</div>
                            )}
                            <svg className="mt-9 w-full" xmlns="http://www.w3.org/2000/svg" width={1216} height={2} viewBox="0 0 1216 2" fill="none">
                                <path d="M0 1H1216" stroke="#D1D5DB" />
                            </svg>
                            <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                                <div className="flex max-sm:flex-col-reverse items-center">
                                    <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
                                        <svg width={40} height={41} viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600" d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259" stroke strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        cancel order
                                    </button>
                                    <div className="flex flex-col justify-center items-start max-sm:items-center px-3">
                                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Status</p>
                                        <p className="font-semibold text-lg leading-8 text-red-500 text-left whitespace-nowrap">{data.orderStatus}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-xl leading-8 text-black max-sm:py-4"> <span className="text-gray-500">Total Price: </span>{formatNumber(data.totalAmount)} VND</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default OrderDetailPage;
