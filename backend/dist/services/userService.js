import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const registerUserService = async (data) => {
    // Check if user already exists
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
export const getUserByIdService = async (id) => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            role: true,
        },
    });
};
// Service to update user details (e.g., username, password, or role)
export const updateUserService = async (id, updatedData) => {
    try {
        // Only hash the password if it's provided
        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }
        return await prisma.user.update({
            where: { id },
            data: updatedData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
        else {
            throw new Error('Failed to update user due to an unknown error');
        }
    }
};
// Service to delete a user
export const deleteUserService = async (id) => {
    return prisma.user.delete({
        where: { id },
    });
};
// Service to get a user by username
export const getUserByUsernameService = async (username) => {
    return prisma.user.findUnique({ where: { username } });
};
// Service to update a user's role (Admin only)
export const updateUserRoleService = async (id, role) => {
    // Validate the role
    if (!['User', 'Admin'].includes(role)) {
        throw new Error('Invalid role provided');
    }
    // Update the user's role
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
