import bcrypt from "bcryptjs";

import mongoose, {Schema} from "mongoose";
const userSchema=new Schema ({
username:{
    required:true,
    type:String,
    unique:true,
    lowercase:true, 
    trim:true,
    index:true
},
fullName:{
    required:true,
    type:String,
 
   trim:true,
    
    index:true
},
email:{
    required:true,
    type:String,
    unique:true,
    lowercase:true, 
    trim:true,

},
avatar:{
    type:String,
    required:true,
    
},
coverImage:{
    type:String,
    
    
},
watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:'Video'
    }
],
password:{
    type:String,
    required:[true,'Password is required']
},

refreshToken:{
    type:String
}

},{timestamps:true})
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hashSync(this.password, 10);
    next() 
})
 userSchema.methods.isPasswordCorrect=async function(password)
 {
    return bcrypt.compareSync(password, this.password);         
 }
 userSchema.methods.generateAccessToken =function (){
 return jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
 }
 userSchema.methods.generateRefreshToken =function (){
    return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
 }
export const User= mongoose.model('User',userSchema) 