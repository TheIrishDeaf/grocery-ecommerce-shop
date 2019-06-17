import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminProductFormComponent } from './admin-products/admin-product-form/admin-product-form.component';

const routes: Routes = [
    { path: '', component: AdminComponent  },
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'products/new', component: AdminProductFormComponent },
    { path: 'products/:id', component: AdminProductFormComponent },
    { path: 'products', component: AdminProductsComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
