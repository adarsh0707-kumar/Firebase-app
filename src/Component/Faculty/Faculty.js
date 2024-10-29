import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../Style/Faculty__Style.css'

const Faculty = () => {
  return (
    <div className='faculty'>
      <div className='faculty__navbar'>
        <Link className='faculty__navbar__link' to='/dashboard/faculty/addFaculty'>Add Faculty</Link>
        <Link className='faculty__navbar__link' to='/dashboard/faculty/facultyList'>Faculty List</Link>
      </div>

      <div className='faculty__mainContent'>
        <Outlet />
      </div>
    </div>
  )
}

export default Faculty