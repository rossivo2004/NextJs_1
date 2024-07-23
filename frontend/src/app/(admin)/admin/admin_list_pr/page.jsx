'use client';
import { useEffect, useState } from 'react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import queryString from "query-string";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import formatNumber from '../../../../option/op_formatNumber';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Link from 'next/link';

import Paginations from '../../../../components/Paginations/Paginations';
import Loading from '../../../../components/Loading/Loading';
import { getCategories } from '../../../../services/categoryService';

const URL_IMG_BE = process.env.NEXT_PUBLIC_IMAGE_URL_BE;

const getProducts = async (params) => {
    const urlParams = {
        page: params.page,
    };

    const searchQuery = queryString.stringify(urlParams);

    const { data } = await axios.get(`http://localhost:3000/products?${searchQuery}`);
    return data;
};

export default function Admin_list_pr({ searchParams }) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.page) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productsData = await getProducts({ page: currentPage });
                setProducts(productsData.products);
                setTotalPages(productsData.totalPages);

                const categoryData = await getCategories();
                setCategory(categoryData);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        updateURLParams({ page });
    };

    const updateURLParams = (params) => {
        const queryParams = new URLSearchParams(window.location.search);

        Object.keys(params).forEach(key => {
            queryParams.set(key, params[key]);
        });

        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        router.push(newUrl);
    };

    const form_add_pr = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await axios.post('http://localhost:3000/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success("Product added successfully");
                window.location.reload();
            } else {
                console.error('Failed to add product:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const delete_pr = async (id, name) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: `Are you sure you want to delete the product ${name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const response = await axios.delete(`http://localhost:3000/products/delete/${id}`);
                            if (response.status === 200) {
                                toast.success("Product deleted successfully");
                                window.location.reload();
                            } else {
                                toast.error("Failed to delete product");
                            }
                        } catch (error) {
                            console.error('Error deleting product:', error);
                            toast.error("Error deleting product");
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    return (
        <div className="text-black bg-white p-4">
            <div className="flex justify-between items-center w-full mb-2">
                <h1 className="font-bold text-3xl">Products List</h1>
                <div className="px-6">
                <Popup
    trigger={<button className="button px-4 py-1 bg-primary rounded-lg font-semibold text-white"> Add </button>}
    modal
    nested
>
    {close => (
        <div className="modal text-black">
            <div className="flex justify-between w-full mb-4">
                <div className="header font-bold text-2xl"> Product Add </div>
                <button className="close font-bold text-3xl" onClick={close}>
                    &times;
                </button>
            </div>
            <div className="content overflow-y-auto max-h-[80vh] p-4">
                <form onSubmit={form_add_pr} className="h-auto">
                    <div className="sm:col-span-3 mb-4">
                        <label htmlFor="name_pr" className="block text-sm font-medium leading-6 text-gray-900">
                            Name product
                        </label>
                        <div className="mt-2">
                            <input
                            required
                                id="name_pr"
                                name="name_pr"
                                type="text"
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mb-4">
                        <div className="sm:col-span-3">
                            <label htmlFor="category_pr_tag" className="block text-sm font-medium leading-6 text-gray-900">
                                Category product
                            </label>
                            <select id="category_pr_tag" name="category_pr_tag" className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Choose a category</option>
                                {category.map((item, i) => (
                                    <option key={i} value={item.tag_ct}>{item.name_ct}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="quantity_pr" className="block text-sm font-medium leading-6 text-gray-900">
                                Quantity product
                            </label>
                            <div className="mt-2">
                                <input
                                required
                                    id="quantity_pr"
                                    name="quantity_pr"
                                    type="number"
                                    min={1}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="price_pr" className="block text-sm font-medium leading-6 text-gray-900">
                                Price product
                            </label>
                            <div className="mt-2">
                                <input
                                required
                                    id="price_pr"
                                    name="price_pr"
                                    type="number"
                                    min={1000}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="discount_pr" className="block text-sm font-medium leading-6 text-gray-900">
                                Discount product
                            </label>
                            <div className="mt-2">
                                <input
                                required
                                    id="discount_pr"
                                    name="discount_pr"
                                    type="number"
                                    min={0}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="weight_pr" className="block text-sm font-medium leading-6 text-gray-900">
                                Weight product
                            </label>
                            <div className="mt-2">
                                <input
                                required
                                    id="weight_pr"
                                    name="weight_pr"
                                    type="number"
                                    min={100}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full mb-4">
                        <label htmlFor="description_pr" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description_pr"
                                name="description_pr"
                                rows={3}
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full mb-4">
                        <label htmlFor="description_pr_detail" className="block text-sm font-medium leading-6 text-gray-900">
                            Description Detail
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description_pr_detail"
                                name="description_pr_detail"
                                rows={3}
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full mb-4">
                        <label htmlFor="image_pr_1" className="block text-sm font-medium leading-6 text-gray-900">
                            Image
                        </label>
                        <div className="mt-2">
                            <input
                            required
                                id="image_pr_1"
                                name="image_pr_1"
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-3">
                        <button type="submit" className="px-4 py-1 bg-primary rounded-lg font-semibold text-white">Add</button>
                        <button type="button" className="px-4 py-1 bg-red-600 rounded-lg font-semibold text-white" onClick={close}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )}
</Popup>

            
                </div>
            </div>
            {loading ? <Loading /> : (
                <div>
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">ID</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Image</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Price</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Quantity</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Discount</th>
                                                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                            {products.map((product, i) => (
                                                <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700 py-2 mt-2 h-24" key={i}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{product._id}</td>
                                                    <td className=" whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                        <img className='w-20 h-20 object-cover' src={`${URL_IMG_BE}/${product.image_pr_1}`} alt="" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{product.name_pr}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{formatNumber(product.price_pr)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{product.quantity_pr}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{product.discount_pr}%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        <Popup
                                                            trigger={
                                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
                                                                    <FontAwesomeIcon icon={faCircleInfo} className='text-xl'/>
                                                                </button>
                                                            }
                                                            position="left top"
                                                            on="click"
                                                            closeOnDocumentClick
                                                            mouseLeaveDelay={300}
                                                            mouseEnterDelay={0}
                                                            contentStyle={{ padding: '0px', border: 'none' }}
                                                            arrow={false}
                                                        >
                                                            <div className="">
                                                                <Link href={`http://localhost:4000/admin/admin_list_pr/${product._id}`} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600" >View Details</Link>
                                                                <button className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600" onClick={() => delete_pr(product._id, product.name_pr)}>Delete</button>
                                                            </div>
                                                        </Popup>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Paginations
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        setCurrentPage={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
