import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";

export const refresh = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // refreshtoken이 존재하고, refresh토큰의 검증이 완료된 상태로 해당 라우터로 넘어온다.
    // 따라서 refresh Token의 검증 자체는 필요가 없다.
    // 단, accessToken에 대한 검증은 하지 않기 때문에 사용에 검증할 필요가 있다.
    // check 대신 accessToken을 만들어주는 미들웨어를 생성, 매번 호출

    // authenticate using refresh Token
    passport.authenticate(
      "jwt-refresh",
      { session: false },
      (err, user, info) => {
        if (err || !user) {
          console.error(err);
          res.cookie("access-token", "", {
            maxAge: 0,
            httpOnly: true,
          });
          res.cookie("RefreshToken", "", {
            maxAge: 0,
            httpOnly: true,
          });
          return next();
        }

        // access token generate
        const accessToken = jwt.sign(
          {
            email: user.email,
            username: user.username,
          }, // 토큰에 입력할 private 값
          "xploitdev", // 나만의 시크릿키
          { expiresIn: "60m" } // 토큰 만료 시간
        );
        const refreshToken = jwt.sign(
          {
            email: user.email,
          },
          "xploitdev",
          {
            expiresIn: "7d",
          }
        );
        res.cookie("RefreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.cookie("access-token", accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        });
        return next();
      }
    )(req, res, next);
  } catch (e) {
    console.error(e);
    next();
  }
};
