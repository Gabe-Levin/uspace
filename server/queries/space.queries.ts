import { Post, Comment } from '@prisma/client';
import { IComment } from '../interfaces/comment.interface';
import { IIncomingSpace, ISpace } from '../interfaces/space.interface';
import { IPostWithComments } from '../interfaces/spaceData.interface';
import { IUser } from '../interfaces/user.interface';
import { prisma } from '../prisma/prisma-client';

export const createSpaceQuery = async (newSpaceDetails: IIncomingSpace):Promise<ISpace> => {
  const spaceDetails = {
    name: newSpaceDetails.name,
    description: newSpaceDetails.description
  };
  const dbSpace = await prisma.space.create({
    data: spaceDetails
  });
  const space = {
    id: dbSpace.id,
    name: dbSpace.name,
    description: dbSpace.description,
    createdAt: dbSpace.created_at
  };
  return space;
};

export const findSpaceDataQuery = async (id: string): Promise<any> => {
  const dbSpaceData = await prisma.space.findUnique({
    where: {
      id: +id
    },
    include: {
      Post: {
        include: {
          Comment: true
        }
      },
      User_Space_Role: {
        where: {
          role_id: 2
        },
        select: {
          user: {
            select: {
              username: true,
              email: true,
              picture_url: true,
              id: true
            }
          }
        }
      }
    }
  });
  if (!dbSpaceData) {
    return null;
  }
  const spaceData = {
    id: dbSpaceData.id,
    name: dbSpaceData.name,
    description: dbSpaceData.description,
    createdAt: dbSpaceData.created_at,
    posts: dbSpaceData.Post.map<IPostWithComments>((post: Post & { Comment: Comment[] }) => ({
      id: post.id,
      title: post.title,
      userId: post.user_id,
      spaceId: post.space_id,
      createdAt: post.created_at,
      content: post.content,
      tags: post.tags,
      comments: post.Comment.map<IComment>((comment: Comment) => ({ id: comment.id, content: comment.content, createdAt: comment.created_at, postId: comment.post_id, userId: comment.user_id }))
    })),
    userSpaceRoles: dbSpaceData.User_Space_Role.map<{user: Omit<IUser, 'createdAt'|'emailVerified'|'sub'>}>((userSpaceRole: {
    user: {
        id: number;
        username: string;
        email: string;
        picture_url: string;
    };
}) => ({
      user: {
        id: userSpaceRole.user.id,
        username: userSpaceRole.user.username,
        email: userSpaceRole.user.email,
        pictureUrl: userSpaceRole.user.picture_url

      }
    }))
  };
  return spaceData;
};

export const deleteSpaceQuery = async (id: string): Promise<ISpace> => {
  const dbSpace = await prisma.space.delete({
    where: {
      id: +id // parse id to int
    }
  });
  const space: ISpace = {
    id: dbSpace.id,
    createdAt: dbSpace.created_at,
    description: dbSpace.description,
    name: dbSpace.name
  };
  return space;
};
