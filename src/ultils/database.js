import mongoose from "mongoose";
import User from "../models/usermodles.js";


const connectDB = function() {
   return mongoose.connect(process.env.MONGO_LOCAL_URI);
};

const models = User;
export {connectDB};
export default models;

    