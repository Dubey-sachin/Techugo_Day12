import express from 'express';
import jwt from 'jsonwebtoken'

export const authenticate= async (req,res,next)=>{

    const token = req.header("Authorization")?.split(" ")[1];

    if(!token)
    {
       return res.status(401).json({message: "Access Denied"});
    }

    try {
        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        req.user=verified;
        next();
    } catch (error) {
        return res.status(400).json({ message: "invalid Token" });
    }

}