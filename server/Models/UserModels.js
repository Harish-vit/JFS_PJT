const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    duration: { type: Number, required: true },
    intensity: { type: String, required: true },
    activityName: { type: String, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: true },
    activities: [activitySchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
