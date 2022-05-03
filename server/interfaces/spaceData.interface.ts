import { IComment } from './comment.interface';
import { IPost } from './post.interface';
import { ISpace } from './space.interface';
import { IUser } from './user.interface';

export interface IStrippedUser extends Omit<IUser, 'id'|'createdAt'|'emailVerified'|'sub'>{}

export interface IPostWithComments extends IPost{
  comments: IComment[],
}
export interface ISpaceData extends ISpace {
    posts: IPostWithComments[],
    userSpaceRoles: {user: Omit<IUser, 'createdAt'|'emailVerified'|'sub'>}[],
}
