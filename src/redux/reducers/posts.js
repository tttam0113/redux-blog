import { SET_POSTS } from '../actions/posts';

const initialState = {
    currentPage: 0,
    totalItems: 0,
    items: []
};

export default (posts = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...posts,
                items: action.payload
            };
        default:
            return posts;
    }
};
