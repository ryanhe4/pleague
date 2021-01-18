import * as express from "express";
import userRouter from "./auth";

const router = express.Router();

router.use("/auth", userRouter);

export default router;
