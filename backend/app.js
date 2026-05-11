const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const studentDashboardRoutes=require('./routes/studentDashboard');


const app = express();







// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/users', userRoutes);
app.use('/student-dashboard/',studentDashboardRoutes);



// Test Route
app.get('/', (req, res) => {
    res.json({
        message: 'ImpactBridge API Running'
    });
});

module.exports = app;