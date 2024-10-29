import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user);
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
        })
    }


    return (
        <>
            <form onSubmit={submitHandler}>
                <input onChange={(e) =>{setEmail(e.target.value)}} type='email' placeholder='Email' />
                <input onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Password' />
                <button type='submit'>SignUp</button>
            </form>
        </>
    )
}

export default SignUp