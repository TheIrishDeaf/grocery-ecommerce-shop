import { Action } from '@ngrx/store';
import { Category } from '../models/category.model';

export const SET_AVAILABLE_CATEGORIES = '[CATEGORY] Set Available Categories';


export class SetAvailableCategories implements Action {
    readonly type = SET_AVAILABLE_CATEGORIES;

    constructor(public payload: Category[]) {}
}

export type CATEGORYActions = SetAvailableCategories;
