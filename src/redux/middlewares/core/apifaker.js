import { API_REQUEST, apiSuccess, apiError } from 'redux/actions/api';
import posts from './data/posts.json';
// import DemoPost from './data/how-to-test-react-components-with-jest-and-enzyme-in-depth.js';

export default ({ dispatch }) => next => action => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const data = action.payload || {};
    const { url, feature } = action.meta;

    if (url === '/posts') {
      const { offset = 0, limit = 10 } = data;

      setTimeout(() => {
        const response = posts.slice(offset, offset + limit);
        dispatch(apiSuccess({ response, data, feature }));
      }, 2000);
    } else if (url.match(/\/post\/\d+/)) {
      // const lastSplash = url.lastIndexOf('/');
      // const postId = parseInt(url.slice(lastSplash + 1 - url.length));
      // setTimeout(() => {
      //     const response = posts.find(item => item.id === postId);
      //     console.log(response);
      //     dispatch(apiSuccess({ response, data, feature }));
      // }, 1000);
      // const content = mdReader('./data/how-to-test-react-components-with-jest-and-enzyme-in-depth.md');
      // const content = loader('./data/how-to-test-react-components-with-jest-and-enzyme-in-depth.md');
      // console.log(content);
      // setTimeout(() => {
      //     const response = {
      //         title:
      //             'How to test React Compoents with Jest and Enzyme in depth',
      //         userId: 100,
      //         id: 1,
      //         content: DemoPost.replace(/<br\/>/gi, '\n'),
      //     };
      //     dispatch(apiSuccess({ response, data, feature }));
      // }, 500);
    } else {
      setTimeout(() => {
        dispatch(apiError({ error: 'NOT FOUND', feature }));
      }, 1000);
    }
  }
};
