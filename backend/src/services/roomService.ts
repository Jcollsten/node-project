import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRoomService = async (data: { name: string; capacity: number; type: string }) => {
  const room = await prisma.room.create({
    data,
  });

  return room;
};

export const getAllRoomsService = async () => {
  return prisma.room.findMany();
};

export const getRoomByIdService = async (id: number) => {
  return prisma.room.findUnique({
    where: { id },
  });
};

export const updateRoomService = async (id: number, updatedData: Partial<{ name: string; capacity: number; type: string }>) => {
  return prisma.room.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteRoomService = async (id: number) => {
  return prisma.room.delete({
    where: { id },
  });
};
