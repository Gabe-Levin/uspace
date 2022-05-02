import { User } from '@prisma/client';
import { IIncomingUser } from '../../../interfaces/user.interface';
import { createUser, returnUserBySub } from '../../../models/user.model';

const TEST_ID = '1';
const TEST_SUB = 'sub text';
const MOCK_DETAILS = { email: 'test@test.com', email_verified: true, username: 'Stefan', picture_url: './image.png', sub: TEST_SUB };
const MOCK_RESPONSE = { ...MOCK_DETAILS, id: +TEST_ID, created_at: new Date() };

jest.mock('../../../queries/user.queries', () => ({
  createUserQuery: (newUserDetails: IIncomingUser) : any => {
    if (newUserDetails === MOCK_DETAILS) { return MOCK_RESPONSE; } else {
      throw new Error('A database error has occurred.');
    }
  },
  findFirstQuery: (sub: string): User | null => {
    if (sub === MOCK_DETAILS.sub) {
      return MOCK_RESPONSE;
    } else if (!+sub) { return null; } else {
      throw new Error();
    }
  }

}));

describe('Testing User Model', () => {
  // Testing createUser
  it('Should send user details to db and get a user with an id back', async () => {
    const response = await createUser(MOCK_DETAILS);
    expect(response.id).toEqual(MOCK_RESPONSE.id);
  });

  it('Should throw an error if error occurred in db ', async () => {
    try {
      expect(await createUser({} as IIncomingUser)).toThrowError();
    } catch (e) {
      expect((e as Error).message).toEqual('A database error has occurred.');
    }
  });

  // Testing returnUserBySub
  it('Should send sub to database and get corresponding user back', async () => {
    const response = await returnUserBySub(TEST_SUB);
    expect(response?.id).toEqual(MOCK_RESPONSE.id);// response may be null
  });

  it('Should send sub to database get null of corresponding user does not exist', async () => {
    const response = await returnUserBySub('wrong sub');
    expect(response).toEqual(null);
  });

  it('Should send sub to database get null of corresponding user does not exist', async () => {
    try {
      expect(await returnUserBySub('9')).toThrowError();
    } catch (e) {
      expect((e as Error).message).toEqual('A database error has occurred.');
    }
  });
});
