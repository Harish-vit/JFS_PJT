import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = () => {
        if (user.email && user.password) {
            navigate('/history');
        }
    };

    const handleSignUp = () => {
        navigate('/register');
      };

    return (
        <div className="login-body">
            <div className="login-center-container">
                <div className="login-form-container">
                    <div className="login-header">
                        Login To Your Account
                    </div>
                    <div className="login-form">
                        <form action="#" autoComplete="off">
                            <div className="login-form-relative">
                                <input
                                    type="text"
                                    id="login-sign-in-email"
                                    className="login-form-input"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    autoComplete="username"
                                />
                            </div>
                            <div className="login-form-relative">
                                <input
                                    type="password"
                                    id="login-sign-in-password"
                                    className="login-form-input"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Your password"
                                    autoComplete="current-password"
                                />
                            </div>
                            <div className="login-form-group">
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleSubmit}
                                >
                                    Login
                                </button>
                                <button className="button" onClick={handleSignUp}>Sign Up</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
