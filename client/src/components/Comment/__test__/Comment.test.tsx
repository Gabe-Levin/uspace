import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { UserType } from '../../../interfaces/Interfaces';
import Comment, { Incoming } from '../Comment';

describe('Testing Comment component', () => {
  const mockUser: UserType = {
    createdAt: new Date(),
    email: 'Fake Email',
    emailVerified: true,
    id: 1,
    pictureUrl: 'https://cdn.webshopapp.com/shops/108044/files/253423967/650x750x1/narcissus-pimpernel.jpg',
    sub: 'fakesub',
    username: 'fakeUsername',
  };
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(mockUser) } as any as Response);
  });
  afterEach(cleanup);
  const props: Incoming = {
    comment: { content: 'Test Content', createdAt: 'Fake Date', id: 1, postId: 1, userId: 1 },
  };
  it('Renders without crashing', async () => {
    render(<Comment comment={props.comment} />);
  });
  it('Should update the user with data returned from fetch', async () => {
    render(<Comment comment={props.comment} />);
    const img = (await screen.findByRole('img')) as HTMLImageElement;
    await waitFor(() => {
      expect(img.src).toEqual(mockUser.pictureUrl);
    });
    await waitFor(async () => {
      expect(await screen.findByText(mockUser.username)).toBeTruthy();
    });
  });
});
