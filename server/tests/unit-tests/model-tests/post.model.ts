import { IIncomingPost, IPost } from '../../../interfaces/post.interface';
import { createPost, deleteSinglePost } from '../../../models/post.model';

const TEST_ID = '1';
const MOCK_DETAILS = { title: 'Test Post', userId: 1, spaceId: 1, tags: 'test tags', content: 'test content' };
const MOCK_RESPONSE = { ...MOCK_DETAILS, id: +TEST_ID, createdAt: new Date() }; ;

jest.mock('../../../queries/post.queries', () => ({
  createPostQuery: (postDetails: IIncomingPost) : any => {
    if (postDetails === MOCK_DETAILS) { return MOCK_RESPONSE; } else {
      throw new Error('A database error has occurred.');
    }
  },
  deletePostQuery: (id: string) : IPost => {
    if (+id) {
      return MOCK_RESPONSE;
    } else {
      throw new Error();
    }
  }
}));
export const postModelTests = (): void => {
  describe('Testing Post Model', () => {
    it('Should send post details to the db and get a post with an id back', async () => {
      const response = await createPost(MOCK_DETAILS);
      expect(response.id).toEqual(MOCK_RESPONSE.id);
    });

    it('Should throw an error if called with wrong input', async () => {
      try {
        expect(await createPost({} as IIncomingPost)).toThrowError();
      } catch (e) {
        expect((e as Error).message).toEqual('A database error has occurred.');
      }
    });

    it('Should get the post id from the deleted post and return it as a number', async () => {
      const response = await deleteSinglePost(TEST_ID);
      expect(response).toEqual(MOCK_RESPONSE.id);
    });

    it('Should throw an error if called with wrong input', async () => {
      try {
        expect(await deleteSinglePost('hello')).toThrowError();
      } catch (e) {
        expect((e as Error).message).toEqual('A database error has occurred.');
      }
    });
  });
};
