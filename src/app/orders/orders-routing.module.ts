import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

const routes: Routes = [
    { path: '', component: OrdersComponent  },
    { path: 'orders-success', component: OrderSuccessComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}
