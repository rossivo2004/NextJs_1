"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

function SwiperBlogHome() {
    return (
        <div className='lg:px-40 px-4 mb-20'>
            <div className='text-primary title_home mb-2 text-center'>Blog Post</div>
            <div className='lg:text-4xl text-3xl font-bold mb-4 text-center'>
                <span className='text-primary'>La</span>test News & Blog
            </div>
            <div className='hidden lg:grid grid-cols-3 gap-2 lg:gap-10 mb-10'>
                <div className='w-full lg:h-[480px] relative rounded-lg overflow-hidden border border-gray-300'>
                    <img src="http://localhost:3000/images/blog_1.png" alt="" className='w-full h-[295px] object-cover' />
                    <div className='px-6 py-4'>
                        <div className='text-primary text-base mb-4'>10 February 2022 </div>
                        <div className='font-bold mb-4 lg:text-lg text-base'>Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis</div>
                        <div className='flex justify-between'>
                            <a href='' className='hover:underline'>Learn More</a>
                            <div>
                                <FontAwesomeIcon icon={faShare} className='hover:text-primary cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:h-[480px] relative rounded-lg overflow-hidden border border-gray-300'>
                    <img src="http://localhost:3000/images/blog_1.png" alt="" className='w-full h-[295px] object-cover' />
                    <div className='px-6 py-4'>
                        <div className='text-primary text-base mb-4'>10 February 2022 </div>
                        <div className='font-bold mb-4 lg:text-lg text-base'>Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis</div>
                        <div className='flex justify-between'>
                            <a href='' className='hover:underline'>Learn More</a>
                            <div>
                                <FontAwesomeIcon icon={faShare} className='hover:text-primary cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:h-[480px] relative rounded-lg overflow-hidden border border-gray-300'>
                    <img src="http://localhost:3000/images/blog_1.png" alt="" className='w-full h-[295px] object-cover' />
                    <div className='px-6 py-4'>
                        <div className='text-primary text-base mb-4'>10 February 2022 </div>
                        <div className='font-bold mb-4 lg:text-lg text-base'>Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis</div>
                        <div className='flex justify-between'>
                            <a href='' className='hover:underline'>Learn More</a>
                            <div>
                                <FontAwesomeIcon icon={faShare} className='hover:text-primary cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:hidden mb-10'>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                >
                    <SwiperSlide>
                        <div className='w-full h-[480px] relative rounded-lg overflow-hidden border border-gray-300'>
                            <img src="http://localhost:3000/images/blog_1.png" alt="" className='w-full h-[295px] object-cover' />
                            <div className='px-6 py-4'>
                                <div className='text-primary text-base mb-4'>10 February 2022 </div>
                                <div className='font-bold mb-4 text-lg'>Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis</div>
                                <div className='flex justify-between'>
                                    <a href='' className='hover:underline'>Learn More</a>
                                    <div>
                                        <FontAwesomeIcon icon={faShare} className='hover:text-primary cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full h-[480px] relative rounded-lg overflow-hidden border border-gray-300'>
                            <img src="http://localhost:3000/images/blog_1.png" alt="" className='w-full h-[295px] object-cover' />
                            <div className='px-6 py-4'>
                                <div className='text-primary text-base mb-4'>10 February 2022 </div>
                                <div className='font-bold mb-4 text-lg'>Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis</div>
                                <div className='flex justify-between'>
                                    <a href='' className='hover:underline'>Learn More</a>
                                    <div>
                                        <FontAwesomeIcon icon={faShare} className='hover:text-primary cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full h-[480px] relative rounded-lg overflow-hidden border border-gray-300'>
                            <img src="http://localhost:3000/images/blog_1.png" alt="" className='w-full h-[295px] object-cover' />
                            <div className='px-6 py-4'>
                                <div className='text-primary text-base mb-4'>10 February 2022 </div>
                                <div className='font-bold mb-4 text-lg'>Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis</div>
                                <div className='flex justify-between'>
                                    <a href='' className='hover:underline'>Learn More</a>
                                    <div>
                                        <FontAwesomeIcon icon={faShare} className='hover:text-primary cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='text-center'>
                <button className='bg-primary px-6 py-2 rounded-lg border-2 border-primary hover:bg-transparent hover:text-primary hover:border-primary'>
                    See more
                </button>
            </div>
        </div>
    );
}

export default SwiperBlogHome;
