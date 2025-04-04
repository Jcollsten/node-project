import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createRoomService = async (data) => {
    return prisma.room.create({
        data,
    });
};
export const getAllRoomsService = async () => {
    return prisma.room.findMany();
};
export const getRoomByIdService = async (id) => {
    return prisma.room.findUnique({
        where: { id },
    });
};
export const updateRoomService = async (id, updatedData) => {
    return prisma.room.update({
        where: { id },
        data: updatedData,
    });
};
export const deleteRoomService = async (id) => {
    return prisma.room.delete({
        where: { id },
    });
};
