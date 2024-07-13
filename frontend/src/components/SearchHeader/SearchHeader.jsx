require('dotenv').config();

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import useDebounce from "./use-debounce";
import formatNumber from '../../option/op_formatNumber';

export default function SearchHeader() {
    const [searchParam, setSearchParam] = useState("");
    const [products, setProducts] = useState([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const debounceParamValue = useDebounce(searchParam, 1000);

    const imageURL = process.env.REACT_APP_IMAGE_URL;
    const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    async function fetchListOfProducts() {
        try {
            setPending(true);
            const apiResponse = await fetch(
                `http://localhost:3000/products?keyword=${debounceParamValue}`
            );
            const result = await apiResponse.json();

            if (result && result.products && result.products.length > 0) {
                setPending(false);
                setProducts(result.products);
            } else {
                setPending(false);
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products. Please try again later.");
            setPending(false);
        }
    }

    useEffect(() => {
        if (debounceParamValue) {
            fetchListOfProducts();
        } else {
            setProducts([]);
        }
    }, [debounceParamValue]);

    return (
        <div className="relative">
            <div className="relative mr-2">
                <input
                    value={searchParam}
                    onChange={(event) => setSearchParam(event.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    type="text"
                    className="text-white focus:border-primary bg-transparent border-2 border-primary rounded-3xl w-60 py-2 pl-3 pr-10 outline-none"
                    placeholder="Tìm kiếm tại đây..."
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="text-white absolute hover:text-orange-300 top-[12px] h-5 w-5 right-4"
                />
            </div>
            {pending && <h3>Pending! Please wait...</h3>}
            {error && <h3>{error}</h3>}
            {(isFocused || searchParam) && (
                <ul className="bg-white shadow-xl absolute top-12 text-black rounded-lg h-auto w-[420px] flex flex-col items-start justify-center overflow-hidden">
                    {products && products.length > 0 ? (
                        products.map(product => (
                            <li key={product._id} className="w-full h-20">
                                <a href={`${URL}/products/${product._id}`}>
                                    <div className="p-4 flex items-center w-full h-20 hover:bg-slate-200 hover:cursor-pointer">
                                        <div className="mr-4">
                                            <img src={`http://localhost:3000/images/${product.image_pr_1}`} alt="" className="w-16 h-w-16 object-cover" />
                                        </div>
                                        <div>
                                            <div>{product.name_pr}</div>
                                            <div className="text-primary">{formatNumber(product.price_pr)} d</div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))
                    ) : (
                        !pending && <p className="text-center w-full my-2">No products found!
                            <br /> Please try with a different search.</p>
                    )}
                </ul>
            )}
        </div>
    );
}
