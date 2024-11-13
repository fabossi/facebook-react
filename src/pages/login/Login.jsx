import { useContext, useRef } from 'react';
import './Login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';

export default function Login() {
    const email = useRef();
    const password = useRef();

    const { isFetching, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">Connect with friends and the world around you</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" placeholder='Email' className="loginInput" ref={email} required />
                        <input type="password" placeholder='******' className="loginInput" ref={password} required minLength={6} />
                        <button className="loginButton" type='submit' disabled={isFetching}>{isFetching ? <CircularProgress color='white' size={'20px'} /> : 'Log In'}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" >Create a new account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
