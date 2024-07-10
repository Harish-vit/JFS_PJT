import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css'

const Registration = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        
        const user = {
            name,
            email,
            username,
            password,
            age,
            height,
            weight,
            gender,
        };

        try {
            console.log(user)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, user);
            alert(response.data.message);
            navigate('/'); // Redirect to login page or home page
        } catch (error) {
            console.error('Registration failed:', error.message);
            alert('Registration failed, please try again.');
        }
    };

    return (
        <div className='register-container'>
            <h2 className='reg-title'>Register Here!!!</h2>
            <div className='form-container'>
                <form className='form-content' onSubmit={handleRegister}>
                    <label>
                        Name:
                        <input
                            className='Entry'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            className='Entry'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Username:
                        <input
                            className='Entry'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            className='Entry'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Age:
                        <input
                            className='Entry'
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Height (cm):
                        <input
                            className='Entry'
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Weight (kg):
                        <input
                            className='Entry'
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Gender:
                        <select className='gender-entry' value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="" disabled>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <button className='SubmitButton' type="submit">Register</button>
                </form>
            </div>
        </div>
    )
};

export default Registration;
