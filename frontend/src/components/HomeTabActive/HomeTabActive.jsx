"use client";
import './HomeTabActive.Module.scss';

import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';

const HomeTabActive = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const lineRef = useRef(null);
    const tabItemsRef = useRef([]);

    const tabs = [
        {
            title: 'Tab 1', content: (
                <div className='flex gap-2 lg:gap-10'>
                    <div className='w-1/3 lg:block hidden'>
                        <img src="http://localhost:3000/images/home_4.png" alt="" className='w-full h-[440px] object-cover' />
                    </div>
                    <div className='lg:w-2/3 grid grid-cols-2 lg:gap-10 gap-2 h-fit'>
                        <div className=' w-full h-20 flex items-center lg:mb-0 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>
                        <div className=' w-full h-20 flex items-center lg:mb-1 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>
                        <div className=' w-full h-20 flex items-center lg:mb-1 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>
                        <div className=' w-full h-20 flex items-center lg:mb-1 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>
                        <div className=' w-full h-20 flex items-center lg:mb-1 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>
                        <div className=' w-full h-20 flex items-center lg:mb-1 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>
                        <div className=' w-full h-20 flex items-center lg:mb-1 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>
                        <div className=' w-full h-20 flex items-center lg:mb-1 mb-2'>
                            <div className='lg:block hidden'><img src="http://localhost:3000/images/home_3.png" alt="" className='h-[70px] w-[70px] object-cover rounded-lg' /></div>
                            <div className='text-start pl-2'>
                                <div className='text-base lg:text-xl font-bold'>Lettuce Leaf</div>
                                <div className='text-sm lg:text-sm'>Lacus nisi, et ac dapibus velit in consequat.</div>
                                <div className='text-lg text-primary font-bold'>12.5 $</div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        },
        {
            title: 'Tab 2', content: (
                <div>
                    <div className='grid grid-cols-2 gap-8 mb-10'>
                        <div className='border-b-2 py-4 border-dashed flex justify-between'>
                            <div className='text-left'>
                                <div className='hover:text-primary cursor-pointer font-bold text-lg'>Item 2</div>
                                <div className='text-sm text-text_1'>Description 2</div>
                                <div className='text-sm text-text_1'>200 CAL</div>
                            </div>
                            <div className='text-primary font-bold text-lg'>200 d</div>
                        </div>
                    </div>

                </div>
            )
        },
        {
            title: 'Tab 4', content: (
                <div>
                    <div className='grid grid-cols-2 gap-8 mb-10'>
                        <div className='border-b-2 py-4 border-dashed flex justify-between'>
                            <div className='text-left'>
                                <div className='hover:text-primary cursor-pointer font-bold text-lg'>Item 4</div>
                                <div className='text-sm text-text_1'>Description 4</div>
                                <div className='text-sm text-text_1'>400 CAL</div>
                            </div>
                            <div className='text-primary font-bold text-lg'>400 d</div>
                        </div>
                    </div>

                </div>
            )
        },
        // Continue defining content for other tabs similarly
        { title: 'Tab 5', content: 'Nội dung của Tab 5' },
        { title: 'Tab 6', content: 'Nội dung của Tab 6' },
        { title: 'Tab 7', content: 'Nội dung của Tab 7' },
        { title: 'Tab 8', content: 'Nội dung của Tab 8' },
    ];

    useEffect(() => {
        const activeTabItem = tabItemsRef.current[activeIndex];
        if (activeTabItem) {
            lineRef.current.style.left = `${activeTabItem.offsetLeft}px`;
            lineRef.current.style.width = `${activeTabItem.offsetWidth}px`;
        }
    }, [activeIndex]);

    const handleTabClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        ref={(el) => (tabItemsRef.current[index] = el)}
                        className={`tab-item ${index === activeIndex ? 'active_tab' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.title}
                    </div>
                ))}
                <div ref={lineRef} className="line"></div>
            </div>
            <div className="tab-content mb-10">
                {tabs[activeIndex].content}
            </div>
            <div>
                <button className='px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg'>View menu</button>
            </div>
        </div>
    );
};

export default HomeTabActive;
