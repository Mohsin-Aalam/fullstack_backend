import { asyncHandler } from "../utils/async_handler.js";
import {ApiError} from "../utils/api_error.js";
import {uploadeOnCloudinary} from "../service/cloudinary.js"
import { ApiResponse } from "../utils/api_response.js";

import {User } from "../models/user.model.js"
const registerUser=asyncHandler(async (req,res)=>{
   //get user detail from frontend
   //validatoin-not empty
   //check if user already exist : username and email 
   //check for images and check for avatar 
   //upload them to cloudinary
   //create user object   - create entry in db
   //remove password and refresh token field from responce 
   //check for user creation 
   // return res
   console.log(req.body);
   const {fullName,email,username,password }=req.body
   console.log("email :",email)        

    if([fullName,email,username,password].some((field)=>
    field?.trim()=="")){
      throw new ApiError(400,"all fields are required ")
    }
    const existedUser= await User.findOne({
      $or:[{username} , {email}]

    })
    if(existedUser){
  throw new ApiError(409,"user with email or username already exist")
    }
   // console.log(req.files)
    const avatarLocalPath= req.files?.avatar[0]?.path; 
    console.log(avatarLocalPath)
    const coverImageLocalPath= req.files?.coverImage[0]?.path; 
    console.log(coverImageLocalPath)
     if(!avatarLocalPath){
      throw new ApiError(400,"avatar file is required")
     }
  //   const avatar=  await uploadeOnCloudinary(avatarLocalPath)
  // // console.log(avatar.url);
  //   const coverImage= await uploadeOnCloudinary(coverImageLocalPath)
    
  //   if(!avatar){
  //     throw new ApiError(400,"avatar field is required")

  //   }
   const user= await User.create({
      fullName,
      avatar:avatarLocalPath,
      coverImage:coverImageLocalPath|| "",
      email,
      password,
      username:username.toLowerCase()

    })
  const   createdUser= await User.findById(user._id).select("-password -refreshToken")
  console.log(createdUser);
  if(!createdUser){
   throw new ApiError(500, " something went wrong while registering the user ")
  }
  return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully!"))

})

export {registerUser}