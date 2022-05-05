import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import SignupButton from '../SignupButton';
import userEvent from '@testing-library/user-event';
const mockedLoginWithRedirect = jest.fn();
jest.mock('@auth0/auth0-react', () => ({
  ...(jest.requireActual('@auth0/auth0-react') as any),
  useAuth0: () => {
    const loginWithRedirect = mockedLoginWithRedirect;
    return { loginWithRedirect };
  },
}));

describe('Testing SignupButton', () => {
  afterEach(cleanup);
  it('Should call login with redirect with correct agrs', async () => {
    render(<SignupButton />);
    const button = screen.getByRole('button', { name: /sign up/i });
    userEvent.click(button);
    expect(mockedLoginWithRedirect).toBeCalledWith({
      screen_hint: 'signup',
    });
  });
});
