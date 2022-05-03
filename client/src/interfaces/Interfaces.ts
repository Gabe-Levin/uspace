export interface UserSpaceRoleType {
  user: {
    username: string;
    email: string;
    pictureUrl?: string;
    id?: number;
  };
}

export default interface SpaceWithCreatorType {
  id: number;
  name: string;
  createdAt: Date;
  userSpaceRoles: UserSpaceRoleType[];
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  userId: number;
}

export interface CreateCommentType {
  content: string;
  postId: number;
  userId: number;
}

export interface PostType {
  id: number;
  content: string;
  tags: string;
  title: string;
  userId: number;
  spaceId: number;
  createdAt: Date;
  comments: CommentType[];
}

export interface CreatePostType {
  content: string;
  tags: string;
  title: string;
  userId: number;
  spaceId: number;
  createdAt: Date;
}

export interface SpaceDataType {
  posts: PostType[];
  createdAt: Date;
  description: string;
  id: number;
  name: string;
  userSpaceRoles: UserSpaceRoleType[];
}

export interface CreateSpaceDataType {
  description: string;
  name: string;
}

export interface UserType {
  id: number;
  email: string;
  emailVerified: boolean;
  username: string;
  pictureUrl: string;
  sub: string;
  createdAt: Date;
}

export interface CreateUserType {
  email: string;
  emailVerified: boolean;
  username: string;
  pictureUrl: string;
  sub: string;
}

export interface PrismaError {
  code: string;
  clientVersion: string;
  meta: object;
}
