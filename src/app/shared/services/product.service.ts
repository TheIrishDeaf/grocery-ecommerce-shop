/* tslint:disable:no-string-literal */

import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Subscription, Observable, merge } from 'rxjs';
import { Product } from '../models/product.model';
import { map, flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as PRODUCT from '../reducers/product.actions';

@Injectable()
export class ProductService {

    private afsSubs: Subscription[] = [];
    private productsCollectionRef: AngularFirestoreCollection<Product>;
    private productDocumentRef: AngularFirestoreDocument<Product>;

    constructor(
        private afsDB: AngularFirestore,
        private store: Store<fromRoot.State>,
    ) { }

    createProduct(product: Product) {
        return this.afsDB.collection('products').add(product);
    }

    updateProduct(product: Product) {
        this.productDocumentRef = this.afsDB.doc(`products/${product.id}`);

        delete (product.id);

        return this.productDocumentRef.set(product, { merge: true });
    }

    deleteProduct(productId: string) {
        return this.afsDB.doc(`products/${productId}`).delete();
    }

    initializeProduct(): Product {
        return {
            id: null,
            title: '',
            price: 0,
            category: '',
            imageURL: ''
        };
    }

    // needs to be snapshotChanges() because the data can be edited
    getAllProducts() {
        this.productsCollectionRef = this.afsDB
                .collection<Product>('products', ref => ref); // if any sorting or queries are needed

        return this.afsSubs.push(
            this.productsCollectionRef
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                    return this.afsDBProductToModelProduct(doc.payload.doc);
                });
            }))
        .subscribe((products: Product[]) => {
            this.store.dispatch(new PRODUCT.SetAvailableProducts(products));
        }, error => {
            console.log(error);
        }));
    }

    // Decided against using Store here because the selected product is "sharabled" info
    // Using state may be one less db call, but it does not modify the url for user sharing uses
    // getSelectedProduct(productId: string) {
    //     this.store.dispatch(new PRODUCT.SetSelectedProduct(productId));
    // }

    getSelectedProduct(productId: string): Observable<Product> {
        return this.afsDB
            .collection<Product>('products')
            .doc(productId)
            .get()
            .pipe(map(productDoc => {
                return this.afsDBProductToModelProduct(productDoc);
            }));
    }

    afsDBProductToModelProduct(productDoc: firebase.firestore.DocumentSnapshot): Product {
        const data = productDoc.data() as Product;
        const id = productDoc.id;
        return { id, ...data };

        // return {
        //     id: productDoc.payload.doc.id,
        //     title: productDoc.payload.doc.data()['title'],
        //     price: productDoc.payload.doc.data()['price'],
        //     category: productDoc.payload.doc.data()['category'],
        //     imageURL: productDoc.payload.doc.data()['imageURL']
        // };
    }

    cancelSubscriptions(): void {
        this.afsSubs.forEach(sub => sub.unsubscribe());
    }

}
