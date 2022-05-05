import React from 'react';
import CreateSpaceForm from '../CreateSpaceForm';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

const mockDate = new Date();
const mockedUseNavigate = jest.fn();
const propsMock = {
  setOpened: jest.fn(),
  allSpaces: [
    {
      id: 111,
      name: 'space 1 name',
      createdAt: mockDate,
      userSpaceRoles: [
        { user: { username: 'billy', email: 'billy@billy.com' } },
        { user: { username: 'sammy', email: 'sammy@gsammy.com' } },
      ],
    },
    {
      id: 222,
      name: 'space 2 name',
      createdAt: mockDate,
      userSpaceRoles: [
        { user: { username: 'ms', email: 'ms@ms.com' } },
        { user: { username: 'mavi', email: 'mavi@gmavi.com' } },
      ],
    },
  ],
  setAllSpaces: jest.fn(),
};
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedUseNavigate,
}));

describe('Testing CreateSpaceFrom component', () => {
  afterEach(cleanup);
  test('contains a field to enter space name', async () => {
    render(
      <CreateSpaceForm
        setOpened={propsMock.setOpened}
        allSpaces={propsMock.allSpaces}
        setAllSpaces={propsMock.setAllSpaces}
      />
    );
    const spaceNameInput = screen.getByLabelText(/space name:/i);
    await userEvent.type(spaceNameInput, 'new space', { delay: 1 });
    // @ts-ignore
    expect(spaceNameInput.value).toBe('new space');
  });
  test('contains a field to enter space description', async () => {
    render(
      <CreateSpaceForm
        setOpened={propsMock.setOpened}
        allSpaces={propsMock.allSpaces}
        setAllSpaces={propsMock.setAllSpaces}
      />
    );
    const spaceDescriptionInput = screen.getByLabelText(/description:/i);
    await userEvent.type(spaceDescriptionInput, 'new space description', { delay: 1 });
    // @ts-ignore
    expect(spaceDescriptionInput.value).toBe('new space description');
  });
  test('snapshot matches, component renders correctly', () => {
    const tree = renderer
      .create(
        <CreateSpaceForm
          setOpened={propsMock.setOpened}
          allSpaces={propsMock.allSpaces}
          setAllSpaces={propsMock.setAllSpaces}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Not finished
  // test('prevents default on click', async () => {
  //   render(<CreateSpaceForm setOpened={propsMock.setOpened} allSpaces={propsMock.allSpaces} setAllSpaces={propsMock.setAllSpaces} />);
  //   const button = screen.getByRole('button', { name: /create/i });
  //   const buttonClickEvent = new MouseEvent('click');
  //   Object.assign(buttonClickEvent, {preventDefault: jest.fn()});
  //   fireEvent.click(button, buttonClickEvent);
  //   expect(buttonClickEvent.preventDefault).toBeCalled();
  // })
});
