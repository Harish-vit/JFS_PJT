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

    // Function to handle login and set token
    const handleLogin = (token) => {
        setToken(token);
        setIsLoggedIn(true);
        localStorage.setItem('token', token); // Store token in localStorage
    };

    // Function to handle logout
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
                                    <h1>Fitness Tracker App</h1>
                                    <Login setToken={handleLogin} />
                                </header>
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <header>
                                <h1>Fitness Tracker App</h1>
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
