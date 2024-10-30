import React, {useEffect} from 'react';
import '../Style/Dashboard__Style.css';
import SideNavBar from './SideNavBar';
import MainContent from './MainContent';
import { app } from '../../Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const Dashboard = () => {
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('yes login', user);
            }
            else {
                console.log('not login');
            }
        })
        return () => unsubscribe();
    },[])

    return (
        <div className='dashboard'>
            <SideNavBar />
            <MainContent />
        </div>
    )
}


export default Dashboard