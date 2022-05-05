import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Welcome from '../Welcome';

describe('Testing Welcome component', () => {
  afterEach(cleanup);
  it('Matches snapshot', () => {
    const tree = renderer.create(<Welcome />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})