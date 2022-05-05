import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { IncomingEntry, PostType } from '../../../interfaces/Interfaces';
import Entry from '../Entry';

describe('Testing Entry component', () => {

  const MOCK_POST: PostType={
    id: 1,
    content: "testContent",
    tags: "testTags",
    title: "testTitle",
    userId: 1,
    spaceId: 1,
  } as PostType

  const MOCK_PROPS: IncomingEntry={
    post: MOCK_POST,
    setClickedPost: jest.fn(),
    index: 1,
    activePostId: 1,
    setActivePostId: jest.fn()
  }

  afterEach(cleanup);
  it('Matches snapshot', () => {
    const tree = renderer.create(<Entry 
      index={MOCK_PROPS.index}
      post={MOCK_PROPS.post}
      setClickedPost={jest.fn()}
      activePostId={MOCK_PROPS.activePostId}
      setActivePostId={MOCK_PROPS.setActivePostId} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})