"use client";
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './SwiperImgHomeBanner.scss';

// import required modules
import { EffectCards, Autoplay } from 'swiper/modules';

export default function SwiperImgHomeBanner() {
    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mySwiper w-[280px] h-[380px]"
            >
                <SwiperSlide>
                    <img src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
