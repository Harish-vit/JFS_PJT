const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModels');

const userRoute = express.Router();

const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded user information to request object
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

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

// Get all user activities
userRoute.get('/activities', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('activities');

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
userRoute.post('/addactivities', authenticateToken, async (req, res) => {
    const { duration, intensity, activityName, date } = req.body;

    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate calories based on user details
        const { weight, height, age, gender } = user;
        let BMR;

        if (gender === 'male') {
            BMR = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === 'female') {
            BMR = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            return res.status(400).json({ message: 'Invalid gender' });
        }

        let calorieCalculation;

        if (intensity === 'slow') {
            calorieCalculation = BMR * 1.2;
        } else if (intensity === 'medium') {
            calorieCalculation = BMR * 1.55;
        } else if (intensity === 'intense') {
            calorieCalculation = BMR * 1.9;
        } else {
            return res.status(400).json({ message: 'Invalid intensity' });
        }

        const newActivity = {
            duration,
            intensity,
            activityName,
            calories: calorieCalculation,
            date
        };
        user.activities.push(newActivity);
        await user.save();

        res.status(201).json({ message: 'Activity added successfully' });
    } catch (error) {
        console.error('Error adding activity:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get activity by ID
userRoute.get('/activities/:id', authenticateToken, async (req, res) => {
    const activityId = req.params.id;

    try {
        const user = await User.findById(req.user.id).select('activities');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const activity = user.activities.id(activityId);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.json(activity);
    } catch (error) {
        console.error('Error fetching activity:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update activity by ID
userRoute.put('/activities/:id', authenticateToken, async (req, res) => {
    const { duration, intensity, activityName } = req.body;
    const activityId = req.params.id;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const activityToUpdate = user.activities.id(activityId);

        if (!activityToUpdate) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        activityToUpdate.duration = duration;
        activityToUpdate.intensity = intensity;
        activityToUpdate.activityName = activityName;

        await user.save();

        res.json({ message: 'Activity updated successfully' });
    } catch (error) {
        console.error('Error updating activity:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get the user details
userRoute.get('/details', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -activities'); // Exclude password and activities
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// Delete activity by ID
userRoute.delete('/activities/:id', authenticateToken, async (req, res) => {
    const activityId = req.params.id;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.activities = user.activities.filter(activity => activity._id != activityId);
        await user.save();

        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Error deleting activity:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user details
userRoute.put('/details', authenticateToken, async (req, res) => {
    const { name, age, username, email, height, weight, gender } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.age = age;
        user.username = username;
        user.email = email;
        user.height = height;
        user.weight = weight;
        user.gender = gender;

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error updating user details:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = userRoute;
