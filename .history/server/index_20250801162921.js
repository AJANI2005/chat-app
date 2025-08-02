import express from "express";
import cors from "cors";    
import { createServer } from "http";
import { Server } from "socket.io";
import  db  from "./data.js";

// Create Server and Socket IO Server
const app = express();

// Middleware
app.use(cors());

const server = createServer(app);


// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});


// Socket IO
const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
