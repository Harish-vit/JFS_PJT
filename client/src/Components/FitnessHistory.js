import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FitnessHistory.css';
import FitnessForm from './FitnessForm'; // Assuming you have a FitnessForm component for editing

function FitnessHistory({ token }) {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/activities`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const sortedActivities = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setActivities(sortedActivities);
            } catch (error) {
                console.error('Error fetching activities:', error.message);
                alert('Error fetching activities, please try again.');
            }
        };

        if (token) {
            fetchActivities();
        } else {
            alert('No token found, please login first.');
            navigate('/');
        }
    }, [token, navigate]);

    const handleAddActivity = () => {
        navigate('/add-activity');
    };

    const handleEditActivity = (activityId) => {
        navigate(`/edit-activity/${activityId}`);
    };

    const handleDeleteActivity = async (activityId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/activities/${activityId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // After deletion, fetch updated activities list
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/activities`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sortedActivities = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setActivities(sortedActivities);
        } catch (error) {
            console.error('Error deleting activity:', error.message);
            alert('Error deleting activity, please try again.');
        }
    };

    return (
        <div>
            <div className="ActivityHeader">
                <h2>Your Activities</h2>
                <div className="addButton">
                    <button onClick={handleAddActivity}>Add Activity</button>
                </div>
            </div>
            <ul style={{ padding: '0px' }}>
                {activities.map((record, index) => (
                    <div key={index} className='ActivityContainer'>
                        <p className="activityName">{record.activityName}</p>
                        <div className="details">
                            <span>{parseFloat(record.calories).toFixed(2)} Cal</span>
                            <span>{record.duration} min</span>
                            <span>{record.intensity.charAt(0).toUpperCase() +
                                record.intensity.substr(1).toLowerCase()}</span>
                            <span className="date">
                                {new Date(record.date).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="buttons">
                            <button className="edit" onClick={() => handleEditActivity(record._id)}>Edit</button>
                            <button className="delete" onClick={() => handleDeleteActivity(record._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default FitnessHistory;
