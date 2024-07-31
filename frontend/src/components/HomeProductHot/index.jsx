'use client'
import { useState, useEffect } from 'react';
import BoxProduct from '../BoxProduct/index';
import { getProductHot } from '../../services/productService';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../Loading/Loading';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import './style.scss'

function HomeProductHot() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProductHot();
                setProducts(productData);
                setLoading(false); // Set loading to false after data is fetched
                console.log(productData);
            } catch (error) {
                console.error('Failed to fetch product data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };
        fetchProducts();
    }, []);

    return ( 
        <div className='bg-black'>
            {loading ? (
                <Loading /> // Display the Loading component while fetching data
            ) : (
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    // pagination={{
                    //     clickable: true,
                    // }}
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

export default HomeProductHot;
