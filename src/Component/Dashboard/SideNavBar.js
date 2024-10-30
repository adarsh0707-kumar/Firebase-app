import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Dashboard__Style.css';
import { app } from '../../Firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const SideNavBar = () => {

    const navigate = useNavigate();
    const LogOut = () => {
        const auth = getAuth(app);
        signOut(auth)
            .then(res => {
                navigate('/login');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className='dashboard__sideNavbar'>
            <Link className='dashboard__sideNavbar__link' to='/dashboard/student'>Student </Link>
            <Link className='dashboard__sideNavbar__link' to='/dashboard/faculty'>Faculty </Link>
            <Link className='dashboard__sideNavbar__link' to='/signup'>SignUp</Link>
            <button className='dashboard__sideNavbar__link' onClick={LogOut}>LogOut </button>
        </div>
    )
}

export default SideNavBar