import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
// import { encrypt } from '../utils/encryptionUtil';

const prisma = new PrismaClient();

export const registerUserService = async (username: string, password: string) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password and create user
  const hash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username, // Store the plain username
      password: hash,
    },
  });

  return {
    id: newUser.id,
    username, // Return the plain username for the frontend
    message: 'User created successfully',
  };
};

export const getAllUsersService = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
};

export const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
};

export const updateUserService = async (id: string, updatedData: Partial<{ username: string; password: string; role: string }>) => {
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data: updatedData,
  });
};

export const deleteUserService = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
