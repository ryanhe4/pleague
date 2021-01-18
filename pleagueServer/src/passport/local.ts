import * as passport from "passport";
import * as bcrypt from "bcrypt";

import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

export default () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await getRepository(User).findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "존재하지 않는 사용자입니다.",
            });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: "비밀번호가 틀립니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
