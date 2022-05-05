import { createSpace, deleteSingleSpace, returnSpaceData } from '../../../models/space.model';
import { IIncomingSpace, ISpace } from '../../../interfaces/space.interface';
import { ISpaceData } from '../../../interfaces/spaceData.interface';
import { Space } from '@prisma/client';
import { CustomError } from '../../../error-handling/custom-err.class';
const MOCK_DATE = new Date();
const MOCK_ID = '25';
const MOCK_INCOMING_SPACE: IIncomingSpace = { name: 'Example Space', description: 'Example Space description' };
const MOCK_SPACE: ISpace = { ...MOCK_INCOMING_SPACE, id: +MOCK_ID, createdAt: MOCK_DATE };

const MOCK_SPACE_DATA: ISpaceData = {
  id: +MOCK_ID,
  name: 'Example Space',
  description: 'Example Space description',
  createdAt: MOCK_DATE,
  posts: [
    {
      id: +MOCK_ID,
      title: 'Example Post title',
      tags: 'Example Tags',
      createdAt: MOCK_DATE,
      content: 'Exmaple Post content',
      userId: +MOCK_ID,
      spaceId: +MOCK_ID,
      comments: [
        {
          id: +MOCK_ID,
          content: 'Example Comment',
          createdAt: MOCK_DATE,
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
jest.mock('../../../queries/space.queries', () => ({
  createSpaceQuery: (newSpaceDetails: IIncomingSpace): Space => {
    if (newSpaceDetails === MOCK_INCOMING_SPACE) {
      return { ...MOCK_SPACE, created_at: new Date() };
    } else {
      throw new Error();
    }
  },
  findSpaceDataQuery: (id: string): ISpaceData | null => {
    if (id === MOCK_ID) {
      return MOCK_SPACE_DATA;
    }
    if (id) {
      return null;
    } else {
      throw new Error();
    }
  },
  deleteSpaceQuery: (id: string): Space => {
    if (id === MOCK_ID) {
      return { id: MOCK_ID } as any as Space;
    } else {
      throw new Error();
    }
  }
}));
export const spaceModelTests = (): void => {
  describe('Testing Space Model', () => {
    it('createSpace() Should send space to db and return the saved space with an id added to it', async () => {
      const response = await createSpace(MOCK_INCOMING_SPACE);
      expect(response.id).toEqual(MOCK_SPACE.id);
    });

    it('createSpace() Should throw an error if called with the wrong arguments', async () => {
      try {
        expect(await createSpace({} as IIncomingSpace)).toThrowError();
      } catch {}
    });

    it('returnSpaceData() Should return the space data fetched through a space id', async () => {
      const response = await returnSpaceData(MOCK_ID);
      expect(response).toEqual(MOCK_SPACE_DATA);
    });

    it('returnSpaceData() Should return null if no no space if found with a given id', async () => {
      const response = await returnSpaceData('26');
      expect(response).toEqual(null);
    });

    it('returnSpaceData() Should throw and error if the wrong input is provided', async () => {
      try {
        await returnSpaceData('');
      } catch (e) {
        expect(e).toBeInstanceOf(CustomError);
        expect((e as Error).message).toEqual('A database error has occurred.');
      }
    });

    it('deleteSingleSpace() Should return the id of the deleted space', async () => {
      const response = await deleteSingleSpace(MOCK_ID);
      expect(response).toEqual(MOCK_ID);
    });

    it('deleteSingleSpace() Should throw an error if an error is caught', async () => {
      try {
        await deleteSingleSpace('');
      } catch (e) {
        expect(e).toBeInstanceOf(CustomError);
        expect((e as Error).message).toEqual('A database error has occurred.');
      }
    });
  });
};
