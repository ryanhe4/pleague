import * as express from "express";

const router = express.Router();

router.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("유저인덱스");
  }
);

export default router;
