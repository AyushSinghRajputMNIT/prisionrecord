const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const prisonerRoutes = require('./routes/prisonerRoutes');
const prisonRoutes = require('./routes/prisonRoutes');
const caseRoutes = require('./routes/caseRoutes');
const viewRoutes = require('./routes/viewRoutes')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/prisoner', prisonerRoutes);
app.use('/api/v1/prison', prisonRoutes);
app.use('/api/v1/case', caseRoutes);
app.use('/', viewRoutes)

module.exports = app;