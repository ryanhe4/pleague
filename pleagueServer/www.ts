import express from "express";
import Server from "./src/server";

const server = new Server();
const app: express.Application = server.getInstance();

const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => {
    console.log('listening an express server');
})
