import { CustomError } from '../../../error-handling/custom-err.class';
import { IAllTables } from '../../../interfaces/modular-routes.interface';
import { returnAllEntries, returnEntryById } from '../../../models/modular-routes.model';

const ROUTES = ['Comment', 'Space', 'Post', 'User', 'User_Space_Role'];
const MOCK_DATE = new Date();
const MOCK_RESPONSE: {[key: string]: any[]} = {
  Comment: [{ content: 'Test Comment', user_id: 1, post_id: 1, id: 1, created_at: MOCK_DATE }],
  Space: [{ name: 'Example Space', description: 'Example Space description', id: 1, created_at: MOCK_DATE }],
  Post: [{ title: 'Test Post', user_id: 1, space_id: 1, tags: 'test tags', content: 'test content', created_at: MOCK_DATE, id: 1 }],
  User: [{ email: 'test@test.com', email_verified: true, username: 'Stefan', picture_url: './image.png', sub: 'test sub', id: 1, created_at: MOCK_DATE }],
  User_Space_Role: [{ user_id: 1, space_id: 2, role_id: 1, id: 1 }]
};
const EXPECTED_VALUES: {[key: string]: IAllTables[]} = {
  Comment: [{ content: 'Test Comment', userId: 1, postId: 1, id: 1, createdAt: MOCK_DATE }],
  Space: [{ name: 'Example Space', description: 'Example Space description', id: 1, createdAt: MOCK_DATE }],
  Post: [{ title: 'Test Post', userId: 1, spaceId: 1, tags: 'test tags', content: 'test content', createdAt: MOCK_DATE, id: 1 }],
  User: [{ email: 'test@test.com', emailVerified: true, username: 'Stefan', pictureUrl: './image.png', sub: 'test sub', id: 1, createdAt: MOCK_DATE }],
  User_Space_Role: [{ userId: 1, spaceId: 2, roleId: 1, id: 1 }]
};
jest.mock('../../../queries/modular-routes.queries', () => ({
  getAllEntriesQuery: (tableName: string): any[] => {
    if (ROUTES.includes(tableName)) {
      return MOCK_RESPONSE[tableName];
    } else {
      throw new CustomError('A database error has occurred.');
    }
  },
  getUniqueEntryQuery: (tableName: string, _: string): IAllTables => {
    if (ROUTES.includes(tableName)) {
      return MOCK_RESPONSE[tableName][0];
    } else {
      throw new CustomError('A database error has occurred.');
    }
  }
}));
export const modularRoutesModelTests = (): void => {
  describe('Testing Modular Routes model', () => {
    for (const route of ROUTES) {
      it(route + 's', async () => {
        const response = await returnAllEntries(route);
        expect(response).toEqual(EXPECTED_VALUES[route]);
      });
      it(route + 's', async () => {
        const response = await returnEntryById(`/${route}s/1`, '1');
        expect(response).toEqual(EXPECTED_VALUES[route][0]);
      });
    }
    it('Catch error on Role route', async () => {
      try {
        await returnAllEntries('Role');
      } catch (e) {
        expect((e as Error).message).toBe('A database error has occurred.');
      }
    });

    it('Catch error on Role route', async () => {
      try {
        await returnEntryById('/Role/1', '1');
      } catch (e) {
        expect((e as Error).message).toBe('A database error has occurred.');
      }
    });
  });
};
