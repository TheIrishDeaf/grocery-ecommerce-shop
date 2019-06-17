import { Action } from '@ngrx/store';

import { PRODUCTActions, SET_AVAILABLE_PRODUCTS, SET_SELECTED_PRODUCT, SET_NO_SELECTED_PRODUCT } from './product.actions';
import { Product } from '../models/product.model';

export interface State {
    availableProducts: Product[];
    selectedProduct: Product;
}

const initialState: State = {
    availableProducts: [],
    selectedProduct: null
};
// Possible others: SET_SELECTED_CATEGORY - UNSET_SELECTED_CATEGORY
export function productReducer(state = initialState, action: PRODUCTActions) {
    switch (action.type) {
        case SET_AVAILABLE_PRODUCTS:
            return {
                ...state,
                availableProducts: action.payload
            };
        case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: { ...state.availableProducts.find(product => product.id === action.payload) }
            };
        case SET_NO_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: null
            };
        default: {
            return state;
        }
    }
}

export const getAllProducts = (state: State) => state.availableProducts;
export const getSelectedProduct = (state: State) => state.selectedProduct;
export const getIsProductSelected = (state: State) => state.selectedProduct != null;
