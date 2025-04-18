import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import logger from './utils/loggerUtil.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use('/api', routes);

// global logging for handling errors in routes and middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
  });
});

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
io.on('connection', (socket) => {
  logger.info('WebSocket connection established', { socketId: socket.id });

  socket.on('disconnect', () => {
    logger.info('WebSocket connection closed', { socketId: socket.id });
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
