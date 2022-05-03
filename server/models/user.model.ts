import { CustomError } from '../error-handling/custom-err.class';
import { IIncomingUser, IUser } from '../interfaces/user.interface';
import { createUserQuery, findFirstQuery } from '../queries/user.queries';

// creates a single user
export const createUser = async (newUserDetails: IIncomingUser): Promise<IUser> => {
  try {
    const user = await createUserQuery(newUserDetails);
    return user;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// find user by sub and return
export const returnUserBySub = async (sub: string): Promise<IUser| null> => {
  try {
    const user = await findFirstQuery(sub);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
