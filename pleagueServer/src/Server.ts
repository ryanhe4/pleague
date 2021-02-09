import * as express from "express";
import apiRouter from "./api";
import * as passport from "passport";
import localPassportConfig from "./passport/local";
import jwtPassportConfig from "./passport/jwt";

const PORT = 4000;

export default class Server {
  app = express();

  constructor() {
    this.setup();
  }

  setup() {
    // equip middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    localPassportConfig();
    jwtPassportConfig();
    // insert router
    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.json({ hello: "world" });
    });

    this.app.use("/api", apiRouter);
  }

  start() {
    try {
      this.app.listen(PORT, () => {
        console.log("server is running");
      });
    } catch (e) {
      console.error(e);
    }
  }
}
