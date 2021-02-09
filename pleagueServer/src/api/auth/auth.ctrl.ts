import * as express from "express";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import * as bcrypt from "bcrypt";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  type RequestBody = {
    email: string;
    password: string;
    username: string;
  };

  const { email, password, username }: RequestBody = req.body;

  try {
    //TODO Joi를 이용한 이메일 및 username / password 검증

    const user = await getRepository(User).findOne({
      email: email.toLowerCase(),
    });
    if (user) {
      return res.status(401).send("이미 존재하는 이메일 입니다.");
    }
    //password 암호화
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User();
    newUser.email = email.toLowerCase();
    newUser.password = hashedPassword;
    newUser.username = username;
    await getRepository(User).save(newUser);

    res.send({ registered: !!newUser });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
export const isNotLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인한 사용자는 접근할 수 없습니다.");
  }
};
// password + email 로 일반적인 방식을 사용한 accessToken 생성
export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log(req.isAuthenticated());

    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : "Login failed",
          user: user,
        });
      }

      return req.login(user, { session: false }, async (error) => {
        if (error) {
          console.log(error);
          next(error);
        }
        // cookie is not exist
        const refreshToken = jwt.sign(
          {
            email: user.email,
          },
          "xploitdev",
          {
            expiresIn: "7d",
          }
        );
        const accessToken = jwt.sign(
          {
            email: user.email,
            username: user.username,
          }, // 토큰에 입력할 private 값
          "xploitdev", // 나만의 시크릿키
          { expiresIn: "60m" } // 토큰 만료 시간
        );
        res.cookie("RefreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.cookie("access-token", accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        });
        return res.status(200).json({
          status: "success",
        });
      });
    })(req, res, next);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

export const check = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // refreshtoken이 존재하고, refresh토큰의 검증이 완료된 상태로 해당 라우터로 넘어온다.
    // 따라서 refresh Token의 검증 자체는 필요가 없다.
    // 단, accessToken에 대한 검증은 하지 않기 때문에 사용에 검증할 필요가 있다.
    // check 대신 accessToken을 만들어주는 미들웨어를 생성, 매번 호출

    // access token generate
    const accessToken = jwt.sign(
      {
        email: req.user.email,
        username: req.user.username,
      }, // 토큰에 입력할 private 값
      "xploitdev", // 나만의 시크릿키
      { expiresIn: "60m" } // 토큰 만료 시간
    );
    // refresh token generate
    const refreshToken = jwt.sign(
      {
        email: req.user.email,
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
    return res.json(req.user);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};
