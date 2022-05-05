import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import LoginButton from '../LoginButton';
import userEvent from '@testing-library/user-event';
const mockedLoginWithRedirect = jest.fn();
jest.mock('@auth0/auth0-react', () => ({
  ...(jest.requireActual('@auth0/auth0-react') as any),
  useAuth0: () => {
    const loginWithRedirect = mockedLoginWithRedirect;
    return { loginWithRedirect };
  },
}));

describe('Testing LoginButton', () => {
  afterEach(cleanup);
  it('Should call login with redirect with no args', async () => {
    render(<LoginButton />);
    const button = screen.getByRole('button', { name: /log in/i });
    userEvent.click(button);
    expect(mockedLoginWithRedirect).toBeCalledTimes(1);
  });
});
