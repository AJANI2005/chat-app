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

// ROUTES
// POST Login
app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;

  await db.read();
  const user = db.data.users.find((u) => u.name === name);
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid password" });
  }
  user.loggedIn = true; // Set user as logged in

  return res.json({ user });
});

// GET Users
app.get("/api/users", async (req, res) => {
  await db.read();
  return res.json(db.data.users);
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
