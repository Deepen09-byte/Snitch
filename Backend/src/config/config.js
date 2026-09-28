import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set. Add it to your environment or .env file.");
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
}