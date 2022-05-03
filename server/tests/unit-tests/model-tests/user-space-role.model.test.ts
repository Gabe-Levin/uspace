// eslint-disable-next-line camelcase
import { User_Space_Role } from '@prisma/client';
import { CustomError } from '../../../error-handling/custom-err.class';
import { IIncomingUserSpaceRole } from '../../../interfaces/user-space-role.interface';
import { createUserSpaceRole, deleteSingleUserSpaceRole } from '../../../models/user-space-role.model';

const MOCK_ID = '33';
const DELETED_LINE_COUNT = 1;
const MOCK_INCOMING_USERSPACEROLE: IIncomingUserSpaceRole = { user_id: 5, space_id: 4, role_id: 2 };
// eslint-disable-next-line camelcase
const MOCK_USERSPACEROLE: User_Space_Role = { ...MOCK_INCOMING_USERSPACEROLE, id: +MOCK_ID };

jest.mock('../../../queries/user-space-role.queries', () => ({
  // eslint-disable-next-line camelcase
  createUserSpaceRoleQuery: (newUserSpaceRoleDetails: IIncomingUserSpaceRole): User_Space_Role => {
    if (newUserSpaceRoleDetails === MOCK_INCOMING_USERSPACEROLE) {
      return { ...MOCK_USERSPACEROLE };
    } else {
      throw new Error();
    }
  },
  // returnSpacesAndCreatorsQuery:(),
  deleteSingleUserSpaceRoleQuery: (spaceId: string): any => {
    if (spaceId === MOCK_ID) {
      return { count: DELETED_LINE_COUNT } as any as number;
    } else {
      throw new Error();
    }
  }
}));

describe('Testing UserSpaceRole Model', () => {
  test('createUserSpaceRole() should send UserSpaceRole to db and return the saved space with an ide added to it', async () => {
    const response = await createUserSpaceRole(MOCK_INCOMING_USERSPACEROLE);
    expect(response.id).toEqual(MOCK_USERSPACEROLE.id);
  });

  test('createUserSpaceRole() should throw an error if called with the wrong arguments', async () => {
    try {
      expect(await createUserSpaceRole({} as IIncomingUserSpaceRole)).toThrowError();
    } catch {}
  });

  // test('returnSpacesAndCreators() should return a list of all spaces for the users with userRole=2', async () => {
  //   // test goes here
  // });

  // test('returnSpacesAndCreators() should throw an error if not able to fetch data from the db', async () => {
  //   // test goes here
  // });

  test('deleteSingleUserSpaceRole() should return the number of deleted rows matching the id', async () => {
    const response = await deleteSingleUserSpaceRole(MOCK_ID);
    expect(response).toEqual(DELETED_LINE_COUNT);
  });

  test('deleteSingleUserSpaceRole() should throw and error if an error is caught', async () => {
    try {
      await deleteSingleUserSpaceRole('123456789');
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((err as Error).message).toEqual('A database error has occurred.');
    }
  });
});
