import * as Methods from 'firebase/methods';
import {
    FEATURE,
    CLEAR_POSTS,
    FETCH_POSTS,
    setPosts,
    clearPosts,
} from '../../actions/posts';
// import { apiRequest, API_SUCCESS } from '../../actions/api';
import {
    firebaseApiRequest,
    FIREBASE_API_SUCCESS,
} from '../../actions/firebaseApi';
import { setPostsLoading } from '../../actions/ui';


export default ({ dispatch }) => next => (action) => {
    next(action);

    switch (action.type) {
        case CLEAR_POSTS:
            next(setPosts({ posts: [] }));
            break;
        case FETCH_POSTS:
            dispatch(clearPosts());
            next([
                // apiRequest({ method: 'GET', url: '/posts', feature: FEATURE }),
                firebaseApiRequest({
                    ref: 'posts',
                    method: Methods.ONCE_VALUE,
                    data: {},
                    feature: FEATURE,
                }),
                setPostsLoading({ state: true, feature: FEATURE }),
            ]);
            break;
        // case `${FEATURE} ${API_SUCCESS}`:
        //     next([
        //         setPosts({ posts: action.payload }),
        //         setPostsLoading({ state: false })
        //     ]);
        //     break;
        case `${FEATURE} ${FIREBASE_API_SUCCESS}`: {
            const snapshot = action.payload;
            const posts = [];
            snapshot.forEach((childSnapshot) => {
                posts.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                });
            });
            next([setPosts({ posts }), setPostsLoading({ state: false })]);
            break;
        }
        default:
            break;
    }
};
