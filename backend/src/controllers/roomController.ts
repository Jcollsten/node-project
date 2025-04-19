import { Request, Response } from 'express';
import { createRoomService, getAllRoomsService, getRoomByIdService, updateRoomService, deleteRoomService } from '../services/roomService.js';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/loggerUtil.js';

export const createRoom = async (req: Request, res: Response): Promise<void> => {
  logger.info('Creating a new room');
  try {
    const { name, capacity, type } = req.body;

    if (!name || !capacity || !type) {
      logger.warn('Room creation failed: Missing required fields');
      res.status(400).json({ message: 'Please provide name, capacity, and type' });
      return;
    }

    const result = await createRoomService({ name, capacity, type });
    await redisClient.del('allRooms');
    logger.info('Room created successfully and cache invalidated');
    res.status(201).json(result);
  } catch (error) {
    logger.error('Error in createRoom:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
  logger.info('Fetching all rooms');
  try {
    const rooms = await getAllRoomsService();
    await redisClient.set('allRooms', JSON.stringify(rooms), { EX: 3600 });
    logger.info('All rooms fetched and cached');
    res.status(200).json(rooms);
  } catch (error) {
    logger.error('Error in getAllRooms:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.body;
    const room = await getRoomByIdService(Number(roomId));
    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }
    res.status(200).json(room);
  } catch (error) {
    logger.error('Error in getRoomById:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.body;
    const updatedData = req.body;
    const updatedRoom = await updateRoomService(Number(roomId), updatedData);
    await redisClient.del('allRooms');
    res.status(200).json(updatedRoom);
  } catch (error) {
    logger.error('Error in updateRoom:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;
    await deleteRoomService(Number(roomId));
    await redisClient.del('allRooms');
    res.status(204).send();
  } catch (error) {
    logger.error('Error in deleteRoom:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
