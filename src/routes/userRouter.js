import express from "express";
import { orderFood } from "../controllers/userController.js";

const userRouter = express.Router()


//handle order food
userRouter.post("/order/:food_id",orderFood)

export default userRouter