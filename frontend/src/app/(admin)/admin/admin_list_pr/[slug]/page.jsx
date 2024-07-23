'use client'
import { useEffect, useState } from "react";
import { getCategories } from "../../../../../services/categoryService";
import axios from "axios";
import toast from 'react-hot-toast';

function EditPr({ params }) {
    const [data, setData] = useState(null);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await fetch(`http://localhost:3000/products/${params.slug}`);
                const categoriesData = await getCategories();
                
                if (!productResponse.ok) {
                    throw new Error(`HTTP error! status: ${productResponse.status}`);
                }
                
                const productData = await productResponse.json();
                setData(productData);
                setCategory(categoriesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const formEditPr = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const updatedProduct = {
                name_pr: data.name_pr,
                category_pr_tag: data.category_pr_tag,
                price_pr: data.price_pr,
                image_pr_1: data.image_pr_1,
                description_pr: data.description_pr,
                description_pr_detail: data.description_pr_detail,
                discount_pr: data.discount_pr,
                quantity_pr: data.quantity_pr,
                view_pr: data.view_pr,
                weight_pr: data.weight_pr,
                sale_pr: data.sale_pr,
                rating_pr: data.rating_pr,
                reviews: data.reviews,
                stoke_pr: data.stoke_pr,
            };

            const response = await axios.put(`http://localhost:3000/products/edit/${params.slug}`, updatedProduct);
            toast.success('Profile updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <div className="text-black">
            <div className="font-bold text-3xl mb-2">
                # {data._id}
            </div>
            <div className="bg-white w-full p-4 rounded-lg">
                <form onSubmit={formEditPr}>
                    <div className="sm:col-span-3 mb-4">
                        <label htmlFor="name_pr" className="block text-sm font-medium leading-6 text-gray-900">
                            Name product
                        </label>
                        <div className="mt-2">
                            <input
                                id="name_pr"
                                name="name_pr"
                                type="text"
                                value={data.name_pr}
                                onChange={handleChange}
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-6 gap-4 mb-4'>
                        <div className="sm:col-span-3">
                            <label htmlFor="category_pr_tag" className="block text-sm font-medium leading-6 text-gray-900">
                                Category product
                            </label>
                            <select
                                id="category_pr_tag"
                                name="category_pr_tag"
                                value={data.category_pr_tag}
                                onChange={handleChange}
                                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Choose a category</option>
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
                                    id="quantity_pr"
                                    name="quantity_pr"
                                    type="number"
                                    min={1}
                                    value={data.quantity_pr}
                                    onChange={handleChange}
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
                                    id="price_pr"
                                    name="price_pr"
                                    type="number"
                                    min={1000}
                                    value={data.price_pr}
                                    onChange={handleChange}
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
                                    id="discount_pr"
                                    name="discount_pr"
                                    type="number"
                                    min={0}
                                    value={data.discount_pr}
                                    onChange={handleChange}
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full mb-4">
                        <label htmlFor="description_pr" className="block text-sm font-medium leading-6 text-gray-900">
                            Description product
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description_pr"
                                name="description_pr"
                                value={data.description_pr}
                                onChange={handleChange}
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full mb-4">
                        <label htmlFor="description_pr_detail" className="block text-sm font-medium leading-6 text-gray-900">
                            Detail description product
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description_pr_detail"
                                name="description_pr_detail"
                                value={data.description_pr_detail}
                                onChange={handleChange}
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <button className='w-full py-3 bg-primary rounded-lg font-semibold text-white hover:bg-orange-300'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditPr;
