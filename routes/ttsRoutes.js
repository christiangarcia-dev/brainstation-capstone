const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

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
        const audioFilePath = path.join(__dirname, '..', 'public', 'audio', audioFileName); 

        fs.writeFileSync(audioFilePath, response.data); 

        res.json({ audio_url: `https://powerful-retreat-02048-8a481692b850.herokuapp.com/public/audio/${audioFileName}` });

    } catch (error) {
        console.error("Error from OpenAI API:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: "Error processing the text-to-speech request", 
            openAiResponse: error.response ? error.response.data : null 
        });
    }
});

module.exports = router;
