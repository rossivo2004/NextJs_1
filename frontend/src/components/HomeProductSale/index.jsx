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
            <Loading /> // Display the Loading component while fetching data
        ) : (
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[Pagination]}
                className="mySwiper"
                loop={true}
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
