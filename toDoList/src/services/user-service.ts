import { set, ref, query, equalTo, orderByChild, onValue, get } from 'firebase/database';
import { db } from '../config/firebase-config';


export const createUser = (username: string, firstName: string, lastName: string, uid: string, email: string) => {

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

export const getUserData = (uid: string) => {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
}