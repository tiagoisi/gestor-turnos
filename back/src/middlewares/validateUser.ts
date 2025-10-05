import { Request, Response, NextFunction } from "express";
import ICreateUserDto from "../dtos/ICreateUserDto";

const validateUser = (req: Request<{}, {}, ICreateUserDto>, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    try {
        if (!name) throw Error("El campo name es obligatorio!");
        if (name.length < 3) throw Error("El campo name debe tener al menos 3 caracteres");
        if (name.length > 50) throw Error("El campo name debe tener como maximo 50 caracteres");
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameRegex.test(name)) throw Error("El nombre no puede contener numeros ni caracteres especiales!");

        if (!email) throw Error("El campo email es requerido!");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw Error("El campo email debe ser un email valido!");
        
        if (!birthdate) throw Error("El campo birthdate es obligatorio!");
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthdate)) throw Error("El campo birthdate debe estar en formato yyyy-mm-dd");
        const birth = new Date(birthdate);
        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();
        const isUnder18 = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
        if (isUnder18) throw Error("El usuario debe ser mayor de 18 años!");
    
        if (!nDni) throw Error("El campo nDni es requerido!");
        if (nDni < 0) throw Error("El campo nDni debe ser un numero valido!")
        
        if (!username) throw Error("El campo username es requerido!");
        if (username.length < 3) throw Error("El campo username debe tener al menos 3 caracteres!");
        if (username.length > 20) throw Error("El campo username debe tener como maximo 20 caracteres!");

        if (!password) throw Error("El campo password es requerido!");
        if (password.length < 4) throw Error("El campo password debe tener como minimo 4 carateres!");
        if (password.length > 10) throw Error("El campo password debe tener como maximo 10 caracteres!");
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
        if (!passwordRegex.test(password)) throw Error("El password debe tener al menos una letra, un numero, y un caracter especial!");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default validateUser;