import { CreateSpaceDataType, CreateUserType, PrismaError, SpaceDataType } from './interfaces/Interfaces';

const URL = process.env.REACT_APP_API;

const API_SERVICE = {
  // creates a new userSpaceRole and returns it
  createUserSpaceRole: async (userId: number, spaceId: number, roleId: number) => {
    const data = {
      userId,
      spaceId,
      roleId,
    };
    const res = await fetch(URL + '/User_Space_Roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const userSpaceRole = await res.json();
    return userSpaceRole;
  },
  // finds a user by given sub and returns it
  findUserBySub: async (sub: string) => {
    const res = await fetch(URL + `/usersBySub/${sub}`);
    const fetchedUser = await res.json();
    return fetchedUser;
  },
  // creates a new space and returns it
  createSpace: async (spaceData: CreateSpaceDataType) => {
    const res = await fetch(URL + '/spaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spaceData),
    });
    const newSpace: SpaceDataType | PrismaError = await res.json();
    return newSpace;
  },
  // finds a space by id and returns it
  findSpaceById: async (id: string) => {
    const res = await fetch(URL + `/spaces/${id}`);
    const foundSpace = await res.json();
    return foundSpace;
  },
  //delete single post and comments inside
  deletePostById: async (id: number) => {
    const res = await fetch(URL + `/posts/${id}`, {
      method: 'DELETE',
    });
    const deletedPost = await res.json();
    return deletedPost;
  },
  //delete single space and posts/comments inside
  deleteSpaceById: async (id: number) => {
    const res = await fetch(URL + `/spaces/${id}`, {
      method: 'DELETE',
    });
    const deletedSpace = await res.json();
    return deletedSpace;
  },
  //delete single userSpaceRole by spaceId
  deleteUserSpaceRoleBySpaceId: async (spaceId: number) => {
    const res = await fetch(URL + `/User_Space_Roles/${spaceId}`, {
      method: 'DELETE',
    });
    const deletedUserSpaceRole = await res.json();
    return deletedUserSpaceRole;
  },
  // creates a single user
  createUser: async (data: CreateUserType) => {
    await fetch(URL + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};

export default API_SERVICE;
