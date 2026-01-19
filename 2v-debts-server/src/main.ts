import dotenv from 'dotenv';
import express, { type Response, type Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const { PORT, DATABASE_URL = '' } = process.env;

app.use(cors());
app.use(bodyParser.json());

app
  .listen(PORT, () => {
    console.log(`Server running at port: `, PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
