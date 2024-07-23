'use client'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Admin_list_us() {
    return (
        <div className="text-black bg-white p-4">
            <div className="flex justify-between items-center w-full mb-2">
                <h1 className="font-bold text-3xl">Users List</h1>
                <div className="px-6">
                    <Popup
                        trigger={<button className="button px-4 py-1 bg-primary rounded-lg font-semibold text-white"> Add </button>}
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal text-black">
                                <div className='flex justify-between w-full mb-4'>
                                    <div className="header font-bold text-2xl"> User Add </div>
                                    <button className="close font-bold text-3xl" onClick={close}>
                                        &times;
                                    </button>
                                </div>
                                <div className="content ">
                                    <form>
                                        <div className="sm:col-span-3 mb-4">
                                            <label htmlFor="name_us" className="block text-sm font-medium leading-6 text-gray-900">
                                                User name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="name_us"
                                                    name="name_us"
                                                    type="text"
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 mb-4">
                                            <label htmlFor="fullname_us" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="fullname_us"
                                                    name="fullname_us"
                                                    type="text"
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-6 gap-4 mb-4'>
                                          
                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone_us" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="phone_us"
                                                        name="phone_us"
                                                        type="text"
                                                        className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="email_us" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email_us"
                                                        name="email_us"
                                                        type="email"
                                                        className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                            <label htmlFor="role_us" className="block text-sm font-medium leading-6 text-gray-900">
                                                Role
                                            </label>
                                            <select id="role_us" className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Choose a category</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Accessories">Accessories</option>
                                                <option value="Home">Home</option>
                                            </select>
                                        </div>
                                          
                                        </div>
                                       

                                        <div className="col-span-full mb-4">
                                            <label htmlFor="address_us" className="block text-sm font-medium leading-6 text-gray-900">
                                                Adress
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="address_us"
                                                    name="address_us"
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
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
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">ID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Role</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700 py-2 mt-2 h-24">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">12345</td>
                                            <td className=" whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                <img className='w-20 h-20 object-cover' src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Product Name</td>
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
                                                        <button className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">View Details</button>
                                                        <button className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">Delete</button>
                                                    </div>
                                                </Popup>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700 py-2 mt-2 h-24">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">12345</td>
                                            <td className=" whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                <img className='w-20 h-20 object-cover' src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Product Name</td>
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
                                                        <button className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">View Details</button>
                                                        <button className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600">Delete</button>
                                                    </div>
                                                </Popup>
                                            </td>
                                        </tr>
                                   
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
