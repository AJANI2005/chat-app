import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import path from "path";
import { fileURLToPath } from "url";

import db from "./db/data.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/login", (req, res) => {
  const { name, password } = req.body;
  // Validate user here (e.g. check db)
  res.json({ name, password });
});

// Create HTTP server and Socket.IO server
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

// Serve React static files & SPA fallback
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
