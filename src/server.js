//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"

// import mongoose from 'mongoose';
// import { DB_NAME } from './constants';
import connectDB from './db/db.js';

dotenv.config({
    path:'./env'
})

connectDB();


/*
import express from 'express';
const app= express();

(async ()=>{
    try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
     app.on("error" ,(error)=>{
        console.log("ERRR: ",error);
        throw error

     } )
     app.listen(process.env.PORT,()=>{
        console.log(`app is lisning on port ${process.env.PORT}`)
     })
    }catch(error){

    }
})()
*/