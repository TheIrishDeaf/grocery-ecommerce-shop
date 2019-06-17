import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './admin-products/admin-product-form/admin-product-form.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        AdminProductFormComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        AdminRoutingModule
    ],
    exports: [],
})
export class AdminModule { }
