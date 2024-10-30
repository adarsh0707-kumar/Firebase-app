import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider } from 'firebase/auth';
import { app } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    
    const submitHandler = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(userData => {
                console.log(userData.user);
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
        })
        
    }

    const loginWithGoogle = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
        })
    }

    const loginWithFacebook = () => {
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Email' />
                <input onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Password' />
                <button type='submit'>LogIn</button>
                <br />
                <button type='button' onClick={loginWithGoogle}>Login with Google</button> 
                <button type='button' onClick={loginWithFacebook}>Login with Facebook</button> 
            </form>

            
        </>
    )
}

export default Login