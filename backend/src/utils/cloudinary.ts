import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

// Support both CLOUD_NAME/API_KEY/API_SECRET and CLOUDINARY_* env names
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET,
});

export default cloudinary;
