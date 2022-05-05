import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Profile from '../Profile';

describe('Testing Profile component', () => {
  afterEach(cleanup);
  it('Matches snapshot', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})