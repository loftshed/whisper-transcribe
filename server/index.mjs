import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routes.mjs';
import env from './config/env.mjs';

const PORT = env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
