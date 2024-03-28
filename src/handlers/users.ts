import type express from 'express';
import type { Request, Response } from 'express';
import type { User } from '../models/user';
import { UserStore } from '../models/user';
import bcrypt from 'bcryptjs';
import config from '../config';
import auth from './authentications';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  const { first_name, last_name, password } = req.body;
  if (!first_name || !last_name || !password) {
    res.status(400).json(`invalid request body.`);
    return;
  }

  try {
    const hash = bcrypt.hashSync(
      password + config.crypto.secretKey,
      parseInt(config.crypto.saltRound as string),
    );

    const user: User = await store.create({
      first_name: first_name,
      last_name: last_name,
      password: hash,
    } as User);
    res.status(200).json(user);
  } catch (err) {
    console.error(`create user got error: ${err}`);
    res.status(500).json(`internal server error.`);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await store.index();
    res.status(200).json(users);
  } catch (err) {
    console.error(`index user got error: ${err}`);
    res.status(500).json(`internal server error.`);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const authUser = req.body.auth.user;
  try {
    if (authUser.id != parseInt(id)) {
      res.status(403).json('permission denied.');
      return;
    }
    const user: User = await store.show(parseInt(id));
    res.status(200).json(user);
  } catch (err) {
    console.error(`show user got error: ${err}`);
    res.status(500).json(`internal server error.`);
  }
};

const routes = (app: express.Application) => {
  app.get('/users', auth.checkToken, index);
  app.get('/users/:id', auth.checkToken, show);
  app.post('/users', create);
};

export default {
  routes,
};
