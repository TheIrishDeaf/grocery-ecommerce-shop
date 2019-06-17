import { Action } from '@ngrx/store';

import { CATEGORYActions, SET_AVAILABLE_CATEGORIES } from './category.actions';
import { Category } from '../models/category.model';

export interface State {
    availableCategories: Category[];
}

const initialState: State = {
    availableCategories: []
};
// Possible others: SET_SELECTED_CATEGORY - UNSET_SELECTED_CATEGORY
export function categoryReducer(state = initialState, action: CATEGORYActions) {
    switch (action.type) {
        case SET_AVAILABLE_CATEGORIES:
            return {
                ...state,
                availableCategories: action.payload
            };
        default: {
            return state;
        }
    }
}

export const getCategories = (state: State) => state.availableCategories;
