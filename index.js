import express from "express";
import "dotenv/config";
import models, {connectDB} from "./src/ultils/database.js";

const app = express();
app.get('/', (req, res)=> {
    res.send('Home page');
});

connectDB().then(async () => {
    app.listen(parseInt(process.env.PORT), () => 
        console.log(`Sever is running on port ${process.env.PORT}!`),
    );
  });