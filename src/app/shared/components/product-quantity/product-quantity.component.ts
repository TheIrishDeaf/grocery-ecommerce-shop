// tslint:disable: no-input-rename

import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {

    this.shoppingCartService.removeFromCart(this.product);
  }

  // TODO: move to 'shopping-cart.model' once its turned into a class
  getQuantityInCart() {
    if (!this.shoppingCart) { return 0; }

    for(let i=0; i<this.shoppingCart.items.length; i++ ) {
      if (this.shoppingCart.items[i].product.id === this.product.id) {
        return this.shoppingCart.items[i].quantity;
      }
    }

    return 0;
  }

}
