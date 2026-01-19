import dotenv from 'dotenv';
import express, { type Response, type Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './infrastructure/web/routes';
import { errorHandler } from './infrastructure/web/middlewares/error-handler.middleware';

dotenv.config();
const app = express();
const { PORT, DATABASE_URL = '' } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`Server running at port: `, PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
