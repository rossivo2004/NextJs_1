'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './style.scss';

const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL_FE;

function ThankOrderPage() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        const timer = setTimeout(() => {
            router.push('/');
        }, 10000); // 10 seconds

        return () => {
            clearInterval(countdown);
            clearTimeout(timer);
        };
    }, [router]);

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="modal flex flex-col items-center">
                <img src={`${imageURL}/FoodHaven.png`} alt="" className='w-40'/>
                <div className='font-bold text-2xl'>Thank you for your order.</div>
                <div className='text-xs'>(Returning to home page in <span className='font-bold'>{seconds}</span> seconds)</div>
            </div>
        </div>
    );
}

export default ThankOrderPage;
