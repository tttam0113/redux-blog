import {
    FETCH_USER, LOGIN, LOGOUT, setUser,
} from 'redux/actions/auth';

import { firebase, googleAuthProvider } from '../../../firebase/firebase';

export default () => next => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_USER:
            firebase.auth().onAuthStateChanged((user) => {
                console.log(user);
                next(setUser({ user }));
            });
            break;
        case LOGIN:
            // next(setUserId({ userId: 100 }));
            firebase.auth().signInWithPopup(googleAuthProvider);
            break;
        case LOGOUT:
            // next(setUserId({ userId: 0 }));
            firebase.auth().signOut();
            break;
        default:
            break;
    }
};
