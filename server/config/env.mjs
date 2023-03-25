import * as dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

export default env;
