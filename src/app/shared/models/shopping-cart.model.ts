// tslint:disable: forin

import { Product } from './product.model';
import { ShoppingCartItem } from './shopping-cart-item.model';

export interface ShoppingCart {
    dateCreated: number;
    items?: ShoppingCartItem[];
    shoppingCartItemCount?: number;
    totalCartPrice?: number;
}



// Currently all counting is done server side. This is for if it was done client side
// export class ShoppingCart {
//     items?: ShoppingCartItem[] = [];
//
//     constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
//         for (let productId in itemsMap) {
//             let item = itemMap[productId];
//             this.items.push(new ShoppingCartItem(item.product, item.quantity, item.cartId))
//             this.items.push(itemsMap[productId]);
//         }
//     }
//
//     get totalPrice() {
//        let sum = 0;
//        for (let productId in this.items) {
//            sum += this.items[productId].totalPrice
//        }
//        return sum;
//     }
//
//     get totalItemsCount() {
//         let count = 0;
//
//         for (let productId in this.itemsMap) {
//             count += this.itemsMap[productId].quantity;
//         }
//         return count;
//     }
//
//
// }
