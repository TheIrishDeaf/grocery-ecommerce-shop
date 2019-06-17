import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgBootStrapModule } from '../ng-bootstrap.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

@NgModule({
    declarations: [
        ProductCardComponent,
        ProductQuantityComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        MaterialModule,
        NgBootStrapModule,
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        MaterialModule,
        NgBootStrapModule,
        FlexLayoutModule,
        ProductCardComponent,
        ProductQuantityComponent
    ]
})
export class SharedModule { }
