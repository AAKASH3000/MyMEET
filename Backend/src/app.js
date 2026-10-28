import express from "express";
import { createServer } from "node:http";


import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

//------
//DNS
import dns from 'dns';

//Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);
//------

import mongoose from "mongoose";
import { connectToSocket} from "./controllers/socketMannager.js";


import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app =express();
const server = createServer(app);
const io =  connectToSocket(server);


app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

const start = async ()=>{
    // const connectionDb = await mongoose.connect("mongodb+srv://aakash007:0ZL6jpBMk22MbhtH@cluster0.wale1gd.mongodb.net/")
    const connectionDb = await mongoose.connect(process.env.MONGO_URL)
    
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("app is listing at port 8000")
    });
}

start();