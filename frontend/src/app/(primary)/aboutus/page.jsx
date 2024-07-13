"use client";
require('dotenv').config()
import { useEffect } from 'react';
import Link from 'next/link'

import { faGraduationCap, faMugSaucer, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const imageURL = process.env.REACT_APP_IMAGE_URL;

function AboutUs() {
    useEffect(() => {
        document.title = "FoodHaven About Us";
      }, []);
    return (
        <div>
            <div className=' bg-white text-black flex flex-col gap-10 py-4 mb-20'>
                <div className="lg:px-40">
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

                <div className="flex gap-10 lg:px-40 mb-20">
                    <div className="w-1/2">
                        <div className="grid grid-cols-2 grid-rows-12 gap-4 h-[520px]">
                            <div className="row-span-9 bg-purple-400 rounded-lg overflow-hidden">
                                <img src={`${imageURL}/abp_1.png`} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="row-span-5 col-start-2 row-start-2 bg-purple-400 rounded-lg overflow-hidden">
                                <img src={`${imageURL}/pab_2.png`} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="row-span-6 col-start-2 row-start-7 bg-purple-400 rounded-lg overflow-hidden">
                                <img src={`${imageURL}/pab_3.png`} alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className='text-primary title_home mb-2'>About us</div>
                        <div className='text-4xl font-bold mb-4'><span className='text-primary '>We</span> Create the best<br /> foody product</div>
                        <div className='w-[420px] text-sm mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.</div>
                    </div>
                </div>

                <div>
                    <div className='text-primary title_home mb-2 text-center'>Food Category</div>
                    <div className='text-4xl font-bold mb-6 text-center'><span className='text-primary'>Wh</span>y Choose us</div>
                    <div className="mb-8 h-[300px] aboutus_img_2 bg-cover bg-center relative "></div>
                </div>

                <div className="lg:px-40 flex gap-16 mb-20">
                    <div className="w-1/3 flex flex-col items-center">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-[60px] mb-4" />
                        <div className="font-bold">Best Chef</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat</div>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <FontAwesomeIcon icon={faMugSaucer} className="text-[60px] mb-4" />
                        <div className="font-bold">120 Item food</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat</div>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <FontAwesomeIcon icon={faPerson} className="text-[60px] mb-4" />
                        <div className="font-bold">Clean Environment</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat</div>
                    </div>
                </div>

                <div className="h-[280px]  w-full relative text-white mb-[300px]">
                    <div className="ab_ov_1 w-full h-full absolute top-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold">Team Member</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue</div>
                    </div>
                    <img src={`${imageURL}/pab_5.png`} alt="" className="h-full object-cover w-full" />
                    <div className="flex gap-10 lg:px-40 absolute top-52 w-full text-black">
                        <div className="w-1/4 text-center">
                            <img src={`${imageURL}/blog_1.png`} alt="" />
                            <div className="font-bold my-4">Mark Henry</div>
                            <div className="text-sm">Owner</div>
                        </div>
                        <div className="w-1/4 text-center">
                            <img src={`${imageURL}/blog_1.png`} alt="" />
                            <div className="font-bold my-4">Mark Henry</div>
                            <div className="text-sm">Owner</div>
                        </div>
                        <div className="w-1/4 text-center">
                            <img src={`${imageURL}/blog_1.png`} alt="" />
                            <div className="font-bold my-4">Mark Henry</div>
                            <div className="text-sm">Owner</div>
                        </div>
                        <div className="w-1/4 text-center">
                            <img src={`${imageURL}/blog_1.png`} alt="" />
                            <div className="font-bold my-4">Mark Henry</div>
                            <div className="text-sm">Owner</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutUs;