// server.js 
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const translationRoutes = require('./routes/translationRoutes');
const transcriptsRoutes = require('./routes/transcriptsRoutes');
const passport = require('./middleware/passport');
const session = require('express-session');

// routes 
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/translate', translationRoutes);
app.use('./transcripts', transcriptsRoutes);

// initialize passport and session 
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the EchoLingo server!");
});