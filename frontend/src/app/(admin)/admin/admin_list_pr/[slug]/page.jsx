'use client';
import { useEffect, useState } from "react";
import { getCategories } from "../../../../../services/categoryService";
import axios from "axios";
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from '../../../../../components/Yub_Pr_Admin';

function EditPr({ params }) {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
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
        setCategories(categoriesData);
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

  const formEditPr = async (values) => {
    try {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        if (values.image_pr_1) {
            formData.append('image_pr_1', values.image_pr_1);
        }

        const response = await axios.put(`http://localhost:3000/products/edit/${params.slug}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success('Profile updated successfully!');
        window.location.reload();
    } catch (error) {
        console.error('Error editing product:', error);
        toast.error('Failed to update profile');
    }
};


  return (
    <div className="text-black">
      <div className="font-bold text-3xl mb-2">
        # {data._id}
      </div>
      <div className="bg-white w-full p-4 rounded-lg">
        <Formik
          initialValues={data}
          validationSchema={validationSchema}
          onSubmit={formEditPr}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="sm:col-span-3 mb-4">
                <label htmlFor="name_pr" className="block text-sm font-medium leading-6 text-gray-900">
                  Name product
                </label>
                <div className="mt-2">
                  <Field
                    id="name_pr"
                    name="name_pr"
                    type="text"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="name_pr" component="div" className="text-red-600 text-sm" />
                </div>
              </div>
              <div className='grid grid-cols-6 gap-4 mb-4'>
                <div className="sm:col-span-3">
                  <label htmlFor="category_pr_tag" className="block text-sm font-medium leading-6 text-gray-900">
                    Category product
                  </label>
                  <Field as="select" name="category_pr_tag" className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Choose a category</option>
                    {categories.map((item, i) => (
                      <option key={i} value={item.tag_ct}>{item.name_ct}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="category_pr_tag" component="div" className="text-red-600 text-sm" />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="quantity_pr" className="block text-sm font-medium leading-6 text-gray-900">
                    Quantity product
                  </label>
                  <div className="mt-2">
                    <Field
                      id="quantity_pr"
                      name="quantity_pr"
                      type="number"
                      min={1}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="quantity_pr" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="price_pr" className="block text-sm font-medium leading-6 text-gray-900">
                    Price product
                  </label>
                  <div className="mt-2">
                    <Field
                      id="price_pr"
                      name="price_pr"
                      type="number"
                      min={1000}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="price_pr" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="discount_pr" className="block text-sm font-medium leading-6 text-gray-900">
                    Discount product
                  </label>
                  <div className="mt-2">
                    <Field
                      id="discount_pr"
                      name="discount_pr"
                      type="number"
                      min={0}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="discount_pr" component="div" className="text-red-600 text-sm" />
                  </div>
                </div>
              </div>
              <div className="col-span-full mb-4">
                <label htmlFor="description_pr" className="block text-sm font-medium leading-6 text-gray-900">
                  Description product
                </label>
                <div className="mt-2">
                  <Field
                    as="textarea"
                    id="description_pr"
                    name="description_pr"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="description_pr" component="div" className="text-red-600 text-sm" />
                </div>
              </div>
              <div className="col-span-full mb-4">
                <label htmlFor="description_pr_detail" className="block text-sm font-medium leading-6 text-gray-900">
                  Detail description product
                </label>
                <div className="mt-2">
                  <Field
                    as="textarea"
                    id="description_pr_detail"
                    name="description_pr_detail"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="description_pr_detail" component="div" className="text-red-600 text-sm" />
                </div>
              </div>
              <div className="col-span-full mb-4">
                <label htmlFor="image_pr_1" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Image
                </label>
                <input
                  id="image_pr_1"
                  name="image_pr_1"
                  type="file"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  onChange={(event) => setFieldValue("image_pr_1", event.currentTarget.files[0])}
                />
              </div>
              <button type="submit" className='w-full py-3 bg-primary rounded-lg font-semibold text-white hover:bg-orange-300' disabled={isSubmitting}>
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditPr;
