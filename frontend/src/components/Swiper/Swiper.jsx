"use client";
require('dotenv').config()
import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../Loading/Loading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { getCategories } from '../../services/categoryService';
import { getProductsCountByCategory } from '../../services/productService';

const imageURL = process.env.REACT_APP_IMAGE_URL;
const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const OrganicSwiper = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const categoriesData = await getCategories();
                const categoriesWithCounts = await Promise.all(
                    categoriesData.map(async (category) => {
                        const count = await getProductsCountByCategory(category.tag_ct);
                        return { ...category, count: count.count };
                    })
                );
                setCategories(categoriesWithCounts);
                setLoading(false);
            } catch (error) {
                console.error("Error :", error);
                setLoading(false);
            }
        }
        fecthData();
    }, [])


    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    autoplay
                    loop={true}
                    breakpoints={{
                        // cài đặt cho màn hình nhỏ hơn hoặc bằng 768px
                        768: {
                            slidesPerView: 6, // hiển thị 2 sản phẩm
                            spaceBetween: 20,
                        },
                    }}
                >
                    {categories.map((category, i) => (
                        <SwiperSlide> <div className="swiper-slide rounded-lg">
                            <a href={`${URL}/shop/${category.tag_ct}`} className="lg:h-[240px] block w-[80px] h-[120px] lg:w-[160px] text-center lg:pt-5">
                                <img src={`http://localhost:3000/images/${category.image_ct}`} alt="" className="lg:mb-2 lg:h-[160px] h-[80px] lg:w-[160px] rounded-full object-cover w-[80px] hover:scale-[1.05]" style={{ transition: '1s' }} />
                                <p className="lg:text-xl text-base font-bold text-primary">{category.name_ct}</p>
                                <p className='text-sm text-gray-500'>({category.count})</p>
                            </a>
                        </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>

    );
};

export default OrganicSwiper;