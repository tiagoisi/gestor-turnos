import cors from "cors";
import morgan from "morgan";
import express, { Request, Response } from "express";
import indexRouter from "./routes";

const server = express();

server.use(cors({
  origin: ['http://localhost:5173', 'https://steelcore.vercel.app']
}));
server.use(morgan("dev"));
server.use(express.json());

server.use(indexRouter);

server.get("/", (req: Request, res: Response) => {
    res.send("Server running succesfully!")
});

export default server;