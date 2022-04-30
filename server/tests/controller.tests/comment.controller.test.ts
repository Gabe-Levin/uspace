import { postComment } from '../../controllers/comment.controller';
import { Request, Response } from 'express';

const MOCK_REQ = { body: { content: 'Test Post', user_id: 1, post_id: 2 } };
const MOCK_RES = { ...MOCK_REQ.body, id: 25 }; ;
jest.mock('../../models/comment.model', () => ({
  createComment: (commentDetails: any) : any => {
    if (commentDetails === MOCK_REQ.body) {
      return MOCK_RES;
    } else {
      throw new Error();
    }
  }
}));

describe('Testing Comment Controller', () => {
  test('Should send comment data in request to model and return the saved comment', async () => {
    const mReq = MOCK_REQ as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.send).toBeCalledWith(MOCK_RES);
  });

  test('Should handle errors thrown by the model', async () => {
    const mReq = { body: {} } as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postComment(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });
});
