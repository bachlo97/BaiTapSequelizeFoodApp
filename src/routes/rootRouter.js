import express from "express"
import resRouter from "./resRouter.js"
import userRouter from "./userRouter.js"

const rootRouter = express.Router()

rootRouter.use("/res",resRouter)
rootRouter.use("/user",userRouter)

export default rootRouter