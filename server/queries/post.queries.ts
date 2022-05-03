import { prisma } from '../prisma/prisma-client';
import { IIncomingPost, IPost } from '../interfaces/post.interface';

export const createPostQuery = async (postDetails: IIncomingPost): Promise<IPost> => {
  const postDet = {
    title: postDetails.title,
    tags: postDetails.tags,
    content: postDetails.content,
    user_id: postDetails.userId,
    space_id: postDetails.spaceId
  };
  const dbPost = await prisma.post.create({
    data: postDet
  });
  const post: IPost = {
    id: dbPost.id,
    content: dbPost.content,
    createdAt: dbPost.created_at,
    spaceId: dbPost.space_id,
    tags: dbPost.tags,
    title: dbPost.title,
    userId: dbPost.user_id
  };
  return post;
};

export const deletePostQuery = async (id: string): Promise<IPost> => {
  const dbPost = await prisma.post.delete({
    where: {
      id: +id // parse id to int
    }
  });
  const post: IPost = {
    id: dbPost.id,
    content: dbPost.content,
    createdAt: dbPost.created_at,
    spaceId: dbPost.space_id,
    tags: dbPost.tags,
    title: dbPost.title,
    userId: dbPost.user_id
  };
  return post;
};
