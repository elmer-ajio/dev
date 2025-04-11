"use strict";

import { userController } from "@src/controller";
import express from "express";


const route = express.Router();


route.post("/api/v1/user-create", userController.createUser);
route.get("/api/v1/user-getAll", userController.getAllUsers);
route.post("/api/v1/user-update/:id", userController.updateUser);
route.delete("/api/v1/user-delete/:id", userController.deleteUser);

route.all("/", (req, res) => {
  res.status(400).send("Invalid request");
});

export default route;