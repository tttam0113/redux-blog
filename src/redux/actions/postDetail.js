export const FEATURE = '[PostDetail]';

export const FETCH_POST = `${FEATURE} FETCH_POST`;
export const CLEAR_POST = `${FEATURE} CLEAR_POST`;
export const UPDATE_POST = `${FEATURE} UPDATE_POST`;
export const REMOVE_POST = `${FEATURE} REMOVE_POST`;
export const ADD_POST = `${FEATURE} ADD_POST`;
export const EDIT_POST = `${FEATURE} EDIT_POST`;

export const SET_POST = `${FEATURE} SET_POST`;

export const fetchPost = ({ postId }) => ({
    type: FETCH_POST,
    payload: { postId },
    meta: { feature: FEATURE }
});

export const clearPost = () => ({
    type: CLEAR_POST,
    payload: null,
    meta: { feature: FEATURE }
});

export const updatePost = ({ id, update }) => ({
    type: UPDATE_POST,
    payload: { id, update },
    meta: { feature: FEATURE }
});

export const removePost = ({ id }) => ({
    type: REMOVE_POST,
    payload: id,
    meta: { feature: FEATURE }
});

export const addPost = ({ post }) => ({
    type: ADD_POST,
    payload: post,
    meta: { feature: FEATURE }
});

export const setPost = ({ post }) => ({
    type: SET_POST,
    payload: post,
    meta: { feature: FEATURE }
});
