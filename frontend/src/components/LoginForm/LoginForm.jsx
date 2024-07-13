"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginForm = () => {
    const [user_name_us, setUserNameUs] = useState('');
    const [password_us, setPasswordUs] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', { user_name_us, password_us });
            const { access_token, refresh_token, user } = response.data;
            const { id, name, role, img } = user;
            const userObj = { id, name, role, img };

            Cookies.set('user', JSON.stringify(userObj), { expires: 7 });
            Cookies.set('accessToken', access_token, { expires: 7 });
            Cookies.set('refreshToken', refresh_token, { expires: 7 });

            toast.success('Đăng nhập thành công');
            router.push('/');
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
            toast.error('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    };

    useEffect(() => {
        document.title = "FoodHaven Login";
    }, []);

    return (
        <div>
            <div className='bg-white text-black flex flex-col gap-10 py-10 mb-20 items-center justify-center lg:h-screen'>
                <div className='flex lg:w-[1000px] border-2 lg:h-[600px] rounded-lg overflow-hidden'>
                    <div className='lg:w-3/5 lg:block hidden h-full login_bg bg-slate-500'></div>
                    <div className='lg:w-2/5 w-full flex h-full flex-col items-center justify-center p-6'>
                        <div className='text-4xl font-bold'>Login</div>
                        <div className='w-full'>
                            <form className='w-full' onSubmit={handleSubmit}>
                                <div className='mb-4 w-full'>
                                    <label className="block w-full">
                                        <span className="block text-sm font-medium text-slate-700">User name</span>
                                        <input 
                                            value={user_name_us} 
                                            onChange={(e) => setUserNameUs(e.target.value)} 
                                            required 
                                            type="text" 
                                            name='user_name_us' 
                                            placeholder='User name' 
                                            className="mt-1 block w-full px-3 py-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" 
                                        />
                                    </label>
                                </div>
                                <div className='mb-4 w-full'>
                                    <label className="block w-full">
                                        <span className="block text-sm font-medium text-slate-700">Password</span>
                                        <input 
                                            value={password_us} 
                                            onChange={(e) => setPasswordUs(e.target.value)} 
                                            required 
                                            min={8} 
                                            type="password" 
                                            name='password_us' 
                                            placeholder='Password' 
                                            className="peer mt-1 block w-full px-3 py-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" 
                                        />
                                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                                            Please provide a valid password.
                                        </p>
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <button className='w-full bg-primary text-white font-bold py-3 rounded-md' type='submit'>Login</button>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <div>Forgot password?</div>
                                    <div>Dont have an account? <Link href="/register" className={'text-primary'}>Register</Link></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
