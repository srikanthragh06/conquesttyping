import express, { Request, Response } from "express";
import http from "http";
import { config } from "dotenv";
config();

const app = express();
const server = http.createServer(app);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
