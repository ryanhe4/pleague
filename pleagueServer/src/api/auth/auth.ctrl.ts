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
      return res.send("이미 존재하는 이메일 입니다.");
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

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .end("존재하지 않는 사용자 또는 비밀번호가 틀렸습니다.");
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          console.log(error);
          next(error);
        }
        const token = jwt.sign(
          {
            email: user.email,
            username: user.username,
          }, // 토큰에 입력할 private 값
          "xploitdev", // 나만의 시크릿키
          { expiresIn: "5m" } // 토큰 만료 시간
        );
        return res.json({
          token,
          email: user.email,
        });
      });
    })(req, res);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};
