import type express from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { User } from '../models/user';
import { UserStore } from '../models/user';
import bcrypt from 'bcryptjs';
import config from '../config';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const login = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json(`invalid request body`);
    return;
  }

  try {
    const user: User = await store.show(id);
    if (!user) {
      res.status(404).json('user not found');
      return;
    }

    if (
      !bcrypt.compareSync(password + config.crypto.secretKey, user.password)
    ) {
      res.status(401).json('password is incorrect');
      return;
    }

    res.status(200).json({
      token: jwt.sign(
        {
          user: {
            ...user,
            password: undefined,
          },
        },
        config.crypto.jwtSecret as string,
      ),
    });
  } catch (err) {
    console.error(`login got error: ${err}`);
    res.status(500).json(`internal server error`);
  }
};

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.get('Authorization');
  if (!auth) {
    res.status(401).json('token is required');
    return;
  }

  try {
    req.body.auth = jwt.verify(
      auth.split(' ')[1],
      config.crypto.jwtSecret as string,
    );
    next();
  } catch (err) {
    res.status(401).json('invalid token');
  }
  return;
};

const routes = (app: express.Application) => {
  app.post('/login', login);
};

export default {
  routes,
  checkToken,
};
