import { ISpaceData } from '../interfaces/spaceData.interface';
import { IIncomingSpace, ISpace } from '../interfaces/space.interface';
import { CustomError } from '../error-handling/custom-err.class';
import { createSpaceQuery, deleteSpaceQuery, findSpaceDataQuery } from '../queries/space.queries';

// creates a single space
export const createSpace = async (newSpaceDetails: IIncomingSpace): Promise<ISpace> => {
  try {
    const space = await createSpaceQuery(newSpaceDetails);
    return space;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

export const returnSpaceData = async (id: string): Promise<ISpaceData | null> => {
  try {
    const spaceData = await findSpaceDataQuery(id);
    if (!spaceData) {
      return null;
    }
    return spaceData;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// delete single space and posts/comments inside
export const deleteSingleSpace = async (id: string): Promise<number> => {
  try {
    const deletedSpace = await deleteSpaceQuery(id);
    return deletedSpace.id;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
