import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = ({ setToken }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    const login = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, user);
            setToken(response.data.token); // Sets the token in the App state
            navigate('/history');
        } catch (error) {
            console.error('Login failed:', error.message);
            alert('Login failed, please try again.');
            setUser({});
        }
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
                                    id="login-sign-in-username"
                                    className="login-form-input"
                                    name="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    placeholder="Your username"
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
                                    onClick={login}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleSignUp}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
