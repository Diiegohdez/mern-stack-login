import {TOKE_SECRET} from "../confing.js";
import jwt from "jsonwebtoken";

export function createAcessToke(payload){
    return new Promise((resolve, reject) =>{
        jwt.sign(payload, TOKE_SECRET, { expiresIn: "1d"}, (err, token) =>{
                if(err) reject(err);
                resolve(token);
            });
    });

}