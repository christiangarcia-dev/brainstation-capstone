const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/transcribe', upload.single('audio'), async (req, res) => {
    let filePath;
    try {
        filePath = path.join(__dirname, '..', req.file.path);

        // Prepare the audio file for sending
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        // Set up the request to Whisper API
        const response = await axios.post('https://api.openai.com/v1/whisper', formData, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                ...formData.getHeaders(),
            },
            responseType: 'json',
        });

        // Send the transcription response back
        res.json(response.data);
    } catch (error) {
        console.error('Error with Whisper API:', error);
        res.status(500).json({ message: 'Error transcribing audio', error: error.message });
    } finally {
        // Clean up uploaded file
        if (req.file  && filePath) {
            fs.unlinkSync(filePath);
        }
    }
});

module.exports = router;
