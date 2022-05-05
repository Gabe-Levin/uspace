import { postPost, deletePost } from '../../../controllers/post.controller';
import { Request, Response } from 'express';
import { IIncomingPost } from '../../../interfaces/post.interface';

const MOCK_REQ: {body: IIncomingPost} = { body: { title: 'Test Post', userId: 1, spaceId: 1, tags: 'test tags', content: 'test content' } };
const MOCK_RES = { ...MOCK_REQ.body, id: 25 }; ;
const MOCK_ID = '1';
const MOCK_REQ_DELETE: {params: {id: string}} = { params: { id: MOCK_ID } };
const MOCK_RES_DELETE: {id: number} = { id: +MOCK_ID };
jest.mock('../../../models/post.model', () => ({
  createPost: (postDetails: any) : any => {
    if (postDetails === MOCK_REQ.body) {
      return MOCK_RES;
    } else {
      throw new Error();
    }
  },
  deleteSinglePost: (id: string): Promise<number> => {
    if (id === MOCK_ID) {
      return Promise.resolve(+MOCK_ID);
    } else {
      throw new Error();
    }
  }
}));
export const postControllerTests = (): void => {
  describe('Testing Post Controller', () => {
    it('Should send post data in request to model and return the saved post', async () => {
      const mReq = MOCK_REQ as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await postPost(mReq, mRes);
      expect(mRes.status).toBeCalledWith(201);
      expect(mRes.send).toBeCalledWith(MOCK_RES);
    });

    it('Should handle errors thrown by the model', async () => {
      const mReq = { body: {} } as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await postPost(mReq, mRes);
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
    });

    it('Should send the post id of the deleted post to the client', async () => {
      const mReq = MOCK_REQ_DELETE as any;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await deletePost(mReq, mRes);
      expect(mRes.status).toBeCalledWith(202);
      expect(mRes.send).toBeCalledWith(MOCK_RES_DELETE);
    });

    it('Should return an error if an error is thrown by the model', async () => {
      const mReq = {} as any;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await deletePost(mReq, mRes);
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
    });
  });
};
