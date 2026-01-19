import { redisClient } from '../database/redis';

export async function getCache<T>(key: string): Promise<T | null> {
  const cached = await redisClient.get(key);
  return cached ? JSON.parse(cached) : null;
}

export async function setCache(key: string, value: unknown, ttlSeconds = 60) {
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttlSeconds,
  });
}

export async function deleteCacheByPattern(pattern: string) {
  const keys = await redisClient.keys(pattern);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
}
