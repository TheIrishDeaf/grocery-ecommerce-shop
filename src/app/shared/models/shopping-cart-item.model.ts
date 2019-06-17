import { Product } from './product.model';

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
    cartId: string;
    totalPrice: number;
}


// export class ShoppingCartItem {
//
//     constructor(public product: Product, public quantity: number, public cartId)
//
//     get totalPrice() { return this.product.price * this.quantity}
// }
