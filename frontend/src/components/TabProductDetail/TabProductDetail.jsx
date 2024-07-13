"use client";
require('dotenv').config()

import * as Tabs from "@radix-ui/react-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const imageURL = process.env.REACT_APP_IMAGE_URL;


const tabItems = [
    "Description",
    "Reviews (24)",
];

const tabContent = {
    "Description": (
        <div>
            <h2 className="text-lg font-bold mb-4">Description</h2>
            <div className="mb-4">
                <p className="text-sm leading-normal">
                    This is the <b>Description</b> tab content.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-md font-semibold mb-2">Section 1</h3>
                    <p className="text-sm leading-normal">Details section 1...</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-md font-semibold mb-2">Section 2</h3>
                    <p className="text-sm leading-normal">Details section 2...</p>
                </div>
            </div>
        </div>
    ),
    "Reviews (24)": (
        <div>
            <h2 className="text-lg font-bold mb-4">Reviews (24)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-md font-semibold mb-4">Reviews (24) 1</h3>
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-2 flex items-center">
                            <img src={`${imageURL}/images/sp_1.png`} alt="" className="w-14 h-14 object-cover rounded-full mr-4" />
                            <div>Duy Vox</div>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                        </div>
                        <p className="mt-2">This rating component is part of a larger, open-source library of Tailwind CSS components. Learn
                            more by going to the official <a className="text-blue-600 hover:underline" href="#" target="_blank">Flowbite
                                Documentation</a>.
                        </p>
                        <div className="flex justify-end text-sm text-text_1">
                            <p className="mr-4">10:10:59</p>
                            <p>20/02/2024</p>
                        </div>
                    </div>


                </div>
                <div className="bg-white p-4 rounded shadow">
                    <div className="hidden">
                        <h3 className="text-md font-semibold mb-2">Bạn cần đăng nhập để bình luận</h3>
                        <a href="" className="text-sm leading-normal text-primary hover:underline">Đăng nhập ngay !!!</a>

                    </div>
                    <div>
                        <form>
                            <div className="mb-4">
                                <label className="mb-4 font-bold">Đánh giá</label>
                                <div><div className="flex flex-row-reverse justify-end">
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-100 peer peer-hover:text-yellow-500 hover:text-yellow-500 w-5 h-5 mx-1 text-base" />
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-100 peer peer-hover:text-yellow-500 hover:text-yellow-500 w-5 h-5 mx-1 text-base" />
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-100 peer peer-hover:text-yellow-500 hover:text-yellow-500 w-5 h-5 mx-1 text-base" />
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-100 peer peer-hover:text-yellow-500 hover:text-yellow-500 w-5 h-5 mx-1 text-base" />
                                    <FontAwesomeIcon icon={faStar} className="text-yellow-100 peer peer-hover:text-yellow-500 hover:text-yellow-500 w-5 h-5 mx-1 text-base" />

                                </div>
                                </div>
                            </div>
                            <div>
                                <label className="mb-4 font-bold">Bình luận</label><br />
                                <textarea cols="30" rows="4" className="w-full rounded-lg border-2 border-primary"></textarea>
                            </div>
                            <div className="text-right">
                                <button className="px-8 py-2 rounded-lg bg-primary text-white border-2 border-primary hover:text-primary hover:bg-white">Gửi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ),
};

export default function TabProductDetail() {
    return (
        <Tabs.Root
            className="max-w-screen-xl mx-auto px-4 md:px-8"
            defaultValue="Description"
        >
            <Tabs.List
                className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
                aria-label="Manage your account"
            >
                {tabItems.map((item, idx) => (
                    <Tabs.Trigger
                        key={idx}
                        className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-primary data-[state=active]:text-primary"
                        value={item}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
                            {item}
                        </div>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
            {tabItems.map((item, idx) => (
                <Tabs.Content key={idx} className="py-6" value={item}>
                    {tabContent[item]}
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
}
