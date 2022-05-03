import { CustomError } from '../error-handling/custom-err.class';
import { ISpacesAndCreator } from '../interfaces/spaces-and-creators.interface';
import { IIncomingUserSpaceRole, IUserSpaceRole } from '../interfaces/user-space-role.interface';
import { createUserSpaceRoleQuery, deleteSingleUserSpaceRoleQuery, returnSpacesAndCreatorsQuery } from '../queries/user-space-role.queries';

// creates a single User_Space_Role
// eslint-disable-next-line camelcase
export const createUserSpaceRole = async (newUserSpaceRoleDetails: IIncomingUserSpaceRole): Promise<IUserSpaceRole> => {
  try {
    const userSpaceRole = await createUserSpaceRoleQuery(newUserSpaceRoleDetails);
    return userSpaceRole;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

export const returnSpacesAndCreators = async (): Promise<ISpacesAndCreator[]> => {
  try {
    const spacesAndCreators = await returnSpacesAndCreatorsQuery();
    return spacesAndCreators;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// delete single User_Space_role by space_id
export const deleteSingleUserSpaceRole = async (spaceId: string): Promise<number> => {
  try {
    const deletedRowCount = await deleteSingleUserSpaceRoleQuery(spaceId);
    return deletedRowCount.count; // returns count of deleted rows
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
