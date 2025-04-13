import { createRoomService, getAllRoomsService, getRoomByIdService, updateRoomService, deleteRoomService } from '../services/roomService.js';
export const createRoom = async (req, res) => {
    try {
        const { name, capacity, type } = req.body;
        if (!name || !capacity || !type) {
            res.status(400).json({ message: 'Please provide name, capacity, and type' });
            return;
        }
        const result = await createRoomService({ name, capacity, type });
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error in createRoom:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await getAllRoomsService();
        res.status(200).json(rooms);
    }
    catch (error) {
        console.error('Error in getAllRooms:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await getRoomByIdService(Number(id));
        if (!room) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }
        res.status(200).json(room);
    }
    catch (error) {
        console.error('Error in getRoomById:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedRoom = await updateRoomService(Number(id), updatedData);
        res.status(200).json(updatedRoom);
    }
    catch (error) {
        console.error('Error in updateRoom:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteRoomService(Number(id));
        res.status(204).send();
    }
    catch (error) {
        console.error('Error in deleteRoom:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
