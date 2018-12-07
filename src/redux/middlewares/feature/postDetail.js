import {
    FEATURE,
    CLEAR_POST,
    FETCH_POST,
    ADD_POST,
    REMOVE_POST,
    UPDATE_POST,
    setPost,
    clearPost
} from 'redux/actions/postDetail';
import {
    firebaseApiRequest,
    FIREBASE_API_SUCCESS,
    FIREBASE_API_FAILURE
} from 'redux/actions/firebaseApi';
import {
    setPostDetailLoading,
    setPostDetailUpdating,
    setPostFormSubmitting
} from 'redux/actions/ui';
import * as Methods from 'firebase/methods';

export default ({ dispatch, getState }) => next => action => {
    next(action);

    switch (action.type) {
        case CLEAR_POST:
            next(setPost({ post: {} }));
            break;
        case FETCH_POST: {
            dispatch(clearPost());

            const postId = action.payload.postId;
            // try to find in current list
            const posts = getState().posts.items;
            let post = undefined;
            if (posts && posts.length) {
                post = posts.find(p => p.id === postId);
            }
            if (post) {
                next([setPost({ post })]);
                return;
            } else {
                next([
                    firebaseApiRequest({
                        ref: `posts/${postId}`,
                        method: Methods.ONCE_VALUE,
                        data: {},
                        feature: FEATURE
                    }),
                    setPostDetailLoading({ state: true, feature: FEATURE })
                ]);
            }
            break;
        }
        case ADD_POST: {
            next([
                firebaseApiRequest({
                    ref: 'posts',
                    method: Methods.PUSH,
                    data: action.payload,
                    feature: FEATURE
                }),
                setPostFormSubmitting({ state: true, feature: FEATURE })
            ]);
            break;
        }
        case UPDATE_POST: {
            const { id: postId, update: updateData } = action.payload;
            next([
                firebaseApiRequest({
                    ref: `posts/${postId}`,
                    method: Methods.UPDATE,
                    data: updateData,
                    feature: FEATURE
                }),
                setPostDetailUpdating({ state: true, feature: FEATURE })
            ]);
            break;
        }
        case `${FEATURE} ${FIREBASE_API_SUCCESS}`: {
            const metaData = action.meta.data;
            const { method } = metaData;
            const snapshot = action.payload;

            if (method === Methods.PUSH) {
                next(setPostFormSubmitting({ state: false, feature: FEATURE }));
            } else if (method === Methods.ONCE_VALUE) {
                const val = snapshot.val();
                next([
                    setPost({ post: { id: snapshot.key, ...val } }),
                    setPostDetailLoading({ state: false, feature: FEATURE })
                ]);
            } else if (method === Methods.UPDATE) {
                next(setPostDetailUpdating({ state: false, feature: FEATURE }));
            }
            break;
        }
        case `${FEATURE} ${FIREBASE_API_FAILURE}`:
            next([setPostDetailLoading({ state: false, feature: FEATURE })]);
            break;
        default:
            break;
    }
};
