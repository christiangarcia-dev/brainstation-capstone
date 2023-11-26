// routes/gptRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const payload = {
        model: "gpt-4-1106-preview", 
        messages: [
            { role: "system", content: `Translate the following text to ${targetLanguage}:` },
            { role: "user", content: text }
        ]
    };

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        });

        console.log("OpenAI Response:", response.data);
        const latestMessage = response.data.choices[0].message.content;
        res.json({ translatedText: latestMessage.trim() });
    } catch (error) {
        console.error("Error from OpenAI API:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: "Error processing the translation request", 
            openAiResponse: error.response ? error.response.data : null 
        });
    }
});

module.exports = router;
