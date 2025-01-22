import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as multer from 'multer';

@Injectable()
export class CloudinaryHelper {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path); 
    return result.secure_url;
  }
}

 export const  storage =  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); 
    },
  });
