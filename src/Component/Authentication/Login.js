import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider, TwitterAuthProvider,GithubAuthProvider, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier } from 'firebase/auth/web-extension';

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(null);
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

    const loginWithX = () => {
        const auth = getAuth(app);
        const provider = new TwitterAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
            })
    }
    const loginWithGitHub = () => {
        const auth = getAuth(app);
        const provider = new GithubAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
            })
    }
    const sendOTP = () => {
        const auth = getAuth(app);
        const appVerifier = new RecaptchaVerifier(auth,'abc',{});
        signInWithPhoneNumber(auth, phone, appVerifier)
            .then(res => {
                console.log(res);
                console.log('OTP send');
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
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
                <button type='button' onClick={loginWithX}>Login with X</button> 
                <button type='button' onClick={loginWithGitHub}>Login with GitHub</button> 
                <br />
                <br />
                <h2>Login With OTP</h2>
                <input onChange={(e)=>{setPhone(e.target.value)}} placeholder='Phone Number' type='number' />
                <button type='button' onClick={sendOTP}>Send OTP</button> 
            </form>

            
        </>
    )
}

export default Login