// tslint:disable: no-input-rename

import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  categories$: Observable<Category[]>;

  @Input("selectedCategory") selectedCategory;

  constructor(
    private categoryService: CategoryService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.categories$ = this.store.select(fromRoot.getCategories);
    this.categoryService.fetechAvailableCategories();

  }

}
