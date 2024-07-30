'use client';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function PopUp({ children }) {
    const router = useRouter();

    const handleLogout = () => {
        confirmAlert({
            title: 'Confirm to log out',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Cookies.remove('user');
                        router.push('/');
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <Popup trigger={<button>{children}</button>} position="bottom right" className='text-black'>
            <div 
                className='text-black hover:bg-slate-200 px-4 py-2 cursor-pointer' 
                onClick={handleLogout}
            >
                Log out
            </div>
        </Popup>
    );
}

export default PopUp;
