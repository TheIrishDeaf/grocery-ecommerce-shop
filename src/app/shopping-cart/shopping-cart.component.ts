import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ShoppingCartItem } from '../shared/models/shopping-cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  // cart$: Observable<ShoppingCart>;
  totalCartPrice: number;
  cart: ShoppingCart;

  dataSource = new MatTableDataSource<ShoppingCartItem>();
  displayedColumns: string[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.displayedColumns = ['product', 'quantity', 'totalPrice'];
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => {
      this.cart = cart;
      this.totalCartPrice = cart.totalCartPrice;
      this.dataSource.data = cart.items;
    }
    );
  }

  /* Done here because you must wait for the data to be init for ViewChild to function */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
