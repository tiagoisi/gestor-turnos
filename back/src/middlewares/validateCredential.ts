import { Request, Response, NextFunction } from "express";
import ICreateCredentialDto from "../dtos/ICreateCredentialDto";

const validateCredential = (req: Request<{}, {}, ICreateCredentialDto>, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        if (!username) throw Error("El campo username es requerido!");
        if (!password) throw Error("El campo password es requerido!");
        if (password.length < 4) throw Error("El campo password debe tener como minimo 4 carateres!");
        if (password.length > 10) throw Error("El campo password debe tener como maximo 10 caracteres!");
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
        if (!passwordRegex.test(password)) throw Error("Credenciales incorrectas!");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default validateCredential;