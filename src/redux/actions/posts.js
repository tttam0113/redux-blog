export const FEATURE = '[Posts]';

export const FETCH_POSTS = `${FEATURE} FETCH_POSTS`;
export const FETCH_MORE_POSTS = `${FEATURE} FETCH_MORE_POSTS`;
export const CLEAR_POSTS = `${FEATURE} CLEAR_POSTS`;

export const SET_POSTS = `${FEATURE} SET_POSTS`;
export const SET_MORE_POSTS = `${FEATURE} SET_MORE_POSTS`;

export const fetchPosts = () => ({
    type: FETCH_POSTS,
    payload: {},
    meta: { feature: FEATURE }
});

export const fetchMorePosts = () => ({
    type: FETCH_MORE_POSTS,
    payload: {},
    meta: { feature: FEATURE }
});

export const clearPosts = () => ({
    type: CLEAR_POSTS,
    payload: null,
    meta: { feature: FEATURE }
});

export const setPosts = ({ posts }) => ({
    type: SET_POSTS,
    payload: posts,
    meta: { feature: FEATURE }
});

export const setMorePosts = ({ posts }) => ({
    type: SET_MORE_POSTS,
    payload: posts,
    meta: { feature: FEATURE }
});
