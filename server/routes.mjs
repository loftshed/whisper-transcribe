import express from 'express';

import { transcribe, summarize } from './utils/openai.mjs';
import { compress } from './utils/ffmpeg.mjs';
import { upload } from './utils/multer.mjs';

const router = express.Router();

const MAX_FILE_SIZE = 2097152;

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;
    // if (uploadedFile.size > MAX_FILE_SIZE) {
    //   const compressedFile = compress(uploadedFile);
    // }
    console.log(uploadedFile);

    const data = await transcribe(uploadedFile);
    res.status(200).json({ message: 'Transcription successful.', data });
  } catch (error) {
    res.status(500).json({ message: 'Error during transcription.', error });
  }
});

router.post('/summarize', async (req, res) => {
  try {
    const { text } = req?.body;
    const data = await summarize(text);
    res.status(200).json({ message: 'Server contacted successfully.', data });
  } catch (error) {
    res.status(500).json({ message: 'Error during transcription.', error });
  }
});

export { router };
