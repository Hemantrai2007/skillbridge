import express from "express";
import {connect} from "./configs/connection.js";
import {auth_router} from "./routes/auth.js";
import cors from "cors";
const app = express();
const port = 8000;
connect();
app.use(cors({origin: "*"}));
app.use(express.json());
app.use("/auth",auth_router);
app.listen(port,() => {
  console.log("server is listening");
})
