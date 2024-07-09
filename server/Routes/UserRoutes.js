const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModels');

const userRoute = express.Router();

// JWT secret
const JWT_SECRET = 'your_jwt_secret_key';

// Register a new user
userRoute.post('/register', async (req, res) => {
    const { name, age, username, password, email, height, weight, gender } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            age,
            username,
            password: hashedPassword,
            email,
            height,
            weight,
            gender,
            activities: []
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login user
userRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user activities
userRoute.get('/activities', async (req, res) => {
    const token = req.headers['authorization']?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('activities');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.activities);
    } catch (error) {
        console.error('Error fetching activities:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add activity to user
userRoute.post('/addactivities', async (req, res) => {
    const token = req.headers['authorization']?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const { duration, intensity, activityName, date } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // User details for BMR calculation
        const { weight, height, age, gender } = user;

        // Calculate BMR based on gender
        let BMR;
        if (gender === 'male') {
            BMR = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === 'female') {
            BMR = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            return res.status(400).json({ message: 'Invalid gender' });
        }

        // Calculate total daily calorie needs based on intensity
        let calorieCalculation;
        if (intensity === 'Slow') {
            calorieCalculation = BMR * 1.2;
        } else if (intensity === 'Medium') {
            calorieCalculation = BMR * 1.55;
        } else if (intensity === 'Intense') {
            calorieCalculation = BMR * 1.9;
        } else {
            return res.status(400).json({ message: 'Invalid intensity' });
        }

        // Creating the new activity
        const newActivity = {
            duration,
            intensity,
            activityName,
            calories: calorieCalculation,  // Added calorie calculation
            date
        };
        
        // Add the new activity to user's activities
        user.activities.push(newActivity);
        await user.save();

        res.status(201).json({ message: 'Activity added successfully' });
    } catch (error) {
        console.error('Error adding activity:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = userRoute;
