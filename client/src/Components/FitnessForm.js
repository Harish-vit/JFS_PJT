import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FitnessForm.css';
import { useNavigate } from 'react-router-dom';

function FitnessForm({ initialData, onSubmit, token, isEdit }) {
    const [duration, setDuration] = useState(initialData?.duration || '');
    const [activityName, setActivityName] = useState(initialData?.activityName || '');
    const [intensity, setIntensity] = useState(initialData?.intensity || '');
    const [date, setDate] = useState(initialData?.date ? initialData.date.substring(0, 10) : new Date().toISOString().substring(0, 10));
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setDuration(initialData.duration);
            setActivityName(initialData.activityName);
            setIntensity(initialData.intensity);
            setDate(initialData.date.substring(0, 10));
        }
    }, [initialData]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!duration || !activityName || !intensity) {
                throw new Error('Please fill in all fields.');
            }
    
            const newActivity = { duration, activityName, intensity, date };
            let response;
            
            if (isEdit) {
                response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/activities/${initialData._id}`, newActivity, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/addactivities`, newActivity, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
    
            console.log(response.data.activity);
            navigate('/history');
        } catch (error) {
            console.error('Error recording activity:', error.message);
        }
    };
    
    
    const handleBack = () => {
        navigate('/history');
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const today = new Date().toISOString().substring(0, 10);
        
        if (selectedDate <= today) {
            setDate(selectedDate);
        } else {
            alert('Please select a date not in the future.');
        }
    };

    return (
        <div className='fitness-form'>
            <h2 className='record-title'>{isEdit ? 'Edit Activity' : 'Record Fitness Activity'}</h2>
            <div className='RecordContainer'>
                <form onSubmit={handleSubmit}>
                    <input
                        className='Entry'
                        type="number"
                        placeholder="Duration (minutes)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <select className='Entry' value={activityName} onChange={(e) => setActivityName(e.target.value)}>
                        <option value="" disabled>Select a workout type</option>
                        <option value="Cardio Workouts">Cardio Workouts</option>
                        <option value="Strength Workouts">Strength Workouts</option>
                        <option value="Flexibility and Balance">Flexibility and Balance</option>
                        <option value="Sport-Specific Workouts">Sport-Specific Workouts</option>
                        <option value="Outdoor Activities">Outdoor Activities</option>
                    </select>
                    <select className='Entry' value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                        <option value="" disabled>Select an intensity</option>
                        <option value="slow">Slow</option>
                        <option value="medium">Medium</option>
                        <option value="intense">Intense</option>
                    </select>
                    <input
                        className='Entry'
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        max={new Date().toISOString().substring(0, 10)} // Set max attribute to today's date
                    />
                    <span>
                        <button type="submit" className='SubmitButton'>{isEdit ? 'Update' : 'Submit'}</button>
                        <button type="button" className='BackButton' onClick={handleBack}>Back</button>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default FitnessForm;
