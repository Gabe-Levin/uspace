import { createUser, returnUserBySub } from '../models/user.model';
import { Request, Response } from 'express';
import { handleError } from '../error-handling/error-helpers';
// creates a single user
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};

// get a user by sub
export const getUserBySub = async (req: Request, res:Response): Promise<void> => {
  try {
    const user = await returnUserBySub(req.params.sub);
    if (!user) {
      res.status(404);
      res.send({ error: 'User not found.' });
      return;
    }
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};
