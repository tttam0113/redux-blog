import { SET_POST } from '../actions/postDetail';

const initialState = {
    author: '',
    id: '',
    title: '',
    content: '',
    link: ''
};

export default (postDetail = initialState, action) => {
    switch (action.type) {
        case SET_POST:
            return {
                ...postDetail,
                ...action.payload
            };
        default:
            return postDetail;
    }
};
