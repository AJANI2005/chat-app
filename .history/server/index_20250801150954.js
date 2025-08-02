import express from "express";
import cors from "cors";    
import { createServer } from "http";
import { Server } from "socket.io";


// Create Server and Socket IO Server
const app = express();

// Middleware
app.use(cors());

const server = createServer(app);

const io = new Server(server);