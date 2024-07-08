import React, { useState } from 'react';
import './FitnessHistory.css';
import { useNavigate } from 'react-router-dom';

function FitnessHistory() {
    const navigate = useNavigate()
    const [records, setRecords] = useState([{date:'09.04.2024', duration: '60', workoutType: 'Running', intensity: 'medium'}]);

    const handleAddActivity = () => {
        navigate('/add-activity');
    };

    const onDelete = (index) => {
        const newRecords = [...records];
        newRecords.splice(index, 1);
        setRecords(newRecords);
    };

    const onEdit = (index) => {
        // Implement the update logic here
    };

    return (
        <div>
            <div className='ActivityHeader'>
                <h2>Your Activities</h2>
                <div className='addButton'>
                    <button onClick= { handleAddActivity } >
                        Add Activity
                    </button>
                </div>
            </div>
            <ul style={{ padding: '0px' }}>
                {records.map((record, index) => (
                    <div key={index} className='ActivityContainer'>
                        <p className="activityName">{record.workoutType}</p>
                        <div className="details">
                            <span>Calories</span>
                            <span>{record.duration} minutes</span>
                            <span>{record.intensity}</span>
                            <span className="date">{record.date}</span>
                        </div>
                        <div className="buttons">
                            <button className="edit" onClick={() => onEdit(index)}>Edit</button>
                            <button className="delete" onClick={() => onDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </ul>

        </div>
    );
}

export default FitnessHistory;
