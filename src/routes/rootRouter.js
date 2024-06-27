import express from "express"
import resRouter from "./resRouter.js"

const rootRouter = express.Router()

rootRouter.use("/res",resRouter)

export default rootRouter