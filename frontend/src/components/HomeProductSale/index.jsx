'use client'
import { useState, useEffect } from 'react';
import BoxProduct from '../BoxProduct/index';
import { getProductSale } from '../../services/productService';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Loading from '../Loading/Loading';

import './style.scss'

function HomeProductSale() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProductSale();
                setProducts(productData);
                setLoading(false);
                console.log(productData);

            } catch (error) {
                setLoading(false);
                console.error('Failed to fetch product data:', error);
            }
        };


        fetchProducts();
    }, []);

    return (
        <div>
        {loading ? (
            <Loading /> 
        ) : (
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                modules={[Pagination]}
                className="mySwiper"
                loop={true}
                breakpoints={{
                    // cài đặt cho màn hình nhỏ hơn hoặc bằng 768px
                    768: {
                        slidesPerView: 4, // hiển thị 2 sản phẩm
                        spaceBetween: 10,
                    },
                }}
            >
                {products.map(product => (
                    <SwiperSlide key={product.id}>
                        <BoxProduct
                            product={product}
                            color="text-black"
                            bgColor="bg-white"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
        </div>
    );
}

export default HomeProductSale;
