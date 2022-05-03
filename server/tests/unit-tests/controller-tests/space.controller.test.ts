import { postSpace, getSpaceData, deleteSpace } from '../../../controllers/space.controller';
import { Request, Response } from 'express';
import { IIncomingSpace, ISpace } from '../../../interfaces/space.interface';
import { ISpaceData } from '../../../interfaces/spaceData.interface';

const MOCK_ID = '25';
const MOCK_REQ: {body: IIncomingSpace} = { body: { name: 'Example Space', description: 'Example Space description' } };
const MOCK_RES: ISpace = { ...MOCK_REQ.body, id: +MOCK_ID, createdAt: new Date() }; ;
const MOCK_SPACE_DATA: ISpaceData = {
  id: +MOCK_ID,
  name: 'Example Space',
  description: 'Example Space description',
  createdAt: new Date(),
  posts: [
    {
      id: +MOCK_ID,
      title: 'Example Post title',
      tags: 'Example Tags',
      createdAt: new Date(),
      content: 'Exmaple Post content',
      userId: +MOCK_ID,
      spaceId: +MOCK_ID,
      comments: [
        {
          id: +MOCK_ID,
          content: 'Example Comment',
          createdAt: new Date(),
          userId: +MOCK_ID,
          postId: +MOCK_ID
        }
      ]
    }
  ],
  userSpaceRoles: [{
    user: {
      id: +MOCK_ID,
      email: 'Example Email',
      username: 'Example Username',
      pictureUrl: 'Example URL'
    }
  }]
};
const MOCK_REQ_ID_IN_PARAMS: {params: {id: string}} = { params: { id: MOCK_ID } };
// const MOCK_RES_DELETE: {id: number} = { id: +MOCK_ID };
jest.mock('../../../models/space.model', () => ({
  createSpace: (spaceDetails: IIncomingSpace) : ISpace => {
    if (spaceDetails === MOCK_REQ.body) {
      return MOCK_RES;
    } else {
      throw new Error();
    }
  },
  returnSpaceData: (id: string): ISpaceData | null => {
    if (id === MOCK_ID) {
      return MOCK_SPACE_DATA;
    }
    if (+id) {
      return null;
    } else {
      throw new Error();
    }
  },
  deleteSingleSpace: (id: string): number => {
    if (id === MOCK_ID) {
      return +MOCK_ID;
    } else {
      throw new Error();
    }
  }
}));

describe('Testing Space Controller', () => {
  test('postSpace() Should send space data in request to model and return the saved space', async () => {
    const mReq = MOCK_REQ as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postSpace(mReq, mRes);
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.send).toBeCalledWith(MOCK_RES);
  });

  test('postSpace() Should handle errors thrown by the model', async () => {
    const mReq = { body: {} } as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postSpace(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });

  test('getSpaceData() Should send the spacedata received by the model to the client', async () => {
    const mReq = MOCK_REQ_ID_IN_PARAMS as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await getSpaceData(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith(MOCK_SPACE_DATA);
  });

  test('getSpaceData() Should send a 404 if no space is found with the passed in ID', async () => {
    const mReq = { params: { id: '26' } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await getSpaceData(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith({ error: 'Space has not been found.' });
  });

  test('getSpaceData() Should send a 500 if a error comes back from the model', async () => {
    const mReq = { params: { id: 'hello' } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await getSpaceData(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });

  test('deleteSpace() Should send the id of the deleted space', async () => {
    const mReq = { params: { id: MOCK_ID } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await deleteSpace(mReq, mRes);
    expect(mRes.status).toBeCalledWith(202);
    expect(mRes.send).toBeCalledWith({ id: +MOCK_ID });
  });

  test('deleteSpace() Should send a 500 if a error comes back from the model', async () => {
    const mReq = { params: { id: 'hello' } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await deleteSpace(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });
});
