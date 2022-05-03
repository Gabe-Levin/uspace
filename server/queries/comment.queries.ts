import { prisma } from '../prisma/prisma-client';
import { IComment, IIncomingComment } from '../interfaces/comment.interface';

export const createCommentQuery = async (commentDetails: IIncomingComment): Promise<IComment> => {
  const commentData = {
    content: commentDetails.content,
    user_id: commentDetails.userId,
    post_id: commentDetails.postId
  };
  const dbComment = await prisma.comment.create({
    data: commentData
  });
  const comment: IComment = {
    id: dbComment.id,
    content: dbComment.content,
    createdAt: dbComment.created_at,
    postId: dbComment.post_id,
    userId: dbComment.user_id
  };
  return comment;
};
