import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import uiReducer from './reducers/ui';
import postsReducer from './reducers/posts';
import postDetailReducer from './reducers/postDetail';
import authReducer from './reducers/auth';
// import filtersReducer from './reducers/filters';
import actionSplitterMiddleware from './middlewares/core/actionSplitter';
// import apiMiddleware from './middlewares/core/api';
// import apiFakerMiddleware from './middlewares/core/apifaker';
import firebaseApiMiddleware from './middlewares/core/firebaseApi';
import loggerMiddleware from './middlewares/core/logger';
import postsMiddleware from './middlewares/feature/posts';
import postDetailMiddleware from './middlewares/feature/postDetail';
import authMiddleware from './middlewares/feature/auth';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  posts: postsReducer,
  postDetail: postDetailReducer,
  // filters: filtersReducer,
});

const featureMiddlewares = [postsMiddleware, postDetailMiddleware, authMiddleware];
const coreMiddlewares = [
  actionSplitterMiddleware,
  // apiMiddleware,
  firebaseApiMiddleware,
  loggerMiddleware,
];

const composeEnhancers = compose;

const enhancer = composeEnhancers(applyMiddleware(...featureMiddlewares, ...coreMiddlewares));

export default createStore(rootReducer, {}, enhancer);
