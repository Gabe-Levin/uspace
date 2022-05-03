// eslint-disable-next-line camelcase
import { ISpacesAndCreator } from '../interfaces/spaces-and-creators.interface';
import { IIncomingUserSpaceRole, IUserSpaceRole } from '../interfaces/user-space-role.interface';
import { prisma } from '../prisma/prisma-client';

// eslint-disable-next-line camelcase
export const createUserSpaceRoleQuery = async (
  newUserSpaceRoleDetails: IIncomingUserSpaceRole
): Promise<IUserSpaceRole> => {
  const userSpaceRoleData = { user_id: newUserSpaceRoleDetails.userId, role_id: newUserSpaceRoleDetails.roleId, space_id: newUserSpaceRoleDetails.spaceId };
  const dbUserSpaceRole = await prisma.user_Space_Role.create({
    data: userSpaceRoleData
  });
  const userSpaceRole: IUserSpaceRole = {
    id: dbUserSpaceRole.id,
    roleId: dbUserSpaceRole.role_id,
    spaceId: dbUserSpaceRole.space_id,
    userId: dbUserSpaceRole.user_id
  };
  return userSpaceRole;
};

export const returnSpacesAndCreatorsQuery = async (): Promise<ISpacesAndCreator[]> => {
  const dbSpacesAndCreators = await prisma.space.findMany({
    include: {
      User_Space_Role: {
        where: {
          role_id: 2
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              picture_url: true
            }
          }
        }
      }
    }
  });
  const spacesAndCreators: ISpacesAndCreator[] = dbSpacesAndCreators.map<ISpacesAndCreator>((spaceAndCreator) => ({
    createdAt: spaceAndCreator.created_at,
    id: spaceAndCreator.id,
    description: spaceAndCreator.description,
    name: spaceAndCreator.name,
    userSpaceRoles: spaceAndCreator.User_Space_Role.map<{
      user: { id: number; email: string; pictureUrl: string; username: string };
    }>((dbUserSpaceRole) => ({
      user: {
        id: dbUserSpaceRole.user.id,
        email: dbUserSpaceRole.user.email,
        pictureUrl: dbUserSpaceRole.user.picture_url,
        username: dbUserSpaceRole.user.username
      }
    }))
  }));
  return spacesAndCreators;
};
export const deleteSingleUserSpaceRoleQuery = async (spaceId: string): Promise<any> =>
  prisma.user_Space_Role.deleteMany({
    where: {
      space_id: +spaceId // parse id to int
    }
  });
