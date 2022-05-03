import { createPost, deleteSinglePost } from '../models/post.model';
import { Request, Response } from 'express';
import { handleError } from '../error-handling/error-helpers';

// creates a single post
export const postPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await createPost(req.body);
    res.status(201);
    res.send(post);
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};

// delete a single post by id
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPostId = await deleteSinglePost(req.params.id);
    res.status(202);
    res.send({ id: deletedPostId });
  } catch (error) {
    res.status(500);
    res.send(handleError(error));
  }
};
