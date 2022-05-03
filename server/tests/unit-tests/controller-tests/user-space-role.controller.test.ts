import { Request, Response } from 'express';
import { deleteUserSpaceRole, postUserSpaceRole } from '../../../controllers/user-space-role.controller';
// import { ISpacesAndCreator } from '../../../interfaces/spaces-and-creators.interface';
import { IIncomingUserSpaceRole } from '../../../interfaces/user-space-role.interface';

// Mock data
const MOCK_ID = '33';
const MOCK_REQ: {body: IIncomingUserSpaceRole} = { body: { userId: 1, spaceId: 2, roleId: 1 } };
const MOCK_RES = { ...MOCK_REQ.body, id: 7 };
// const MOCK_SPACES_AND_CREATORS_DATA: ISpacesAndCreator = {

// };
jest.mock('../../../models/user-space-role.model', () => ({
  createUserSpaceRole: (userSpaceRoleDetails: IIncomingUserSpaceRole) : any => {
    if (userSpaceRoleDetails === MOCK_REQ.body) {
      return MOCK_RES;
    } else {
      throw new Error();
    }
  },
  // returnSpacesAndCreators: (): ISpacesAndCreator[] => {

  // },
  deleteSingleUserSpaceRole: (id: string): number => {
    if (id === MOCK_ID) {
      return +MOCK_ID;
    } else {
      throw new Error();
    }
  }
}));

describe('Testing UserSpaceRole Controller', () => {
  // Tests for PostUserSpaceRole function
  test('postUserSpaceRole() should send UserSpaceRole data in request to model and return the saved UserSpaceRole', async () => {
    const mReq = MOCK_REQ as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postUserSpaceRole(mReq, mRes);
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.send).toBeCalledWith(MOCK_RES);
  });

  test('postUserSpaceRole should handle errors thrown by the model when creating a new UserSpaceRole', async () => {
    const mReq = { body: {} } as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await postUserSpaceRole(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });

  // Tests for returning spaces and their creators
  // test('Should return all spaces and their creators from model', async () => {
  //   // //test goes here
  // });

  // test('Should handle errors thrown by the model when requesting all spaces and their creators from model', async () => {
  //   // //test goes here
  // });

  // Tests for deleting a single UserSpaceRole by spaceId
  test('deleteUserSpaceRole() should send spaceId from request params in request to model and return the deleted row data', async () => {
    const mReq = { params: { spaceId: MOCK_ID } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await deleteUserSpaceRole(mReq, mRes);
    expect(mRes.status).toBeCalledWith(202);
    expect(mRes.send).toBeCalledWith(+MOCK_ID);
  });

  test('deleteUserSpaceRole() should handle errors thrown by the model when deleting an item in UserSpaceRole table', async () => {
    const mReq = { params: { spaceId: '999' } } as any as Request;
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any as Response;
    await deleteUserSpaceRole(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.send).toBeCalledWith({ error: 'An unknown server error has occurred.' });
  });
});
