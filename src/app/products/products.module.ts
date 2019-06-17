import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductFilterComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        ProductsRoutingModule
    ],
    exports: [],
})
export class ProductsModule { }
