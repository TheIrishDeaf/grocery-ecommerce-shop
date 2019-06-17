import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: ShoppingCart;
  selectedCategory: string;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private store: Store<fromRoot.State>
  ) { }

  async ngOnInit() {

    this.store.select(fromRoot.getAllProducts).pipe(switchMap((products: Product[]) => {
      this.products = products;
      return this.route.queryParamMap;
    })).subscribe(params => {
      this.selectedCategory = params.get('selectedCategory');
      this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(product => product.category === this.selectedCategory) : this.products;
    });
    this.productService.getAllProducts();
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
