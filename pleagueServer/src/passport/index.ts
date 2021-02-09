import * as passport from "passport";

import local from "./local";
import jwt, { refreshJWT } from "./jwt";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

export default () => {
  passport.serializeUser((user: User, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await getRepository(User).findOne({
        id,
      });
      return done(null, user); // req.user
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
  jwt();
  refreshJWT();
};
