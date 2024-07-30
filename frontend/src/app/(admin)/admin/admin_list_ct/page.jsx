'use client'
import { useState, useEffect } from 'react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

import Loading from '../../../../components/Loading/Loading';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { getCategories } from '../../../../services/categoryService';
import { getProductsCountByCategory } from '../../../../services/productService';
const URL_IMG_BE = process.env.NEXT_PUBLIC_IMAGE_URL_BE;

export default function Admin_list_ct() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setData(response);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const delete_ct = async (id, name) => {
    try {
      const productCount = await getProductsCountByCategory(name);
      if (productCount.count > 0) {
        toast.error(`Cannot delete category "${name}" because it has associated products.`);
        return;
      }
    } catch (error) {
      console.error('Error fetching product count:', error);
      toast.error("Failed to check product count");
      return;
    }

    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure you want to delete the category ${name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.delete(`http://localhost:3000/categories/delete/${id}`);

              if (response.status === 200) {
                toast.success("Category deleted successfully");
                setData(data.filter(item => item._id !== id));
              } else {
                toast.error("Failed to delete category");
              }
            } catch (error) {
              console.error('Error deleting category:', error);
              toast.error("Error deleting category");
            }
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  const add_ct = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
try {
  const response = await axios.post('http://localhost:3000/categories/add_ct', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

if (response.status === 200) {
    toast.success("Category added successfully");
    window.location.reload();
} else {
    console.error('Failed to add Category:', response.data.message);
}
} catch (error) {
  console.error('Error adding category:', error);

}
  }

  return (
    <div className="text-black bg-white p-4">
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="font-bold text-3xl">Categories List</h1>
        <div className="px-6">
          <Popup
            trigger={<button className="button px-4 py-1 bg-primary rounded-lg font-semibold text-white"> Add </button>}
            modal
            nested
          >
            {close => (
              <div className="modal text-black">
                <div className='flex justify-between w-full mb-4'>
                  <div className="header font-bold text-2xl"> Category Add </div>
                  <button className="close font-bold text-3xl" onClick={close}>
                    &times;
                  </button>
                </div>
                <div className="content ">
                  <form onSubmit={add_ct}>
                    <div className="sm:col-span-3 mb-4">
                      <label htmlFor="name_ct" className="block text-sm font-medium leading-6 text-gray-900">
                        Name category
                      </label>
                      <div className="mt-2">
                        <input
                          id="name_ct"
                          name="name_ct"
                          type="text"
                          className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3 mb-4">
                      <label htmlFor="tag_ct" className="block text-sm font-medium leading-6 text-gray-900">
                        Name category
                      </label>
                      <div className="mt-2">
                        <input
                          id="tag_ct"
                          name="tag_ct"
                          type="text"
                          className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="formFileMultiple" className="block text-sm font-medium leading-6 text-gray-900 mb-2">Image category</label>
                      <input name='image_ct' className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white" type="file" id="formFileMultiple" multiple />
                    </div>


                    <div>
                      <button className='w-full py-3 bg-primary rounded-lg font-semibold text-white hover:bg-orange-300'>Add</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                {loading ? <Loading /> : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">ID</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Image</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Tag</th>
                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {data.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-100 dark:hover:bg-neutral-700 py-2 mt-2 h-24">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item._id}</td>
                          <td className=" whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            <img className='w-20 h-20 object-cover' src={`${URL_IMG_BE}/${item.image_ct}`} alt="" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.name_ct}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.tag_ct}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <Popup
                              trigger={
                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
                                  <FontAwesomeIcon icon={faCircleInfo} className='text-xl' />
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
                                <Link href={`http://localhost:4000/admin/admin_list_ct/${item._id}`} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">Edit</Link>
                                <button onClick={() => delete_ct(item._id, item.name_ct)} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">Delete</button>
                              </div>
                            </Popup>
                          </td>
                        </tr>
                      ))}



                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
