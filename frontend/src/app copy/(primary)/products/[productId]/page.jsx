"use client";
require('dotenv').config();
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Image } from 'primereact/image';

import TabProductDetail from '../../../../components/TabProductDetail/TabProductDetail';
import BoxProduct from '../../../../components/BoxProduct/BoxProduct';
import Loading from '../../../../components/Loading/Loading';

import { getProductsById } from '../../../../services/productService';
import { incrementProductView } from '../../../../services/productService';
import formatNumber from '../../../../option/op_formatNumber';

const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const tabItems = [
    "Overview",
    "Integration",
    "Billing",
    "Transactions",
    "Plans",
];

const ShopDetail = ({ params }) => {
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productData = await getProductsById(params.productId);
                await incrementProductView(params.productId);
                setProduct(productData);
                document.title = productData.name_pr;
                setError(null);
            } catch (error) {
                console.error('Failed to load: ', error);
                setError('Failed to fetch product details.');
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.productId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }

    return (
        <div>
            <div className='lg:px-40 px-2 bg-white text-black flex flex-col gap-10 py-4 mb-20'>
                <div className="">
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
                            About Us
                        </li>
                    </ol>
                </div>
                <div className='flex lg:flex-row flex-col gap-10 w-full'>
                    <div className='lg:w-1/2 flex gap-4 lg:flex-row flex-col-reverse'>
                        <div className='w-full lg:w-[100px] lg:h-[400px] gap-4 flex lg:flex-col flex-row'>
                            {[1, 2, 3, 4].map((_, index) => (
                                <div key={index} className='w-full h-1/4'>
                                    <img src={`http://localhost:3000/images/${product.image_pr_1}`} alt="" className='h-full w-full object-cover rounded-lg' />
                                </div>
                            ))}
                        </div>
                        <div className='flex-1 relative'>
                            <img preview  src={`http://localhost:3000/images/${product.image_pr_1}`} alt="" className='h-[400px] w-full object-cover rounded-lg' />
                            <div className='flex items-center justify-center absolute top-4 right-4 p-2 bg-white rounded-full hover:text-red-600 cursor-pointer'>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2'>
                        <div>
                            <div className='font-bold text-4xl mb-4'>{product.name_pr}</div>
                            <div className='text-base text-[#4f4f4f] border-b-2 pb-4 mb-4'>{product.description_pr}</div>
                            <div className='text-2xl font-bold mb-2'>{formatNumber(product.price_pr)} <span className='text-lg text-gray-400'>d</span></div>
                            <div className='mb-2'>
                                <div className="grid w-full overflow-x-scroll rounded-lg lg:overflow-visible">
                                    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                                        {product.rating_pr}
                                        <div className="inline-flex items-center">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300 cursor-pointer">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                                            Based on {product.reviewsCount} Reviews
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex border-b-2 pb-4 mb-4'>
                                <div className='mr-2'>
                                    <button onClick={() => { if (quantity > 0) setQuantity(quantity - 1) }} className='h-[43px] px-4 text-primary font-bold rounded-lg border-2 border-primary'>-</button>
                                    <input
                                        type="number"
                                        min={0}
                                        value={quantity}
                                        className='w-20 rounded-lg border-2 border-primary h-[43px] detai_quantity mx-2 text-center'
                                        onWheel={(e) => e.preventDefault()} // Ngăn chặn việc cuộn để thay đổi giá trị
                                        onKeyDown={(e) => e.preventDefault()} // Ngăn chặn việc nhập từ bàn phím
                                    />
                                    <button onClick={() => setQuantity(quantity + 1)} className='h-[43px] px-4 text-primary font-bold rounded-lg border-2 border-primary'>+</button>
                                </div>
                                <div>
                                    <button className='bg-primary text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-primary border-2 border-primary'><FontAwesomeIcon icon={faCartPlus} className='mr-2' /> <span>Add to cart</span></button>
                                </div>
                            </div>
                            <div>
                                Category: <a href={`${URL}/shop/${product.category_pr_tag}`} className='text-primary hover:underline'>{product.category_pr_tag}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <TabProductDetail />
                </div>
                <div>
                    <div className='font-bold text-2xl mb-4'>Similar Products</div>
                    <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-3'>
                        {[1, 2, 3, 4].map((_, index) => (
                            <BoxProduct key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetail;
