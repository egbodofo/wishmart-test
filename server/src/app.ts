import express, { Application } from 'express';
import UserRouter from './routes/user';
import ProdRouter from './routes/product';
import dotenv from 'dotenv';
import cors from 'cors';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

import './db/mongoose';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(ProdRouter);

export default app;
