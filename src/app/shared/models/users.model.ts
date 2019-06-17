// export class User {

//     static fromJson({ $key, email, displayName, photoURL, isAdmin }) {
//         return new User( $key, email, displayName, photoURL, isAdmin );
//     }

//     static fromJsonArray(json: any[]): User[] {
//         return json.map(User.fromJson);
//     }

//     constructor(
//         public User
//     ) { }
// }

// export interface Roles {
//     isAdmin?: boolean;
//     isGeneralUser?: boolean;
// }

export interface DatabaseUser {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: number;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    creationTime?: Date;
    lastSignInTime?: Date;

    // Differences between fbUser and dbUser
    isAdmin?: boolean;
    somethingCustom?: string;
}
