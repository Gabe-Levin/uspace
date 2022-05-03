import { CustomError } from '../error-handling/custom-err.class';
import { IIncomingPost, IPost } from '../interfaces/post.interface';
import { createPostQuery, deletePostQuery } from '../queries/post.queries';

// creates a single post
export const createPost = async (postDetails: IIncomingPost): Promise<IPost> => {
  try {
    const post = await createPostQuery(postDetails);
    return post;
  } catch (error) {
    throw new CustomError('A database error has occurred.');
  }
};

// delete single post and comments inside
export const deleteSinglePost = async (id: string): Promise<number> => {
  try {
    const deletedPost = await deletePostQuery(id);
    return deletedPost.id;
  } catch (error) {
    throw new CustomError('A database error has occurred.');
  }
};
