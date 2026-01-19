import { createClient } from 'redis';
import 'dotenv/config';

export const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (err) => console.log('Redis clients error', err));
redisClient.on('connect', () => console.log('Redis client init'));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
