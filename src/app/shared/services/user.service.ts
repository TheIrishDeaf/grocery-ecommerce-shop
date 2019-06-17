import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
} from '@angular/fire/firestore';
import { DatabaseUser } from '../models/users.model';

@Injectable()
export class UserService {


    constructor(private afsDB: AngularFirestore) { }

    updateUserData(user): Promise<void> {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<DatabaseUser> = this.getUser(user.uid);

        // firebase.User standard values
        const data: DatabaseUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            creationTime: user.creationTime || new Date(user.metadata.creationTime),
            lastSignInTime: new Date()
        };

        // Custom values
        // user.metadata is a value that ONLY a firebase.User has
        // Its kludgy but allows for an easy way to tell user type since
        // types are difficult to decern from a passed any-object
        // NOTE: Make sure 'user' is being passed. Not an obs/sub
        // also could do if(user.isAdmin || user.somethingCustom)
        if (!user.metadata) {
            // Custom User Data Here
            data.isAdmin = user.isAdmin,
            data.somethingCustom = user.somethingCustom;
        }

        return userRef.set(data, { merge: true });
    }

    getUser(uid: string): AngularFirestoreDocument<DatabaseUser> {
        return this.afsDB.doc(`users/${uid}`);
    }
}
