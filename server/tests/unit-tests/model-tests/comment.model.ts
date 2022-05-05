import { IIncomingComment } from '../../../interfaces/comment.interface';
import { createComment } from '../../../models/comment.model';

const MOCK_DETAILS = { content: 'Test Post', userId: 1, postId: 2 };
const MOCK_RESPONSE = { ...MOCK_DETAILS, id: 25 }; ;

jest.mock('../../../queries/comment.queries', () => ({
  createCommentQuery: (commentDetails: any) : any => {
    if (commentDetails === MOCK_DETAILS) { return MOCK_RESPONSE; } else {
      throw new Error('A database error has occurred.');
    }
  }
}));
export const commentModelTests = (): void => {
  describe('Testing Comment Model', () => {
    it('Should send comment details to the db and get a comment with an id back', async () => {
      const response = await createComment(MOCK_DETAILS);
      expect(response.id).toEqual(MOCK_RESPONSE.id);
    });

    it('Should throw an error if called with wrong input', async () => {
      try {
        expect(await createComment({} as IIncomingComment)).toThrowError();
      } catch (e) {
        expect((e as Error).message).toEqual('A database error has occurred.');
      }
    });
  });
};
