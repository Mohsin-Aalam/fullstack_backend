//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"

// import mongoose from 'mongoose';
// import { DB_NAME } from './constants';
import connectDB from './db/db.js';
import {app} from './app.js'
const port = process.env.PORT || 5000

dotenv.config({
    path:'./env'
})

connectDB().then(()=>{
 
    app.listen(port , ()=>{
console.log(`Server is running at port : ${port}`);
    })
}).catch ((err)=>{
    console.log("mongoDB connection failed !!! ",err);
});


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