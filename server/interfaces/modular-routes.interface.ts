import { IComment } from '../interfaces/comment.interface';
import { IPost } from '../interfaces/post.interface';
import { IRole } from '../interfaces/role.interface';
import { ISpace } from '../interfaces/space.interface';
import { IUserSpaceRole } from '../interfaces/user-space-role.interface';
import { IUser } from '../interfaces/user.interface';
export type IAllTables = IComment | IPost | IRole | ISpace | IUserSpaceRole | IUser;
