import { useRef } from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();

        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords do not match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }

            try {
                await axios.post("/auth/register", user)
                navigate("/login")
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Lamasocial</h3>
                    <span className="registerDesc">Connect with friends and the world around you</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input type="text" placeholder='Username' required ref={username} className="registerInput" />
                        <input type="email" placeholder='Email' required ref={email} className="registerInput" />
                        <input type="password" minLength={6} placeholder='Password' required ref={password} className="registerInput" />
                        <input type="password" minLength={6} placeholder='Repeat password' required ref={confirmPassword} className="registerInput" />
                        <button type='submit' className="registerButton">Sign Up</button>
                        <button className="registerRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
