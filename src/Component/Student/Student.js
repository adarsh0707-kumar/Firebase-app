import React from 'react';
import '../Style/Dashboard__Style.css';
import { Link, Outlet } from 'react-router-dom';
import '../Style/Student__Style.css'

const Student = () => {


    return (

        <div className='student'>
            <div className='student__navbar'>
                <Link className='student__navbar__link' to='/dashboard/student/addStudent'>Add Student</Link>
                <Link className='student__navbar__link' to='/dashboard/student/studentList'>Student List</Link>
            </div>

            <div className='student__mainContent'>
                <Outlet />
            </div>
        </div>
    )
}

export default Student