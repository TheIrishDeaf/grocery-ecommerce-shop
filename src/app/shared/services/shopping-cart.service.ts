// tslint:disable:prefer-const

import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Subscription, Observable, of, combineLatest } from 'rxjs';
import { Product } from '../models/product.model';
import { map, flatMap, take, mapTo, } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart.model';
import { ShoppingCartItem } from '../models/shopping-cart-item.model';
import * as firebase from 'firebase/app';

@Injectable()
export class ShoppingCartService {

    constructor(
        private afsDB: AngularFirestore,
    ) { }


    private createCart() {
        return this.afsDB.collection('shopping-carts').add({
            dateCreated: new Date().getTime()
        });
    }

    // TODO: Fix this implementation. really messy to wait for 2 fetches and combine them
    async getCart(): Promise<Observable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId();
        let dateCreated: Observable<number>; let shoppingCartItemCount: Observable<number>;

        let itemsCollectionRef = await this.afsDB
            .collectionGroup<ShoppingCartItem>('items', (ref) => ref.where('cartId', '==', cartId)).valueChanges();

        let shoppingCartRef = await this.afsDB.collection('shopping-carts').doc<ShoppingCart>(cartId)
            .valueChanges();

        return combineLatest(
            shoppingCartRef.pipe(map(cart => cart.dateCreated )),
            itemsCollectionRef,
            shoppingCartRef.pipe(map(cart => cart.shoppingCartItemCount)),
            shoppingCartRef.pipe(map(cart => cart.totalCartPrice))
            ).pipe(map(combinedObs => ({
                dateCreated: combinedObs[0],
                items: combinedObs[1],
                shoppingCartItemCount: combinedObs[2],
                totalCartPrice: combinedObs[3]
            })));

    }

    private getItem(cartId: string, productId: string): AngularFirestoreDocument<ShoppingCartItem> {
        return this.afsDB.collection('shopping-carts').doc(cartId).collection('items').doc<ShoppingCartItem>(productId);
        // return this.afsDB.doc<Item>(`shopping-carts/${cartId}/items/${productId}`);
    }



    private async getOrCreateCartId(): Promise<string> {
        let cartId = localStorage.getItem('cartId');

        if (cartId) {
            console.log('a cartId exists');
            return cartId;
        } else {
            console.log('creating cart');
            let result = await this.createCart();
            localStorage.setItem('cartId', result.id);
            return result.id;
        }
    }

    async addToCart(product: Product, toDelete?: boolean) {
        const itemIncrement = firebase.firestore.FieldValue.increment(1);
        const costIncrement = firebase.firestore.FieldValue.increment(product.price);
        this.updateItemQuantity(product, itemIncrement, costIncrement);
    }

    async removeFromCart(product: Product) {
        const itemDecrement = firebase.firestore.FieldValue.increment(-1);
        const costDecrement = firebase.firestore.FieldValue.increment(-product.price);
        this.updateItemQuantity(product, itemDecrement, costDecrement);
    }



    private async updateItemQuantity(product: Product, itemChange, costChange) {
        let cartId = await this.getOrCreateCartId();

        let shoppingCartRef = this.afsDB.collection('shopping-carts').doc<ShoppingCart>(cartId).ref;
        let itemRef = this.getItem(cartId, product.id).ref;

        const batch = this.afsDB.firestore.batch();
        batch.set(shoppingCartRef, { shoppingCartItemCount: itemChange, totalCartPrice: costChange  }, { merge: true });
        batch.set(itemRef, { product: product, quantity: itemChange, totalPrice: costChange,  cartId: cartId }, { merge: true });
        batch.commit();
        ;
        // let item$ = this.getItem(cartId, product.id);
        // item$.snapshotChanges().pipe(take(1)).subscribe(item => {
        //     // Cannot use simple elequant solution because firestore fails when hitting undefined quantity
        //     // item$.set({ product: product, quantity: (item.payload.data()['quantity'] || 0) + 1 }, { merge: true });
        //     if (item.payload.exists) {
        //         item$.update({ quantity: change });
        //     } else {
        //         item$.set({ product: product, quantity: 1, cartId: cartId });
        //     }
        // });
    }

    

}
