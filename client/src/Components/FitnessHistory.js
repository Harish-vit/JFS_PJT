import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FitnessHistory.css';

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
                setActivities(response.data);
                // console.log(response.data)
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
                            <span>{record.calories} Cal</span>
                            <span>{record.duration} min</span>
                            <span>{record.intensity.charAt(0).toUpperCase() +
                            record.intensity.substr(1).toLowerCase()}</span>
                            <span className="date">{record.date}</span>
                        </div>
                        <div className="buttons">
                            <button className="edit">Edit</button>
                            <button className="delete">Delete</button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default FitnessHistory;
