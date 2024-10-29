import React from 'react';
import '../Style/Dashboard__Style.css';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
    return (
        <div className='dashboard__mainContent'>
            <h1>Content</h1>
            <div className='dashboard__mainContent__area'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainContent