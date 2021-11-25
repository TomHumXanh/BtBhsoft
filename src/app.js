import express from "express";
import "dotenv/config";
import connectDB from "./ultils/database.js";
import routes from "./route/user.js"
const app = express();
connectDB();
app.set("port", process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);     
export default app;