// routes/whisperRoutes.js
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/transcribe', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.status(400).send('No file uploaded.');
    }

    console.log("Received file:", req.file);

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const model = "whisper-1";

    const formData = new FormData();
    formData.append("model", model);
    formData.append("file", fs.createReadStream(req.file.path), req.file.originalname);

    console.log("Sending request to OpenAI...");

    axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
    })
    .then((response) => {
        fs.unlinkSync(req.file.path); 
        console.log("Transcription successful");
        res.json(response.data);
    })
    .catch((error) => {
        console.error("Error from OpenAI API:", error.response ? error.response.data : error);
        res.status(500).json({ 
            error: "Error processing the request", 
            openAiResponse: error.response ? error.response.data : null 
        });
    });
});

module.exports = router;
