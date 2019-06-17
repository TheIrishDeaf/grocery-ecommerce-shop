import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// import * as fromUi from './shared/reducers/ui.reducer';
import * as fromCategory from './shared/reducers/category.reducer';
import * as fromProduct from './shared/reducers/product.reducer';

export interface State {
    category: fromCategory.State;
    product: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
    category: fromCategory.categoryReducer,
    product: fromProduct.productReducer
};

// export const getUiState = createFeatureSelector<fromUi.State>('ui'); // cFS = targeting state or sub reducer
// export const getIsLoading =
//     createSelector(getUiState, fromUi.getIsLoading); // cS = for const in said cFS and runs directly in appReducer

export const getCategoryState = createFeatureSelector<fromCategory.State>('category');
export const getCategories = createSelector(getCategoryState, fromCategory.getCategories);

export const getProductState = createFeatureSelector<fromProduct.State>('product');
export const getAllProducts = createSelector(getProductState, fromProduct.getAllProducts);
export const getSelectedProduct = createSelector(getProductState, fromProduct.getSelectedProduct);
export const getIsProductSelected = createSelector(getProductState, fromProduct.getIsProductSelected);
