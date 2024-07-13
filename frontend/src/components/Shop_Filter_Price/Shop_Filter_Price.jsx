'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './Shop_Filter_Price.scss';

const Shop_Filter_Price = ({ onApplyFilter }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [isMounted, setIsMounted] = useState(false);
    const maxRange = 1000000;

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const min = parseInt(minPrice);
        const max = parseInt(maxPrice);

        if (min > max - 10000) {
            setMinPrice(roundToNearestThousand(max - 10000));
        }
        if (max < min + 10000) {
            setMaxPrice(roundToNearestThousand(min + 10000));
        }
    }, [minPrice, maxPrice]);

    const roundToNearestThousand = (value) => {
        return Math.round(value / 1000) * 1000;
    };

    const handleMinPriceChange = (value) => {
        setMinPrice(roundToNearestThousand(value));
    };

    const handleMaxPriceChange = (value) => {
        setMaxPrice(roundToNearestThousand(value));
    };

    const minPercent = (minPrice / maxRange) * 100;
    const maxPercent = (maxPrice / maxRange) * 100;

    const handleClick = () => {
        if (isMounted) {
            const queryParams = new URLSearchParams(window.location.search);

            queryParams.set('maxPrice', maxPrice);
            queryParams.set('minPrice', minPrice);

            const path = window.location.pathname + "?" + queryParams.toString();
            router.push(path);

            onApplyFilter(minPrice, maxPrice);
        }
    };

    if (!isMounted) {
        return null; // Render nothing until the component is mounted
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4 text-sm">
               
                <div className="range-slider relative h-10">
                    <div className="track absolute w-full h-1 bg-gray-300 rounded top-1/2 transform -translate-y-1/2"></div>
                    <div
                        className="range absolute h-1 bg-primary rounded top-1/2 transform -translate-y-1/2"
                        style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
                    ></div>
                    <input
                        type="range"
                        min="0"
                        max={maxRange}
                        value={minPrice}
                        onChange={(e) => handleMinPriceChange(parseInt(e.target.value))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent h-10"
                        style={{ zIndex: minPrice > maxPrice - 10000 ? 5 : 1 }}
                    />
                    <input
                        type="range"
                        min="0"
                        max={maxRange}
                        value={maxPrice}
                        onChange={(e) => handleMaxPriceChange(parseInt(e.target.value))}
                        className="absolute w-full pointer-events-none appearance-none bg-transparent h-10 text-primary"
                        style={{ zIndex: maxPrice < minPrice + 10000 ? 5 : 1 }}
                    />
                </div>
                <div className="flex justify-between mb-2">
                <span>Price: <span>{minPrice.toLocaleString()} - {maxPrice.toLocaleString()}</span> đ</span>
            </div>
            </div>
            <button onClick={handleClick} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-orange-300">Apply Filter</button>
        </div>
    );
};

export default Shop_Filter_Price;
