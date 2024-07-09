import React from 'react';
import './FitnessHistory.css';
import { useNavigate } from 'react-router-dom';

function FitnessHistory({ activities }) {
    const navigate = useNavigate();

    const handleAddActivity = () => {
        navigate('/add-activity');
    };

    return (
        <div>
            <div className='ActivityHeader'>
                <h2>Your Activities</h2>
                <div className='addButton'>
                    <button onClick={handleAddActivity}>
                        Add Activity
                    </button>
                </div>
            </div>
            <ul style={{ padding: '0px' }}>
                {activities.map((record, index) => (
                    <div key={index} className='ActivityContainer'>
                        <p className="activityName">{record.workoutType}</p>
                        <div className="details">
                            <span>Duration: {record.duration} minutes</span>
                            <span>Intensity: {record.intensity}</span>
                            <span className="date">Date: {record.date}</span>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default FitnessHistory;
