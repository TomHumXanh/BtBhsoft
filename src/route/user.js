import express from "express";
import {createUser, login} from "../controller/usercontroller.js";
import {
    userValidator,
    validatorResult,
  } from "../controller/uservalidator.js";
const router = express.Router();

export default (app) => {
  app.use("/api/", router);

  app.get("/register", (req, res) => {
    res.send("Register Page!");
  });

  app.get("/", (req, res) => {
    res.send("Home page!");
  });

  router.post("/register", userValidator, validatorResult, createUser);
  router.post("/login", login);
  
};

