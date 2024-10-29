import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Dashboard__Style.css'

const SideNavBar = () => {
    return (
        <div className='dashboard__sideNavbar'>
            <Link className='dashboard__sideNavbar__link' to='/dashboard/student'>Student </Link>
            <Link className='dashboard__sideNavbar__link' to='/dashboard/faculty'>Faculty </Link>
            <Link className='dashboard__sideNavbar__link' to='/signup'>SignUp</Link>
            <Link className='dashboard__sideNavbar__link' to='/login'>LogOut </Link>
        </div>
    )
}

export default SideNavBar