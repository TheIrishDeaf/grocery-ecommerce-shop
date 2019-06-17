// tslint:disable: no-input-rename

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart.model';
import { find } from 'rxjs/operators';
import { ShoppingCartItem } from '../../models/shopping-cart-item.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

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
