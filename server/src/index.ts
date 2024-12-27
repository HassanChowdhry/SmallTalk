import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import cors from 'cors';
import { testConnection } from "../database";
import messageController from "./controllers/messageController";
import conversationController from "./controllers/conversationController";

// testConnection();

dotenv.config();
const devOrigin = "http://localhost:3000";
const app: Application = express();
app.use(cors({ origin: devOrigin }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port: String | Number = process.env.PORT || 8000;
const server = createServer(app);
const io = new Server(server, { cors: { origin: devOrigin, methods: ["GET", "POST"] }});

app.use("/api/messages", messageController);
app.use("/api/conversation", conversationController);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

io.on("connection", (socket: Socket) => {
  console.log('A user is connected');
  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => console.log('user disconnected'));
})

server.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
