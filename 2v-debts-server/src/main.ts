import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './infrastructure/web/routes';
import { connectRedis } from './infrastructure/database/redis';
import { errorHandler } from './infrastructure/web/middlewares/error-handler.middleware';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler);

async function RedisBootstrap() {
  await connectRedis();
}

app
  .listen(PORT, async () => {
    console.log(`Server running at port: `, PORT);
    RedisBootstrap();
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
