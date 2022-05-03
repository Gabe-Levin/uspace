import { IIncomingUser } from '../../../interfaces/user.interface';
import { Request, Response } from 'express';
import { getUserBySub, postUser } from '../../../controllers/user.controller';

const MOCK_REQ: {body: IIncomingUser} = { body: { email: 'test@test.com', emailVerified: true, username: 'Stefan', pictureUrl: './image.png', sub: 'sub text' } };
const MOCK_RES = { ...MOCK_REQ.body, id: 25 };
const MOCK_REQ_2: {params: IIncomingUser} = { params: { email: 'test@test.com', emailVerified: true, username: 'Stefan', pictureUrl: './image.png', sub: 'sub text' } };

jest.mock('../../../models/user.model', () => ({
  createUser: (userDetails: any) : any => {
    if (userDetails === MOCK_REQ.body) { return MOCK_RES; } else {
      throw new Error();
    }
  },

  returnUserBySub: (userSub: any): any => {
    if (userSub === MOCK_REQ_2.params.sub) { return MOCK_RES; } // If user with sub exists in db
    if (userSub !== MOCK_REQ_2.params.sub && typeof userSub === 'string') { return null; } else { // If user wih sub doesn't exits in db
      throw new Error(); // all other cases
    }
  }

}));

describe('Testing User Controller', () => {
  // Testing Post Comment
  test('Should send user data in request to model and return the saved comment', async () => {
    const mReq = MOCK_REQ as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postUser(mReq, mRes);
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.send).toBeCalledWith(MOCK_RES);
  });

  test('Should handle errors thrown by the model', async () => {
    const mReq = { body: {} } as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postUser(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });

  // Testing getUserBySub
  test('Should return user data if it is found in the database', async () => {
    const mReq = MOCK_REQ_2 as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await getUserBySub(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(MOCK_RES);
  });

  test('Should handle error for user not found', async () => {
    const mReq = { params: { sub: 'Something nonexistant' } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await getUserBySub(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith({ error: 'User not found.' });
  });

  test('Should handle errors for all other cases', async () => {
    const mReq = { params: { } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await getUserBySub(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });
});
