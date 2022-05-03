import { CustomError } from '../error-handling/custom-err.class';
import { IComment, IIncomingComment } from '../interfaces/comment.interface';
import { createCommentQuery } from '../queries/comment.queries';

// creates a single comment
export const createComment = async (commentDetails: IIncomingComment): Promise<IComment> => {
  try {
    const comment = await createCommentQuery(commentDetails);
    return comment;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
