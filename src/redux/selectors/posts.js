import { createSelector } from 'reselect';

export const getPostDetail = state => state.postDetail;

export const getPosts = state => state.posts;

export const getPostItems = createSelector(
  getPosts,
  posts => posts.items,
);
