import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import db from "../util/db.util";
import cr from "../util/cr.util";

export async function postRegister(req: Request, res: Response) {
  const { email, plain } = req.body;

  try {
    const userExist = await db.user.findFirst({ where: { email } });

    if (userExist) {
      return res.json(cr.str("bad", "user exist"));
    }

    const password = await argon2.hash(plain);

    const user = await db.user.create({ data: { email, password } });

    return res.json(cr.str("ok", `User ${user.email} registered successfully`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to register user"));
  }
}

export async function postLogin(req: Request, res: Response) {
  const { email, plain, device } = req.body;

  try {
    const user = await db.user.findFirst({ where: { email } });

    if (!user) {
      return res.json(cr.str("bad", "User does not exist"));
    }

    const verifyPassword = await argon2.verify(user.password, plain);

    if (!verifyPassword) {
      return res.json(cr.str("bad", "wrong credentials"));
    }

    const authToken = jwt.sign(
      { id: user.id, uid: user.userid },
      process.env.SEC!
    );

    await db.sessions.create({ data: { userid: user.id, device } });

    return res
      .cookie("connect", authToken)
      .json(cr.str("ok", `Welcome ${user.email}`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to Login user"));
  }
}
