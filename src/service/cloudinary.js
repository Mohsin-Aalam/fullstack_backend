
import fs from "fs";          
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'codewithalam', 
  api_key: '261692693611431', 
  api_secret: 'gh2Bu-9N7neZ_qPpi_rEIMlgUr4' 
});
// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME , 
//   api_key: process.env.API_KEY , 
//   api_secret: process.env.API_SECRET 
// });

const uploadeOnCloudinary=async (locaFilePath)=>{
try{
  console.log(locaFilePath);
if(!locaFilePath)return null
console.log("hello")
//upload file on cloudinary
  const response = await cloudinary.uploader.upload(locaFilePath,{resource_type:'auto'},);
// file has been uploaded successfully
console.log("hello")

console.log(`file has been uploaded successfully ${response.url}`);
return response;
} catch(err){
  console.log("error block")
    fs.unlinkSync(locaFilePath)  //remove the locally saved temporary file as the upload operation got failed
   return null;
}
}

export {uploadeOnCloudinary}