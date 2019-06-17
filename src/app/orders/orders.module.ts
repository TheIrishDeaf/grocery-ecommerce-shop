import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

@NgModule({
    declarations: [
        OrdersComponent,
        OrderSuccessComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        OrdersRoutingModule
    ],
    exports: [],
})
export class OrdersModule { }
