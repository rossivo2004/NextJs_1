import React from 'react';
import './Loading.scss'

const Loading: React.FC = () => {
    return (
        <div className='w-full h-80 flex items-center justify-center bg-transparent'>
            
            <div className="loader "></div>
        </div>
    );
}

export default Loading;
