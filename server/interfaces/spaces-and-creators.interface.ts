import { ISpace } from './space.interface';
import { IStrippedUser } from './spaceData.interface';

export interface ISpacesAndCreator extends ISpace {
  userSpaceRoles: {user: IStrippedUser}[]
}
