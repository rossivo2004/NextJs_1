import React from 'react';
import { faCartArrowDown, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { addItem } from '../../redux/slices/cartSlice';
import formatNumber from '../../option/op_formatNumber';

const imageURLBE = process.env.NEXT_PUBLIC_IMAGE_URL_BE;

const BoxProduct = ({ product, color, bgColor }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!product) return null;

  const priceNew = product.price_pr - (product.price_pr * product.discount_pr) / 100;

  const handleAddToCart = () => {
    dispatch(addItem({
      _id: product._id,
      name_pr: product.name_pr,
      image_pr: product.image_pr_1,
      price_pr: product.price_pr - (product.price_pr * product.discount_pr) / 100,
      discount_pr: product.discount_pr,
      quantity: 1,
    }));
    toast.success('Added to cart!');
  };


  return (
    <div className={`flex justify-center items-center h-[330px] w-full rounded-lg overflow-hidden shadow-md ${bgColor}`}>
      <div className="relative group flex flex-col justify-start h-full w-full">
        <div className="h-[200px] mb-4">
          <img src={`${imageURLBE}/${product.image_pr_1}`} alt={product.name_pr} className="w-full h-[200px] object-cover" />
        </div>
        <div className="px-2 flex-1 flex flex-col mb-4">
          <div className={`font-semibold mb-2 h-12 text-lg text-start ${color}`}>{product.name_pr}</div>
          <div className={`font-normal mb-2 h-4 whitespace-nowrap overflow-hidden text-ellipsis text-xs text-start ${color}`}>{product.description_pr}</div>
          <div className="flex items-center">
            <div className={`mr-2 text-base font-semibold text-primary`}>
              {formatNumber(priceNew)} <span className="text-sm">đ</span>
            </div>
            <div className="line-through font-light text-sm text-[#828282]">
              {formatNumber(product.price_pr)} <span className="text-sm">đ</span>
            </div>
          </div>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${product._id}`} className="w-12 h-12 bg-white flex items-center justify-center rounded-lg text-primary hover:bg-primary hover:text-white cursor-pointer">
              <FontAwesomeIcon icon={faEye} className="text-lg" />
            </a>
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg text-primary hover:bg-primary hover:text-white cursor-pointer" onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faCartArrowDown} className="text-lg" />
            </div>
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg text-primary hover:bg-primary hover:text-white cursor-pointer">
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
            </div>
          </div>
        </div>
        {product.discount_pr > 0 && (
          <div className="absolute bg-primary font-semibold text-base px-2 rounded-lg top-2 left-2">
            {product.discount_pr}%
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxProduct;
