import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { createAcessToke } from "../libs/jwt.js";
import Jwt from "jsonwebtoken";
import { TOKE_SECRET } from '../confing.js';


export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(['el usuario ya existe'])

        const passwordhash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordhash,
        });
        const userSaved = await newUser.save();
        const token = await createAcessToke({ id: userSaved._id });

        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            udaptedAt: userSaved.updatedAt,
        })
    } catch (erro) {
        res.status(500).json({ message: erro.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no Encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "La contraseña es Incorrecta" })

        const token = await createAcessToke({ id: userFound._id });

        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: 'none',
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            udaptedAt: userFound.updatedAt,
        });
    } catch (erro) {
        res.status(500).json({ message: erro.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "Usuario no Encontrado" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "No autorizado" });

    Jwt.verify(token, TOKE_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" });

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "No autorizado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};