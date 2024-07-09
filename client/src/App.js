import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './Components/Login';
import Registration from './Components/Registration';
import FitnessHistory from './Components/FitnessHistory';
import FitnessForm from './Components/FitnessForm';
import './App.css';

function App() {
    const [activities, setActivities] = useState([]);
    const [token, setToken] = useState(null); // State to store the token

    const handleFormSubmit = (newActivity) => {
        setActivities((prevActivities) => [...prevActivities, newActivity]);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <header>
                                <h1>Fitness Tracker App</h1>
                                <Login setToken={setToken} />
                            </header>
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
                            <Layout>
                                <FitnessHistory activities={activities} token={token} />
                            </Layout>
                        }
                    />
                    <Route
                        path="/add-activity"
                        element={
                            <Layout>
                                <FitnessForm onSubmit={handleFormSubmit} token={token} />
                            </Layout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
