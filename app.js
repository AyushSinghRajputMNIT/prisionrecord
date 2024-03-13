const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRoutes);
module.exports = app;