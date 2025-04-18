import { Request, Response, NextFunction } from 'express';
import redisClient from '../utils/redisClient.js';

export const cacheMiddleware = (keyGenerator: (req: Request) => string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = keyGenerator(req);

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log(`Cache hit for key: ${cacheKey}`);
        res.status(200).json(JSON.parse(cachedData));
        return;
      }
      console.log(`Cache miss for key: ${cacheKey}`);
      next();
    } catch (error) {
      console.error('Error accessing Redis cache:', error);
      next();
    }
  };
};
