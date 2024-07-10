import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.css';

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
        <div className={styles.profileContainer}>
            {user && (
                <div>
                    <h2>User Details</h2>
                    <div className={styles.profileDetails}>
                        <p>
                            <label>Name:</label>
                            {isEditing ? <input type="text" name="name" value={formData.name} onChange={handleInputChange} /> : <span>{user.name}</span>}
                        </p>
                        <p>
                            <label>Age:</label>
                            {isEditing ? <input type="number" name="age" value={formData.age} onChange={handleInputChange} /> : <span>{user.age}</span>}
                        </p>
                        <p>
                            <label>Username:</label>
                            {isEditing ? <input type="text" name="username" value={formData.username} onChange={handleInputChange} /> : <span>{user.username}</span>}
                        </p>
                        <p>
                            <label>Email:</label>
                            {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleInputChange} /> : <span>{user.email}</span>}
                        </p>
                        <p>
                            <label>Height:</label>
                            {isEditing ? <input type="number" name="height" value={formData.height} onChange={handleInputChange} /> : <span>{user.height}</span>}
                        </p>
                        <p>
                            <label>Weight:</label>
                            {isEditing ? <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} /> : <span>{user.weight}</span>}
                        </p>
                        <p>
                            <label>Gender:</label>
                            {isEditing ? (
                                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                    <option value="" disabled>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : <span>{user.gender}</span>}
                        </p>
                    </div>
                    <div className={styles.buttonContainer}>
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
