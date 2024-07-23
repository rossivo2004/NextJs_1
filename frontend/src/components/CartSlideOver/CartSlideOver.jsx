import './CartSlideOver.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import formatNumber from '../../option/op_formatNumber';
import { removeItem, clearCart, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice';

const imageURL = process.env.REACT_APP_IMAGE_URL;
const imageURLBE = process.env.NEXT_PUBLIC_IMAGE_URL_BE;

const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
};

const enableBodyScroll = () => {
    document.body.style.overflow = '';
};

export default function CartSlideOver({ open, setOpen }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [priceSum, setPriceSum] = useState(0);

    useEffect(() => {
        if (open) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }

        return () => enableBodyScroll();
    }, [open]);

    useEffect(() => {
        const sum = cart.items.reduce((total, item) => total + item.price_pr * item.discount_pr * item.quantity, 0);
        setPriceSum(sum);
    }, [cart]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog className="relative z-30" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md z-50">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="flex px-2 py-4 sm:pr-4 items-center justify-between w-full bg-white">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-primary hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-white font-bold"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-10 w-10" aria-hidden="true" />
                                            </button>
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 text-right">
                                                    Giỏ hàng của bạn
                                                </Dialog.Title>
                                            </div>
                                        </div>
                                    </Transition.Child>

                                    <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 pt-0 shadow-xl">
                                        {cart.items.length === 0 ? (
                                            <div className="flex items-center justify-center h-full text-black">
                                                <div className="text-center">
                                                    <p>Giỏ hàng trống.</p>
                                                    <a href="/shop" className="underline text-primary text-xl flex items-center justify-center">
                                                        <p className="px-5 ">Mua sắm ngay</p>
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6 flex-col text-black w-full pb-48">
                                                {cart.items.map((item) => (
                                                    <div key={item._id} className="flex justify-between border-b-2 py-2">
                                                        <img src={`${imageURLBE}/${item.image_pr}`} alt={item.name_pr} className="lg:w-20 w-16 h-16 lg:h-20 object-cover" />
                                                        <div className="flex flex-col justify-between w-[160px] lg:w-[200px]">
                                                            <div className="text-sm h-10 w-[160px] lg:w-[200px]">{item.name_pr}</div>
                                                            <div className="mr-2">
                                                                <button
                                                                    onClick={() => dispatch(decreaseQuantity(item._id))}
                                                                    className="px-2 text-primary font-bold rounded-lg border-2 border-primary"
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    value={item.quantity}
                                                                    className="w-10 rounded-lg border-2 border-primary h-[26px] detai_quantity mx-2 text-center"
                                                                    readOnly
                                                                />
                                                                <button
                                                                    onClick={() => dispatch(increaseQuantity(item._id))}
                                                                    className="px-2 text-primary font-bold rounded-lg border-2 border-primary"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col justify-between items-end">
                                                            <div className="text-primary text-sm">
                                                                {formatNumber(item.price_pr * item.discount_pr * item.quantity)}
                                                                <span> đ</span>
                                                            </div>
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={faTrash}
                                                                    className="hover:text-red-600 cursor-pointer"
                                                                    onClick={() => dispatch(removeItem(item._id))}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-4 fixed bottom-0 h-36 bg-white w-[384px] flex flex-col items-center justify-around">
                                                    <div className='flex items-center justify-between w-full'>
                                                        <div>Tổng</div>
                                                        <div className='font-bold text-2xl text-primary'>{formatNumber(priceSum)} đ</div>
                                                    </div>
                                                    <button onClick={() => dispatch(clearCart())}>Clear</button>
                                                    <button className="bg-primary font-bold text-white w-full px-28 lg:px-36 py-4 lg:py-4 rounded-lg border-2 border-primary hover:bg-white hover:text-primary">
                                                        <a href={'/checkout'}>Thanh toán</a>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
