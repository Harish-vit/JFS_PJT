import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FitnessForm from './FitnessForm';

function EditActivity({ token }) {
    const { id } = useParams(); // Get the activity ID from the URL params
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/activities/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setActivity(response.data);
                // alert('Success.')
            } catch (error) {
                console.error('Error fetching activity:', error.message);
                alert('Error fetching activity, please try again.');
            }
        };
    
        fetchActivity();
    }, [id, token]);
    
    const handleUpdateActivity = async (updatedActivity) => {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/activities/${id}`, updatedActivity, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Activity updated successfully");
            alert('Activity updated successfully');
            navigate('/history');
        
    };

    return (
        <div>
            {activity && (
                <FitnessForm initialData={activity} onSubmit={handleUpdateActivity} token={token} isEdit={true} />
            )}
        </div>
    );
}

export default EditActivity;
