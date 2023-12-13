const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const stream = require('stream');
const { admin } = require('../firebaseAdmin');

router.post('/createspeech', async (req, res) => {
    console.log("Received TTS request:", req.body);
    const { text } = req.body; 
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

    const payload = {
        model: "tts-1-hd", 
        input: text, 
        voice: "fable",
    };

    try {
        const response = await axios.post("https://api.openai.com/v1/audio/speech", payload, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            responseType: 'arraybuffer' 
        });

        const audioFileName = `tts-${Date.now()}.mp3`; 
        const bufferStream = new stream.PassThrough();
        bufferStream.end(Buffer.from(response.data, 'binary'));

        const bucket = admin.storage().bucket();
        const file = bucket.file(audioFileName);

        bufferStream.pipe(file.createWriteStream({
            metadata: {
                contentType: 'audio/mpeg',
            }
        }))
        .on('error', (err) => {
            console.error('Storage write error:', err);
            res.status(500).json({ error: 'Error saving audio to storage' });
        })
        .on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;
            res.json({ audio_url: publicUrl });
        });

    } catch (error) {
        console.error("Error from OpenAI API:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: "Error processing the text-to-speech request", 
            openAiResponse: error.response ? error.response.data : null 
        });
    }
});

module.exports = router;
