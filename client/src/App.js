import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from './Components/Login';
import Registration from './Components/Registration';
import FitnessHistory from './Components/FitnessHistory';
import FitnessForm from './Components/FitnessForm';
import EditActivity from './Components/EditActivity';
import Profile from './Components/Profile';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token')); // Retrieve token from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(!!token); // Check if token exists

    const handleLogin = (token) => {
        setToken(token);
        setIsLoggedIn(true);
        localStorage.setItem('token', token); // Store token in localStorage
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setToken(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/history" />
                            ) : (
                                <header>
                                    <span className='log-header'>
                                        <h1 className='log-title'>Log In to FitFocus Now!</h1>
                                    </span>
                                    <Login setToken={handleLogin} />
                                </header>
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <header>
                                <span className='log-header'>
                                    <h1 className='log-title'>Join FitFocus</h1>
                                    <p className='log-quote'> ~ "Your Personalized Path to Fitness Awaits!"</p>
                                </span>
                                <Registration />
                            </header>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <Layout onLogout={handleLogout}>
                                <FitnessHistory token={token} />
                            </Layout>
                        }
                    />
                    <Route
                        path="/add-activity"
                        element={
                            <Layout onLogout={handleLogout}>
                                <FitnessForm token={token} />
                            </Layout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <Layout onLogout={handleLogout}>
                                <Profile token={token} />
                            </Layout>
                        }
                    />
                    <Route
                        path="/edit-activity/:id"
                        element={
                            <Layout onLogout={handleLogout}>
                                <EditActivity token={token} />
                            </Layout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
