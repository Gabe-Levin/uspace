import { getAllEntries, getSingleEntryById } from '../../../controllers/modular-routes.controller';
import { Request, Response } from 'express';

const tableNameList = ['Comment', 'Post', 'Space', 'User_Space_Role', 'User'];
const tableNameListWithRole = ['Comment', 'Post', 'Space', 'User_Space_Role', 'User', 'Role'];
let MOCK_TABLE_NAME;
const MOCK_ID = '3';
const MOCK_RES_ARR = [{ id: +MOCK_ID, tableName: MOCK_TABLE_NAME }, { id: +MOCK_ID + 1, tableName: MOCK_TABLE_NAME }];

jest.mock('../../../models/modular-routes.model', () => ({
  returnAllEntries: (tableName: string): any => {
    const tableNameIndex = tableNameList.indexOf(tableName);
    if (tableNameIndex >= 0) { return MOCK_RES_ARR; }
    if (tableName === 'Role') { return null; }
    throw new Error();
  },
  returnEntryById: (route: string, id: number): any => {
    const tableNameIndex = tableNameListWithRole.indexOf(route);
    if (+MOCK_ID === id && tableNameIndex >= 0) { return { ...MOCK_RES_ARR[0], tableName: route }; }
    if (id !== +MOCK_ID && typeof id === 'number') { return []; }
    throw new Error('A database error has occurred.');
  }
}));
export const modularRoutesControllerTests = (): void => {
  describe('Testing Modular-Routes Controller', () => {
  // Testing Get all entries
    it('Should send request to model and fetch all results for Comment', async () => {
      MOCK_TABLE_NAME = 'Comment';
      const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getAllEntries(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
    });
    it('Should send request to model and fetch all results for Post', async () => {
      MOCK_TABLE_NAME = 'Post';
      const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getAllEntries(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
    });
    it('Should send request to model and fetch all results for Space', async () => {
      MOCK_TABLE_NAME = 'Space';
      const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getAllEntries(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
    });
    it('Should send request to model and fetch all results for User_Space_Role', async () => {
      MOCK_TABLE_NAME = 'User_Space_Role';
      const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getAllEntries(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
    });
    it('Should send request to model and fetch all results for User', async () => {
      MOCK_TABLE_NAME = 'User';
      const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getAllEntries(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith(MOCK_RES_ARR);
    });
    it('Should return null if the model is passed a request for Role', async () => {
      MOCK_TABLE_NAME = 'Role';
      const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getAllEntries(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith(null);
    });
    it('Should return error if the model is passed a request for Wrong Path', async () => {
      MOCK_TABLE_NAME = 'WRONG PATH';
      const MOCK_REQ = { path: '/' + MOCK_TABLE_NAME + 's' };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getAllEntries(mReq, mRes);
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
    });

    // Testing getSingleEntryByID
    it('Should send request to model and fetch the result with corresponding id for Comment', async () => {
      MOCK_TABLE_NAME = 'Comment';
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({ ...MOCK_RES_ARR[0], tableName: MOCK_TABLE_NAME });
    });
    it('Should send request to model and fetch the result with corresponding id for Post', async () => {
      MOCK_TABLE_NAME = 'Post';
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({ ...MOCK_RES_ARR[0], tableName: MOCK_TABLE_NAME });
    });
    it('Should send request to model and fetch the result with corresponding id for Space', async () => {
      MOCK_TABLE_NAME = 'Space';
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({ ...MOCK_RES_ARR[0], tableName: MOCK_TABLE_NAME });
    });
    it('Should send request to model and fetch the result with corresponding id for User_Space_Role', async () => {
      MOCK_TABLE_NAME = 'User_Space_Role';
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({ ...MOCK_RES_ARR[0], tableName: MOCK_TABLE_NAME });
    });
    it('Should send request to model and fetch the result with corresponding id for User', async () => {
      MOCK_TABLE_NAME = 'User';
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({ ...MOCK_RES_ARR[0], tableName: MOCK_TABLE_NAME });
    });
    it('Should send request to model and fetch the result with corresponding id for Role', async () => {
      MOCK_TABLE_NAME = 'Role';
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({ ...MOCK_RES_ARR[0], tableName: MOCK_TABLE_NAME });
    });
    it('Should send request to model and return empty array if entry not in database', async () => {
      MOCK_TABLE_NAME = 'Role';
      const MOCK_ID_OFFSET = 10;
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID + MOCK_ID_OFFSET } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith([]);
    });
    it('Should send request to model and throw error if route is wrong', async () => {
      MOCK_TABLE_NAME = 'WRONG ROUTE';
      const MOCK_REQ = { path: MOCK_TABLE_NAME, params: { id: +MOCK_ID } };
      const mReq = MOCK_REQ as any as Request;
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
      await getSingleEntryById(mReq, mRes);
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
    });
  });
};
