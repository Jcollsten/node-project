import { createClient } from 'redis';
import logger from './loggerUtil.js';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  await redisClient.connect();
  logger.info('Connected to Redis');
})();

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing Redis client');
  await redisClient.quit();
  process.exit(0);
});

export default redisClient;
