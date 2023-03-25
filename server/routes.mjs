import express from 'express';

import { transcribe } from './utils/openai.mjs';
import { upload } from './utils/multer.mjs';

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  const uploadedFile = req.file;

  try {
    const data = await transcribe(uploadedFile);
    res.status(200).json({ message: 'Transcription successful.', data });
  } catch (error) {
    res.status(500).json({ message: 'Error during transcription.' });
  }
});

export { router };
