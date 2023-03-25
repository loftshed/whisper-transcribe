import { Configuration, OpenAIApi } from 'openai';
import env from '../config/env.mjs';
import fs from 'fs';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: env.OPENAI_API_KEY,
  })
);

const transcribe = async (file) => {
  try {
    // Save the file to disk temporarily
    const fileReadStream = fs.createReadStream(file.path);
    const response = await openai.createTranscription(fileReadStream, 'whisper-1');
    // Delete the file after transcription
    fs.unlinkSync(file.path);

    return response.data;
  } catch (error) {
    fs.unlinkSync(file.path);
    return error;
  }
};

export { transcribe };
