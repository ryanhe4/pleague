import * as express from "express";
import { register, create } from "./auth.ctrl";

const router = express.Router();

router.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("기모링");
  }
);

router.post("/register", register);
router.post("/login", create);

export default router;
