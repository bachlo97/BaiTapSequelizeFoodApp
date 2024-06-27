import express from "express";
import cors from "cors";
import rootRouter from "./routes/rootRouter.js";
const app = express();


//Create server port
app.listen(8080)

app.use(cors());

//middleware before
app.use(express.json())



app.use(rootRouter)

