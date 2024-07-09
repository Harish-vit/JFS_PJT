import React, { useState } from 'react';
import './FitnessForm.css';
import { useNavigate } from 'react-router-dom';

function FitnessForm({ onSubmit }) {
    const [duration, setDuration] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [intensity, setIntensity] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (duration && workoutType && intensity) {
            onSubmit({ duration, workoutType, intensity, date });
            navigate('/history');
        }
    };

    const handleBack = () => {
        navigate('/history');
    };

    return (
        <div>
            <h2>Record Fitness Activity</h2>
            <div className='RecordContainer'>
                <form onSubmit={handleSubmit}>
                    <input
                        className='Entry'
                        type="number"
                        placeholder="Duration (minutes)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <select className='Entry' value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                        <option value="" disabled>Select a workout type</option>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Swimming">Swimming</option>
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
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <span>
                        <button type="submit" className='SubmitButton'>Submit</button>
                        <button type="button" className='BackButton' onClick={handleBack}>Back</button>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default FitnessForm;
