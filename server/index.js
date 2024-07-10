const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./Routes/UserRoutes');
const cors = require('cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors())
app.use(express.json());
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
