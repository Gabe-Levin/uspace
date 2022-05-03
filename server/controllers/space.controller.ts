import { Request, Response } from 'express';
import { handleError } from '../error-handling/error-helpers';
import { createSpace, returnSpaceData, deleteSingleSpace } from '../models/space.model';

// creates a single space
export const postSpace = async (req: Request, res: Response): Promise<void> => {
  try {
    const space = await createSpace(req.body);
    res.status(201);
    res.send(space);
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};

// return a space and it's posts
export const getSpaceData = async (req: Request, res: Response): Promise<void> => {
  try {
    const spaceData = await returnSpaceData(req.params.id);
    if (!spaceData) {
      res.status(404);
      res.send({ error: 'Space has not been found.' });
      return;
    }
    res.status(200);
    res.send(spaceData);
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};

// delete a single post by id
export const deleteSpace = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSpaceID = await deleteSingleSpace(req.params.id);
    res.status(202);
    res.send({ id: deletedSpaceID });
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};
