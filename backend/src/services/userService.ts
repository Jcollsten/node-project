import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerUserService = async (data: { username: string; password: string }) => {
  const existingUser = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hash = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      password: hash,
    },
  });

  return {
    id: newUser.id,
    username: newUser.username,
    role: newUser.role,
    message: 'User created successfully',
  };
};

// Service to get all users
export const getAllUsersService = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
};

// Service to get a user by ID
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

// Service to update user
export const updateUserService = async (id: string, updatedData: Partial<{ username: string; password: string; role: string }>) => {
  try {
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    return await prisma.user.update({
      where: { id },
      data: updatedData,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update user: ${error.message}`);
    } else {
      throw new Error('Failed to update user due to an unknown error');
    }
  }
};

// Service to delete a user
export const deleteUserService = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

// Service to get a user by username
export const getUserByUsernameService = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

// Service to update a user's role (Admin only)
export const updateUserRoleService = async (id: string, role: string) => {
  if (!['User', 'Admin'].includes(role)) {
    throw new Error('Invalid role provided');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role },
  });

  return {
    id: updatedUser.id,
    username: updatedUser.username,
    role: updatedUser.role,
    message: 'User role updated successfully',
  };
};
