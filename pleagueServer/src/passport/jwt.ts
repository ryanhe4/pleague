import * as passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { User } from "../entity/User";
import { getRepository } from "typeorm";

const cookieExtractor = (req): string | null => {
  let token = null;
  if (req && req.cookies) token = req.cookies["RefreshToken"];
  return token;
};

const accessTokenExtractor = (req): string | null => {
  let token = null;
  if (req && req.cookies) token = req.cookies["access-token"];
  return token;
};

export default () => {
  passport.use(
    "jwt-access",
    new JWTStrategy(
      {
        jwtFromRequest: accessTokenExtractor, // ExtractJwt.fromAuthHeaderAsBearerToken(),
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

export const refreshJWT = () => {
  passport.use(
    "jwt-refresh",
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
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
          return done(e, false);
        }
      }
    )
  );
};
