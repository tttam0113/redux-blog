import React from 'react';
import { shallow } from 'enzyme';
import PostDetail from './PostDetail';

// let wrapper, match, fetchPost, post;

// beforeEach(() => {
//   wrapper = shallow(<PostDetail />);
// });

const match = { params: { postId: '123' } };
const post = {
  id: '123',
  author: 'tester',
  content: 'post detail content',
};
// let wrapper;
// beforeEach(() => {
//   wrapper = shallow(
//     <PostDetail loading post={post} fetchPost={fetchPostSpy} match={match} />,
//   );
// });

describe('PostDetail', () => {
  it('should render PostDetail correctly when loading is true', () => {
    const fetchPostSpy = jest.fn();
    const wrapper = shallow(
      <PostDetail loading post={undefined} fetchPost={fetchPostSpy} match={match} />,
    );

    expect(wrapper).toMatchSnapshot();
    // Display spinner while loading is true
    expect(wrapper.find('Spinner').length).toBe(1);
  });

  it('should render PostDetail correctly when loading is false', () => {
    const fetchPostSpy = jest.fn();
    const wrapper = shallow(
      <PostDetail loading={false} post={post} fetchPost={fetchPostSpy} match={match} />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Markdown').length).toBe(1);
  });

  it('should call fecthPost to get post detail if post is undefined', () => {
    const fetchPostSpy = jest.fn();
    const wrapper = shallow(
      <PostDetail loading post={undefined} fetchPost={fetchPostSpy} match={match} />,
    );

    expect(wrapper.find('Spinner').length).toBe(1);
    expect(fetchPostSpy).toHaveBeenCalledWith({ postId: match.params.postId });
  });

  it('should call fecthPost to get post detail if post.id does not match with param', () => {
    const fetchPostSpy = jest.fn();
    const wrapper = shallow(
      <PostDetail loading post={{ id: '1' }} fetchPost={fetchPostSpy} match={match} />,
    );

    expect(wrapper.find('Spinner').length).toBe(1);
    expect(fetchPostSpy).toHaveBeenCalledWith({ postId: match.params.postId });
  });

  it('should not call fecthPost to get post detail if post.id matches with param', () => {
    const fetchPostSpy = jest.fn();
    const wrapper = shallow(
      <PostDetail loading={false} post={post} fetchPost={fetchPostSpy} match={match} />,
    );

    expect(wrapper.find('Markdown').length).toBe(1);
    expect(fetchPostSpy).toHaveBeenCalledTimes(0);
  });
});
