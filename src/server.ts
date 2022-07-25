import dotenv from "dotenv";
import express from "express";
import { router } from "./router";

dotenv.config()

const server = express()

server.use(express.json());
server.use(router)

server.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
})

