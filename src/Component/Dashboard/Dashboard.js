import React from 'react';
import '../Style/Dashboard__Style.css';
import SideNavBar from './SideNavBar';
import MainContent from './MainContent';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <SideNavBar />
            <MainContent />
        </div>
    )
}

export default Dashboard