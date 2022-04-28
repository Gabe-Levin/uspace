import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import router from './router';
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(router);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} 🚀`));
