import * as express from "express";
import apiRouter from "./api";
import * as passport from "passport";
import passPortConfig from "./passport";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import { Server as SocketIO, Socket } from "socket.io";
import { refresh } from "./api/middlewares";

const PORT = 4000;

export default class Server {
  app = express();
  io: SocketIO;

  constructor() {
    this.setup();
  }

  setup() {
    // equip middlewares
    passPortConfig();
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: "http://localhost:8000",
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use(refresh);
    // insert router
    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.json({ hello: "world" });
    });

    this.app.use("/api", apiRouter);
  }

  start() {
    try {
      const server = this.app.listen(PORT, () => {
        console.log("server is running");
      });
      //socket 파일 분
      this.io = new SocketIO(server, {
        transports: ["websocket"], //통신 방법
      });
      this.io.on("connect", (socket: Socket) => {
        console.log("Connected client on port 4000.");

        socket.on("message", (m: ChatMessage) => {
          console.log("[server](message): %s", JSON.stringify(m));
          //db 설정 및 처
          this.io.emit("message", m);
        });
        socket.on("disconnect", () => {
          console.log("Client disconnected");
          socket.disconnect(true);
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
}

interface ChatMessage {
  author: string;
  message: string;
}
