import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile({ token }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        username: '',
        email: '',
        height: '',
        weight: '',
        gender: ''
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
                alert('Error fetching user details, please try again.');
            }
        };

        if (token) {
            fetchUserDetails();
        } else {
            alert('No token found, please login first.');
            navigate('/');
        }
    }, [token, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/details`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user details:', error.message);
            alert('Error updating user details, please try again.');
        }
    };

    const handleBack = () => {
        navigate('/history');
    };

    return (
        <div >
            {user && (
                <div className='profileContainer'>
                    <h2>User Details</h2>
                    <div className='profileDetails' >
                        <p>
                            <label className='Labels'>Name:</label>
                            {isEditing ? <input type="text" name="name" value={formData.name} onChange={handleInputChange} /> : <label>{user.name}</label>}
                        </p>
                        <p>
                            <label className='Labels'>Age:</label>
                            {isEditing ? <input type="number" name="age" value={formData.age} onChange={handleInputChange} /> : <label>{user.age}</label>}
                        </p>
                        <p>
                            <label className='Labels'>Username:</label>
                            {isEditing ? <input type="text" name="username" value={formData.username} onChange={handleInputChange} /> : <label>{user.username}</label>}
                        </p>
                        <p>
                            <label className='Labels'>Email:</label>
                            {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleInputChange} /> : <label>{user.email}</label>}
                        </p>
                        <p>
                            <label className='Labels'>Height:</label>
                            {isEditing ? <input type="number" name="height" value={formData.height} onChange={handleInputChange} /> : <label>{user.height}</label>}
                        </p>
                        <p>
                            <label className='Labels'>Weight:</label>
                            {isEditing ? <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} /> : <label>{user.weight}</label>}
                        </p>
                        <p>
                            <label className='Labels'>Gender:</label>
                            {isEditing ? (
                                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                    <option value="" disabled>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : <label>{user.gender}</label>}
                        </p>
                    </div>
                    <div className='buttonContainer'>
                        <button onClick={isEditing ? handleSave : handleEdit}>
                            {isEditing ? 'Ok' : 'Edit'}
                        </button>
                        <button onClick={handleBack}>Back</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
