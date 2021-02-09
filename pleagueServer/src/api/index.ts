import * as express from "express";
import authRouter from "./auth";
import userRouter from "./user";

import * as passport from "passport";

const router = express.Router();

router.use("/auth", authRouter);
router.use(
  "/user",
  passport.authenticate("jwt-access", { session: false }),
  userRouter
);

export default router;
