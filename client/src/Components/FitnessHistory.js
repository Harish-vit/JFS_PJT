import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FitnessHistory.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function FitnessHistory({ token }) {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Calories Burnt',
                data: [],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            }
        ]
    });

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
                prepareChartData(sortedActivities);
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

    const prepareChartData = (activities) => {
        const dateCaloriesMap = new Map();
    
        activities.forEach(activity => {
            const date = new Date(activity.date).toLocaleDateString();
            const calories = parseFloat(activity.calories);
    
            if (dateCaloriesMap.has(date)) {
                dateCaloriesMap.set(date, dateCaloriesMap.get(date) + calories);
            } else {
                dateCaloriesMap.set(date, calories);
            }
        });
    
        const dates = Array.from(dateCaloriesMap.keys());
        const calories = Array.from(dateCaloriesMap.values()).map(calorie => calorie.toFixed(2));
    
        setChartData({
            labels: dates,
            datasets: [
                {
                    label: 'Calories Burnt',
                    data: calories,
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: '#55AD9B',
                }
            ]
        });
    };

    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: 'black'
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                }
            },
            y: {
                ticks: {
                    color: 'black'
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                }
            }
        }
    };
    

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
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/activities`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sortedActivities = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setActivities(sortedActivities);
            prepareChartData(sortedActivities);
        } catch (error) {
            console.error('Error deleting activity:', error.message);
            alert('Error deleting activity, please try again.');
        }
    };

    return (
        <div className='fitness-history'>
            <div className="ActivityHeader">
                <h2>Your Activities</h2>
                <div className="addButton">
                    <button onClick={handleAddActivity}>New Activity</button>
                </div>
            </div>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <Line data={chartData} options={chartOptions} />
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
