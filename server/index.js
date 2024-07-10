const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./Routes/UserRoutes');
const cors = require('cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: [
        "*",
        // "http://localhost:3000/",
        "https://fitnessapp-client.vercel.app",
        "https://fitnessapp-server.vercel.app"
    ],
    credentials: true
}))
app.use(express.json());
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app