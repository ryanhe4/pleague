import * as express from "express";
import * as passport from "passport";
import { register, create, check, isNotLoggedIn } from "./auth.ctrl";

const router = express.Router();

router.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("기모링");
  }
);

router.post("/register", register);
router.post("/login", create);
router.get(
  "/check",
  passport.authenticate("jwt-refresh", { session: false }),
  check
);

export default router;
