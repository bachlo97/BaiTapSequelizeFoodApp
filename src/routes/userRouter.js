import express from "express";
import { orderFood } from "../controllers/userController.js";

const userRouter = express.Route()


//handle order food
userRouter.post("/order/:food_id",orderFood)

export default userRouter