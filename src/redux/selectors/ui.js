import { createSelector } from 'reselect';

export const getUi = state => state.ui;

export const getPostsUi = createSelector(
    getUi,
    ui => ui.posts
);

export const getPostsUiLoading = createSelector(
    getPostsUi,
    postUi => postUi.loading
);

export const getPostDetailUi = createSelector(
    getUi,
    ui => ui.postDetail
);

export const getPostDetailLoading = createSelector(
    getPostDetailUi,
    postDetailUi => postDetailUi.loading
);
