/* tslint:disable:no-string-literal */

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as CATEGORY from '../reducers/category.actions';

@Injectable()
export class CategoryService {

    categoriesCollectionRef: AngularFirestoreCollection<Category>;
    afsSubs: Subscription[] = [];

    constructor(
        private afsDB: AngularFirestore,
        private store: Store<fromRoot.State>
    ) { }

    // technically should have been gotten with justs valueChanges() since its just reading w/o change of modifying
    fetechAvailableCategories() {
        this.categoriesCollectionRef = this.afsDB
                .collection<Category>('categories', ref => ref.orderBy('name', 'asc'));

        return this.afsSubs.push(
            this.categoriesCollectionRef
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name']
                    };
                });
            }))
        .subscribe((categories: Category[]) => {
            this.store.dispatch(new CATEGORY.SetAvailableCategories(categories));
        }, error => {
            console.log(error);
        }));
    }

    cancelSubscriptions() { // related to an unimplemented 'initAuthListener' method that cancels all subs upon logout
        this.afsSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(data) {
        this.afsDB.collection('categories');
    }

}
