import express from "express";
import cors from "cors";    
import { createServer } from "http";
import { Server } from "socket.io";


// Create Server and Socket IO Server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);