import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import router from './router';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, `./config/${process.env.NODE_ENV}.env`) });

const PORT = process.env.PORT;

export const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(router);

export const server = app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} 🚀`));
