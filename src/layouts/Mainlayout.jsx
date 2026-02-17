import React from 'react';
import { Outlet } from 'react-router';

const Mainlayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className=' mt-6'>
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Mainlayout;