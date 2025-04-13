import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379', // Update if Redis is hosted elsewhere
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
})();

export default redisClient;
