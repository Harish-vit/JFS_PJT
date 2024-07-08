import React, { useState } from 'react';
import Layout from './Components/Layout';
import SignIn from './Components/SignIn';
import FitnessForm from './Components/FitnessForm';
import FitnessHistory from './Components/FitnessHistory';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [records, setRecords] = useState([{date:'09.04.2024', duration: '60', workoutType: 'Running', intensity: 'medium'}]);

    const handleSignIn = (username) => {
        setUser(username);
    };

    const handleSignOut = () => {
        setUser(null);
        setRecords([]);
    };

    // if (!user) {
    //     return <SignIn onSignIn={handleSignIn} />;
    // }

    return (
        <Layout>
            
            {/* <FitnessHistory /> */}
            <FitnessForm />
        </Layout>
    );
}

export default App;
