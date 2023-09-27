import jwt  from "jsonwebtoken";
import {TOKE_SECRET} from "../confing.js";

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) return res.status(401).json({message: "no token, autorizacion denegada"});

    jwt.verify(token, TOKE_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "token invalio"});
    
        req.user = user
        console.log(user);
        next();
    }) 

    
};