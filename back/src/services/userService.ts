import ICreateUserDto from "../dtos/ICreateUserDto";
import Credential from "../entities/CredentialEntity";
import User from "../entities/UserEntity";
import { userRepository } from "../repositories/indexRepository";
import { createCredentialService } from "./credentialService";

export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers: User[] = await userRepository.find({ relations: { appointments: true } });
    return allUsers;
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user: User | null = await userRepository.findOne({ where: { id: id }, relations: ["appointments"] });
    if (!user) throw Error(`Usuario con id ${id} no econtrado`);
    return user;
}

export const createUserService = async (createUserDto: ICreateUserDto) => {
    const { name, email, birthdate, nDni, username, password } = createUserDto;
    const foundUser: User | null = await userRepository.findOneBy({ email });
    if (foundUser) throw new Error(`El email ${email} ya se encuentra registrado!`);
    const newCredential: Credential = await createCredentialService({ username, password });

    const newUser: User = userRepository.create({ name, email, birthdate, nDni });
    await userRepository.save(newUser);

    newUser.credential = newCredential;
    await userRepository.save(newUser);
    return newUser;
}

export const findUserByCredentialId = async (credentialId: number): Promise<User | null> => {
    const user: User | null = await userRepository.findOneBy({ credential: { id: credentialId } });
    if (!user) throw new Error(`Usuario con id ${credentialId} no encontrado`);
    return user;
}