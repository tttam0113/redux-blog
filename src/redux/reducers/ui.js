import {
  SET_POSTS_LOADING,
  SET_POST_DETAIL_LOADING,
  SET_POST_DETAIL_DELETING,
  SET_POST_DETAIL_UPDATING,
  SET_POST_FORM_SUBMITTING,
} from '../actions/ui';

const initialState = {
  posts: { loading: false },
  postDetail: { loading: false, deleting: false, updating: false },
  postForm: { submitting: false },
};

export default (ui = initialState, action) => {
  switch (action.type) {
    case SET_POSTS_LOADING:
      return {
        ...ui,
        posts: { loading: action.payload },
      };
    case SET_POST_DETAIL_LOADING:
    case SET_POST_DETAIL_DELETING:
    case SET_POST_DETAIL_UPDATING:
      return {
        ...ui,
        postDetail: { ...ui.postDetail, ...action.payload },
      };
    case SET_POST_FORM_SUBMITTING:
      return {
        ...ui,
        postForm: { submitting: action.payload },
      };
    default:
      return ui;
  }
};
