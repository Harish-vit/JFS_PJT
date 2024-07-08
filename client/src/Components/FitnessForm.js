import React, { useState } from 'react';
import './FitnessForm.css'

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
            <div className='RecordContainer'>
                <form>
                    <input
                        className='Entry'
                        type="number"
                        placeholder="Duration (minutes)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        
                    />
                    <select className='Entry' value={workoutType} placeholder="" onChange={(e) => setWorkoutType(e.target.value)}>
                        <option value="" selected disabled>Select a workout type</option>
                        <option value="running">Running</option>
                        <option value="cycling">Cycling</option>
                        <option value="swimming">Swimming</option>
                    </select>
                    <select className='Entry' value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                        <option value="" selected disabled>Select an intensity</option>
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
                    <button className='SubmitButton' onClick={handleSubmit}>Submit</button>
                </form>
                
            </div>
            
        </div>
    );
}

export default FitnessForm;
