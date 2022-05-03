import { createUserSpaceRole, returnSpacesAndCreators, deleteSingleUserSpaceRole } from '../models/user-space-role.model';
import { Request, Response } from 'express';
import { handleError } from '../error-handling/error-helpers';
// creates a single User_Space_Role
export const postUserSpaceRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const incomingData = req.body;
    const userSpaceRole = await createUserSpaceRole(incomingData);
    res.status(201);
    res.send(userSpaceRole);
  } catch (error) {
    res.status(500);
    res.send({ error: 'An unknown server error has occurred.' });
  }
};

// return spaces and their creators
export const getSpacesAndCreators = async (req: Request, res: Response): Promise<void> => {
  try {
    const spacesAndCreators = await returnSpacesAndCreators();
    res.status(200).send(spacesAndCreators);
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};

// delete single User_Space_role by space_id
export const deleteUserSpaceRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRow = await deleteSingleUserSpaceRole(req.params.spaceId);
    res.status(202);
    res.send(deletedRow);
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};
