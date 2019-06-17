import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/models/category.model';
import * as fromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private store: Store<fromRoot.State>
  ) {
    this.product = this.productService.initializeProduct();
   }

  ngOnInit() {
    this.categories$ = this.store.select(fromRoot.getCategories);
    this.fetchCategories();

    let productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getSelectedProduct(productId).pipe(take(1))
        .subscribe(product => { this.product = product; console.log(this.product); });
    } // getting a whole ass object instead of just the product values. probs needs mapped

  }

  fetchCategories() {
    this.categoryService.fetechAvailableCategories();
  }

  onSubmit(form: NgForm) {
    if (this.product.id) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.createProduct(form.value);
    }
    this.router.navigate(['/admin/products']);
  }

  deleteProduct() {
    if (!confirm('Are you sure?')) { return; }

    this.productService.deleteProduct(this.product.id);
    this.router.navigate(['/admin/products']);
  }

}
