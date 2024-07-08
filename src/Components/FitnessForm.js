import React, { useState } from 'react';

function FitnessForm({ onSubmit }) {
    const [duration, setDuration] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [intensity, setIntensity] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

    const handleSubmit = () => {
        if (duration && workoutType && intensity) {
            onSubmit({ duration, workoutType, intensity, date });
        }
    };

    return (
        <div>
            <h2>Record Fitness Activity</h2>
            <input
                type="number"
                placeholder="Duration (minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />
            <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                <option value="">Select Workout Type</option>
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="swimming">Swimming</option>
                {/* Add more options as needed */}
            </select>
            <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                <option value="">Select Intensity</option>
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="intense">Intense</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default FitnessForm;
