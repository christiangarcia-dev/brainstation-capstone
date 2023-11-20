// routes/transcriptRoutes.js
const express = require('express');
const router = express.Router();
const transcriptController = require('../controllers/transcriptController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/', isAuthenticated, transcriptController.saveTranscript);
router.get('/', isAuthenticated, transcriptController.listTranscripts);
router.get('/:id', isAuthenticated, transcriptController.getTranscript);
router.put('/:id', isAuthenticated, transcriptController.updateTranscript);
router.delete('/:id', isAuthenticated, transcriptController.deleteTranscript);

module.exports = router;