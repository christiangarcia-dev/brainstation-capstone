const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    storageBucket: 'gs://echolingo-dd50f.appspot.com'
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/audio', express.static('public/audio'));

const whisperRoutes = require('./routes/whisperRoutes');
const chatGptRoutes = require('./routes/gptRoutes');
const ttsRoutes = require('./routes/ttsRoutes');

app.use('/api/whisper', whisperRoutes);
app.use('/api/chatgpt', chatGptRoutes);
app.use('/api/tts', ttsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the EchoLingo server!");
});

module.exports = { admin };