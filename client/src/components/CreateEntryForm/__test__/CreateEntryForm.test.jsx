import React from 'react';
import CreateEntryForm from '../CreateEntryForm';
import { render, cleanup } from '@testing-library/react';
import { screen, container } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

const propsMock = {
  setOpened: jest.fn(),
  spaceId: 111,
  userId: 222,
  setPosts: jest.fn()
}

describe('Testing CreateEntryForm component', () => {
  afterEach(cleanup);
  test('contains a field to enter title', async () => {
    render(<CreateEntryForm setOpened={propsMock.setOpened} spaceId={propsMock.spaceId} userId={propsMock.userId} setPosts={propsMock.setPosts} />)
    const spaceNameInput = screen.getByLabelText(/title:/i);
    await userEvent.type(spaceNameInput, 'entry title', {delay: 1});
    // @ts-ignore
    expect(spaceNameInput.value).toBe('entry title');
  })
  // how to test rich text editor field?
  // test('contains a field to enter text', async () => {
  //   render(<CreateEntryForm setOpened={propsMock.setOpened} spaceId={propsMock.spaceId} userId={propsMock.userId} setPosts={propsMock.setPosts} />)
  //   const spaceNameInput = container.querySelector('#mantine-139nvdes9-body > div > form > div:nth-child(4) > div:nth-child(2) > div > div:nth-child(1)')
  //   await userEvent.type(spaceNameInput, 'entry content', {delay: 1});
  //   // @ts-ignore
  //   expect(spaceNameInput.value).toBe('entry content');
  // })
})