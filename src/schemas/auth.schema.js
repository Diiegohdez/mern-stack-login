import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: 'el usuario es requerido'
    }),
    email: z.string({
        required_error: 'el correo es requerido'
    }).email({
        message: 'el correo es incorrecto'
    }),
    password: z.string({
        required_error: 'la contraseña es requerida'
    }).min(6, {
        message: 'la contraseña es debe ser minimo 6 caracteres'
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "email es requerido",
    }).email({
        message: "correo no es valido"
    }),
    password: z.string({
        required_error: "la contraseña es requerida,"
    }).min(6, {
        message: "la contraseña es debe ser minimo 6 caracteres"
    }),
});