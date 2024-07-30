"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    const [data, setData] = useState(null);

    useEffect(() => {
        document.title = "FoodHaven Register";
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData.entries());

        axios.post('http://localhost:3000/users/add', formObject)
            .then((response) => {
                setData(response.data);
                toast.success("User create successfully");
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Email is valid");
            });
    }

    return (
        <div>
            <div className=' bg-white text-black flex flex-col gap-10 py-10 mb-20 items-center justify-center lg:h-screen'>
                <div className='flex lg:w-[1000px] border-2 lg:h-[600px] rounded-lg overflow-hidden'>
                    <div className='lg:w-3/5 lg:block hidden h-full login_bg bg-slate-500'>
                    </div>
                    <div className='lg:w-2/5 w-full flex h-full flex-col items-center justify-center p-6'>
                        <div className='text-4xl font-bold'>Register</div>
                        <div className='w-full'>
                            <form className='w-full' onSubmit={handleSubmit}>
                                <div className='mb-4 w-full'>
                                    <label className="block w-full">
                                        <span className="block text-sm font-medium text-slate-700">Username</span>
                                        <input name='user_name_us' type="text" className="mt-1 block w-full px-3 py-4  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                    </label>
                                </div>
                                <div className='mb-4 w-full'>
                                    <label className="block w-full">
                                        <span className="block text-sm font-medium text-slate-700">Email</span>
                                        <input name='email_us' type="email" placeholder='' className="peer mt-1 block w-full px-3 py-4  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                                            Please provide a valid email address.
                                        </p>
                                    </label>
                                </div>
                                <div className='mb-4 w-full'>
                                    <label className="block w-full">
                                        <span className="block text-sm font-medium text-slate-700">Password</span>
                                        <input name='password_us' type="password" placeholder='Password' className="peer mt-1 block w-full px-3 py-4  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                                            Please provide a valid password.
                                        </p>
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <button className='w-full bg-primary text-white font-bold py-3 rounded-md'>Register</button>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <div>Forgot password?</div>
                                    <div>Do have account? <Link href="/login" className={'text-primary'}>Login</Link></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Register;
