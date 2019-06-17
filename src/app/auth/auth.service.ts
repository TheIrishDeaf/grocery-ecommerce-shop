import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { DatabaseUser } from '../shared/models/users.model';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class AuthService {

    user$: Observable<DatabaseUser>;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private afsDB: AngularFirestore,
                private userService: UserService,
                private route: ActivatedRoute) {

                    // Bad Practice to have a function in the contructor but
                    // code needs to be executed ASAP to prevent subscription null errors
                    this.firebaseUserToDatabaseUser();
    }

    initAuthListener() {
        // called in app.component on ngInit
        // for more complex functions that can stand to be called after constructor
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {

        })
        .catch(error => {

        });
    }

    // Transforms the global app User information from the Firebase Authentication User
    // to the Firestore Database User for more data flexibility regaurdless of login/register method
    firebaseUserToDatabaseUser() {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.userService.getUser(user.uid).valueChanges();
                } else {
                    return of(null);
                }
        }));
    }

    // ignore for now
    loginWithEmail(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
        })
        .catch(error => {

        });
    }

    // Note: even though the redirection is held in the app.component. the returns for the
    //     router navigation are left in just incase there is a prevention of writting to localstorage
    async loginWithGoogle() {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        this.userService.updateUserData(credential.user);
        return this.router.navigate(['/']);
    }

    async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/login']);
    }
}
