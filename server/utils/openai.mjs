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

const summarize = async (text) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a bot whose purpose is to condense a transcript into the most salient points. Please return your response as an array of strings, one per line.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const summary = response.data.choices[0].message.content;

    return summary;
  } catch (error) {
    return error;
  }
};

export { transcribe, summarize };
