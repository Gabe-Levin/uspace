// eslint-disable-next-line camelcase
import { Post, Space, User_Space_Role, Comment, User } from '@prisma/client';
import { CustomError } from '../error-handling/custom-err.class';
import { IComment } from '../interfaces/comment.interface';
import { IAllTables } from '../interfaces/modular-routes.interface';
import { IPost } from '../interfaces/post.interface';
import { ISpace } from '../interfaces/space.interface';
import { IUserSpaceRole } from '../interfaces/user-space-role.interface';
import { IUser } from '../interfaces/user.interface';
import { getAllEntriesQuery, getUniqueEntryQuery } from '../queries/modular-routes.queries';

// modular route: returns all entries in a table
export const returnAllEntries = async (route: string): Promise <IAllTables[]> => {
  try {
    const entries = await getAllEntriesQuery(route);
    return convertDatabaseEntriesByTableName(route, entries);
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// modular route: returns single entry in a table by id
export const returnEntryById = async (route: string, id: string): Promise<IAllTables> => {
  // extract path from url and remove slashes and plural 's'
  const tableName = route.match(/(\/\w+\/)/g)![0].slice(1, -2);
  try {
    if (!tableName) {
      throw new CustomError('A database error has occurred.');
    } else {
      const entry = await getUniqueEntryQuery(tableName, id);
      return convertSingleEntryByTableName(tableName, entry);
    }
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// conversion

const convertDatabaseEntriesByTableName = (tableName: string, dbEntries: any[]): IAllTables[] => {
  switch (tableName) {
    case 'Comment':
      return dbEntries.map((entry: Comment): IComment => {
        const newEntry: IComment = {
          id: entry.id,
          content: entry.content,
          createdAt: entry.created_at,
          userId: entry.user_id,
          postId: entry.post_id
        };
        return newEntry;
      });
    case 'Post':
      return dbEntries.map((entry: Post): IPost => {
        const newEntry: IPost = {
          id: entry.id,
          title: entry.title,
          tags: entry.tags,
          createdAt: entry.created_at,
          content: entry.content,
          userId: entry.user_id,
          spaceId: entry.space_id
        };
        return newEntry;
      });
    case 'Role':
      break;
    case 'Space':
      return dbEntries.map((entry: Space): ISpace => {
        const newEntry: ISpace = {
          id: entry.id,
          name: entry.name,
          description: entry.description,
          createdAt: entry.created_at
        };
        return newEntry;
      });
    case 'User_Space_Role':
       return  dbEntries.map((entry: User_Space_Role): IUserSpaceRole => {  //eslint-disable-line
        const newEntry: IUserSpaceRole = {
          id: entry.id,
          userId: entry.user_id,
          spaceId: entry.space_id,
          roleId: entry.role_id
        };
        return newEntry;
      });
    case 'User':
      return dbEntries.map((entry: User): IUser => {
        const newEntry: IUser = {
          id: entry.id,
          email: entry.email,
          emailVerified: entry.email_verified,
          username: entry.username,
          pictureUrl: entry.picture_url,
          sub: entry.sub,
          createdAt: entry.created_at
        };
        return newEntry;
      });
    default: {
      throw new CustomError('A database error has occurred.');
    }
  }
  throw new CustomError('A database error has occurred.');
};

const convertSingleEntryByTableName = (tableName: string, dbEntry: any): IAllTables => {
  switch (tableName) {
    case 'Comment':
      return {
        id: dbEntry.id,
        content: dbEntry.content,
        createdAt: dbEntry.created_at,
        userId: dbEntry.user_id,
        postId: dbEntry.post_id
      };
    case 'Post':
      return {
        id: dbEntry.id,
        title: dbEntry.title,
        tags: dbEntry.tags,
        createdAt: dbEntry.created_at,
        content: dbEntry.content,
        userId: dbEntry.user_id,
        spaceId: dbEntry.space_id
      };
    case 'Role':
      break;
    case 'Space':
      return {
        id: dbEntry.id,
        name: dbEntry.name,
        description: dbEntry.description,
        createdAt: dbEntry.created_at
      };
    case 'User_Space_Role':
      return {
        id: dbEntry.id,
        userId: dbEntry.user_id,
        spaceId: dbEntry.space_id,
        roleId: dbEntry.role_id
      };
    case 'User':
      return {
        id: dbEntry.id,
        email: dbEntry.email,
        emailVerified: dbEntry.email_verified,
        username: dbEntry.username,
        pictureUrl: dbEntry.picture_url,
        sub: dbEntry.sub,
        createdAt: dbEntry.created_at
      };
    default: {
      throw new CustomError('A database error has occurred.');
    }
  }
  throw new CustomError('A database error has occurred.');
};
