import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';


export const createUserUserName = (username, firstName, lastName, uid, email,) => {

    return set(ref(db, `users/${username}`), {
        username,
        firstName,
        lastName,
        uid,
        email,
        createdOn: new Date().toString(),
        likedPosts: {},
        isAdmin: false,
        isBlocked: false,
    })

};


export const getUserData = (uid) => {

    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};