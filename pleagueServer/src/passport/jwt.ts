import * as passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { User } from "../entity/User";
import { getRepository } from "typeorm";

export default () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "xploitdev",
      },
      async (payload, done) => {
        try {
          const user = await getRepository(User).findOne({
            email: payload.email,
          });
          if (!user) return done(null, false);
          return done(null, user);
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
