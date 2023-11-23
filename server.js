// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const whisperRoutes = require('./routes/whisperRoutes');
// const chatGptRoutes = require('./routes/gptRoutes');

app.use('/api/whisper', whisperRoutes);
// app.use('/api/chatgpt', chatGptRoutes);

// Additional routes and middleware...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the EchoLingo server!");
});
