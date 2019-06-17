import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export const SET_AVAILABLE_PRODUCTS = '[Product] Set Available Products';
export const SET_SELECTED_PRODUCT = '[Product] Set Selected Product';
export const SET_NO_SELECTED_PRODUCT = '[Product] Set No Selected Product';


export class SetAvailableProducts implements Action {
    readonly type = SET_AVAILABLE_PRODUCTS;

    constructor(public payload: Product[]) {}
}

export class SetSelectedProduct implements Action {
    readonly type = SET_SELECTED_PRODUCT;

    constructor(public payload: string) {}
}

export class SetNoSelectedProduct implements Action {
    readonly type = SET_NO_SELECTED_PRODUCT;
}

export type PRODUCTActions =
    | SetAvailableProducts
    | SetSelectedProduct
    | SetNoSelectedProduct;
