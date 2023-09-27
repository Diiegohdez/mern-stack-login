import mongoose from "mongoose";
import {MONGODB_URI} from "./confing.js";

export const connectBD = async () => {
    try{
        await mongoose.connect(MONGODB_URI)
        console.log("conectado a la BD");
    } catch (error) {
        console.log(error);
    }
};

