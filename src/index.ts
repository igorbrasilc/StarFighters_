import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app.js';
import errorHandling from './middlewares/errorHandling.js';
import "express-async-errors";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandling);

const port: number = +process.env.port || 4000;
app.listen(port, process.env.HOST, () => {
    console.log(`Running on http://localhost:${port}`);
});