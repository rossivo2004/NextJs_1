require('dotenv').config()
import React from 'react';
import Link from 'next/link'

import OrganicSwiper from '../../components/Swiper/Swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faCheck, faCookie, faMoneyBill, faShare, faTruck, faUserCircle, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import HomeTabActive from '../../components/HomeTabActive/HomeTabActive';
import SwiperImgHomeBanner from '../../components/SwiperImgHomeBanner/SwiperImgHomeBanner';
import SwiperBlogHome from '../../components/SwiperBlogHome/SwiperBlogHome';
import HomeProductSale from '../../components/HomeProductSale/index'
import HomeProductHot from '../../components/HomeProductHot/index'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Description } from '@headlessui/react';


const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL_FE;

export const metadata = {
    title: 'FoodHaven',
    description: 'Food had successfully been processed by the server and will be available soon on the website'
  };

const HomePage = () => {
    console.log(1);
    return (
        <div className='bg-black pt-20'>
            <div className='lg:px-40 px-3 flex justify-between items-center mb-40'>
                <div>
                    <div className='text-primary title_home mb-2'>Its Quick & Amusing!</div>
                    <div className='text-6xl font-bold mb-4'><span className='text-primary'>Th</span>e Art of speed<br /> food Quality</div>
                    <div className='lg:w-[420px] text-base mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue</div>
                    <div>
                        <Link href="/shop" className='bg-primary px-6 py-2 rounded-lg border-2 border-primary hover:bg-transparent hover:text-primary hover:border-primary'>See menu</Link>
                    </div>
                </div>
                <div className='relative lg:block hidden'>
                    <SwiperImgHomeBanner />
                </div>
            </div>

            <div className='mb-20 lg:px-40 px-4 flex gap-10'>
                <div className='lg:w-1/2 w-full'>
                    <div className='text-primary title_home mb-2'>About us</div>
                    <div className='lg:text-4xl text-3xl font-bold mb-4'><span className='text-primary '>We</span> Create the best<br /> foody product</div>
                    <div className='lg:w-[420px] text-sm mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.</div>
                    <div className='mb-4'>
                        <div className='mb-2'><FontAwesomeIcon icon={faCheck} className='mr-4 w-4 h-4' /><span>Lacus nisi, et ac dapibus sit eu velit in consequat.</span></div>
                        <div className='mb-2'><FontAwesomeIcon icon={faCheck} className='mr-4 w-4 h-4' /><span>Quisque diam pellentesque bibendum non dui volutpat fringilla </span></div>
                        <div className='mb-2'><FontAwesomeIcon icon={faCheck} className='mr-4 w-4 h-4' /><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span></div>
                    </div>
                    <div>
                        <button className='bg-primary px-6 py-2 rounded-lg border-2 border-primary hover:bg-transparent hover:text-primary hover:border-primary'>Read More</button>
                    </div>
                </div>
                <div className='flex-1 lg:grid gap-4 grid-rows-2 hidden'>
                    <div className='col-span-2 h-[240px] rounded-lg overflow-hidden'><img src={`${imageURL}/about_1.png`} alt="" className='w-full h-full object-cover' /></div>
                    <div className='h-[180px] rounded-lg overflow-hidden'><img src={`${imageURL}/about_2.png`} alt="" className='w-full h-full object-cover' /></div>
                    <div className='h-[180px] rounded-lg overflow-hidden'><img src={`${imageURL}/about_3.png`} alt="" className='w-full h-full object-cover' /></div>
                </div>
            </div>

            <div className='lg:px-40 px-4 lg:mb-40 mb-20'>
                <div className='text-primary title_home mb-2 text-center'>Food Category</div>
                <div className='lg:text-4xl text-3xl font-bold mb-4 text-center'><span className='text-primary'>Ch</span>oose Food Iteam</div>
                <div>
                    <OrganicSwiper></OrganicSwiper>
                </div>
            </div>

            <div className='lg:px-40 px-4 mb-20 flex lg:flex-row flex-col gap-10'>
                <div className='lg:w-1/2 w-full'>
                    <div className="grid grid-cols-5 grid-rows-8 gap-4 h-[480px]">
                        <div className="bg-red-600 overflow-hidden rounded-lg col-span-3 row-span-3"><img src={`${imageURL}/ab_1.png`} alt="" className='w-full h-full object-cover' /></div>
                        <div className="bg-red-600 overflow-hidden rounded-lg col-span-2 row-span-4 col-start-1 row-start-4"><img src={`${imageURL}/ab_3.png`} alt="" className='w-full h-full object-cover' /></div>
                        <div className="bg-red-600 overflow-hidden rounded-lg col-span-2 row-span-3 col-start-3 row-start-4"><img src={`${imageURL}/ab_4.png`} alt="" className='w-full h-full object-cover' /></div>
                        <div className="bg-red-600 overflow-hidden rounded-lg col-span-2 row-span-2 col-start-4 row-start-2"><img src={`${imageURL}/ab_2.png`} alt="" className='w-full h-full object-cover' /></div>
                        <div className="bg-red-600 overflow-hidden rounded-lg row-span-2 col-start-5 row-start-4"><img src={`${imageURL}/ab_5.png`} alt="" className='w-full h-full object-cover' /></div>
                        <div className="bg-red-600 overflow-hidden rounded-lg row-span-3 col-start-5 row-start-6"><img src={`${imageURL}/ab_6.png`} alt="" className='w-full h-full object-cover' /></div>
                    </div>

                </div>
                <div className='lg:w-1/2 w-full'>
                    <div className='text-primary title_home mb-2'>About us</div>
                    <div className='lg:text-4xl text-3xl font-bold mb-4'><span className='text-primary '>We</span> Create the best<br /> foody product</div>
                    <div className='lg:w-[420px] lg:text-sm text-sm mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.</div>
                    <div className='flex w-[340px] h-[100px] gap-10 mb-14'>
                        <div>
                            <div className='w-[90px] h-[90px] bg-primary rounded-lg flex items-center justify-center mb-2'>
                                <FontAwesomeIcon icon={faBurger} className='text-4xl' />
                            </div>
                            <p className='text-center'>Fast Food</p>
                        </div>
                        <div>
                            <div className='w-[90px] h-[90px] bg-primary rounded-lg flex items-center justify-center mb-2'>
                                <FontAwesomeIcon icon={faCookie} className='text-4xl' />
                            </div>
                            <p className='text-center'>Lunch</p>
                        </div>
                        <div>
                            <div className='w-[90px] h-[90px] bg-primary rounded-lg flex items-center justify-center mb-2'>
                                <FontAwesomeIcon icon={faWineGlass} className='text-4xl' />
                            </div>
                            <p className='text-center'>Dinner</p>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg flex justify-around items-center w-[300px] h-[60px] border-l-8 border-primary'>
                        <div className='text-primary font-bold text-2xl'>30+</div>
                        <div className='text-black'>
                            <div>Year of</div>
                            <div className='font-bold'>Experienced</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mb-20 h-[300px] lg:block hidden home_img_1 bg-cover bg-center relative lg:px-40 px-4'>
                <div className='absolute inset-0 bg-[rgba(13,13,13,0.85)]'></div>
                <div className='relative z-10 flex items-center justify-between h-full'>
                    <div className='flex flex-col items-center justify-center'>
                        <FontAwesomeIcon icon={faUserCircle} className='text-[60px] text-primary mb-2' />
                        <div className='mb-4'>Professional Chefs</div>
                        <div>420</div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <FontAwesomeIcon icon={faUserCircle} className='text-[60px] text-primary mb-2' />
                        <div className='mb-4'>Professional Chefs</div>
                        <div>420</div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <FontAwesomeIcon icon={faUserCircle} className='text-[60px] text-primary mb-2' />
                        <div className='mb-4'>Professional Chefs</div>
                        <div>420</div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <FontAwesomeIcon icon={faUserCircle} className='text-[60px] text-primary mb-2' />
                        <div className='mb-4'>Professional Chefs</div>
                        <div>420</div>
                    </div>
                </div>
            </div>

            <div className='lg:px-40 px-4 mb-20 text-center'>
                <div className='text-primary title_home mb-2 text-center'>Choose & pick</div>
                <div className='lg:text-4xl text-3xl font-bold mb-4 text-center'><span className='text-primary'>Pr</span>oduct Sale</div>
                <div>
                    <HomeProductSale />
                </div>
            </div>
            
            <div className='lg:px-40 px-4 mb-20 text-center'>
                <div className='text-primary title_home mb-2 text-center'>Choose & pick</div>
                <div className='lg:text-4xl text-3xl font-bold mb-4 text-center'><span className='text-primary'>Pr</span>oduct Hot</div>
                <div>
                    <HomeProductHot />
                </div>
            </div>

            <div className='lg:px-40 px-4 mb-20 lg:block hidden'>
                <div className='text-primary title_home mb-2 text-center'>Chefs</div>
                <div className='text-4xl font-bold mb-4 text-center'><span className='text-primary'>Me</span>et Our Chef</div>
                <div className='grid grid-cols-4 gap-10 mb-10'>
                    <div className='w-full h-[360px] relative rounded-lg overflow-hidden'>
                        <img src={`${imageURL}/Rectangle 8863.png`} alt="" className='w-full h-full object-cover rounded-lg' />
                        <div className='absolute bottom-0 left-0 bg-white h-[60px] w-[180px] flex justify-center flex-col pl-4'>
                            <div className='text-black font-bold'>D.Estwood</div>
                            <div className='text-[#333333] text-sm'>Chief Chef</div>
                        </div>
                    </div>
                    <div className='w-full h-[360px] relative rounded-lg overflow-hidden'>
                        <img src={`${imageURL}/Rectangle 8863.png`} alt="" className='w-full h-full object-cover rounded-lg' />
                        <div className='absolute bottom-0 left-0 bg-white h-[60px] w-[180px] flex justify-center flex-col pl-4'>
                            <div className='text-black font-bold'>D.Estwood</div>
                            <div className='text-[#333333] text-sm'>Chief Chef</div>
                        </div>
                    </div>
                    <div className='w-full h-[360px] relative rounded-lg overflow-hidden'>
                        <img src={`${imageURL}/Rectangle 8863.png`} alt="" className='w-full h-full object-cover rounded-lg' />
                        <div className='absolute bottom-0 left-0 bg-white h-[60px] w-[180px] flex justify-center flex-col pl-4'>
                            <div className='text-black font-bold'>D.Estwood</div>
                            <div className='text-[#333333] text-sm'>Chief Chef</div>
                        </div>
                    </div>
                    <div className='w-full h-[360px] relative rounded-lg overflow-hidden'>
                        <img src={`${imageURL}/Rectangle 8863.png`} alt="" className='w-full h-full object-cover rounded-lg' />
                        <div className='absolute bottom-0 left-0 bg-white h-[60px] w-[180px] flex justify-center flex-col pl-4'>
                            <div className='text-black font-bold'>D.Estwood</div>
                            <div className='text-[#333333] text-sm'>Chief Chef</div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <button className='bg-primary px-6 py-2 rounded-lg border-2 border-primary hover:bg-transparent hover:text-primary hover:border-primary'>See more</button>
                </div>
            </div>

            <div className='mb-20 h-[300px] home_img_2 bg-cover bg-center relative lg:px-40 px-4'>
                <div className='relative z-10 flex items-end justify-center h-full flex-col text-right'>
                    <div className='text-primary title_home mb-2 text-center'>Choose & pick</div>
                    <div className='lg:text-4xl text-3xl font-bold mb-4'><span className='text-primary '>We</span> Create the best<br /> foody product</div>
                    <div className='lg:w-[420px] text-sm lg:text-base mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue</div>
                    <div>
                        <button className='bg-primary px-6 py-2 rounded-lg border-2 border-primary hover:bg-transparent hover:text-primary hover:border-primary'>See more</button>

                    </div>
                </div>
            </div>

            <SwiperBlogHome />

        </div>

    );
};

export default HomePage;
