import { Request, Response } from "express";
import { createUserService, findUserByCredentialId, getAllUsersService, getUserByIdService } from "../services/userService";
import { validateCredentialService } from "../services/credentialService";
import User from "../entities/UserEntity";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        if( error instanceof Error)
        res.status(404).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user: User | null = await getUserByIdService(Number(id));
        res.status(200).json(user);
    } catch (error) {       
        if( error instanceof Error)
        res.status(404).json({ message: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser: User = await createUserService({
            name, email, birthdate, nDni, username, password
        })
        res.status(201).json(newUser); //* 201 significa que se creo algo
    } catch (error) {
        if( error instanceof Error)
        res.status(404).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const credentialId: number = await validateCredentialService({ username, password });
        const user = await findUserByCredentialId(credentialId)
        res.status(200).json({
            login: true,
            user,
        });
    } catch (error) {
        if( error instanceof Error)
        res.status(400).json({ message: error.message });
    }
};