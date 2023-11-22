// server.js 
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");


// Firebase configuration and initialization 
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);

const app = express();
app.use(cors());
app.use(express.json());

// Routes variables 
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const translationRoutes = require('./routes/translationRoutes');
const transcriptsRoutes = require('./routes/transcriptsRoutes');

// Routes initialization 
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/translate', translationRoutes);
app.use('./transcripts', transcriptsRoutes);

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