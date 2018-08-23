import * as fromRoot from '../../state/app.state'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonActions, CommonActionTypes } from './common.actions';
import { SortByField } from '../../Models/SortByField';

export function reducer(state: CommonState = { searchWords: "", sortByField:null,pageNumber:0 }, action: CommonActions): CommonState {
    console.info(JSON.stringify(state));
    console.info(action.payload);
    switch (action.type) {
        case CommonActionTypes.Search:
            return {
                ...state,
                searchWords: action.payload
            };
        case CommonActionTypes.Sort:
            return {
                ...state,
                sortByField: action.payload
            };
        case CommonActionTypes.Page:
            return {
                ...state,
                pageNumber: action.payload
            };
        default:
            return state;
    }
}

export interface State extends fromRoot.State {
    searchWords: CommonState;
}

export interface CommonState {
    searchWords: string;
    sortByField:SortByField;
    pageNumber:number;
}

//selector

export const getSupplierSelector = createSelector(
    createFeatureSelector<CommonState>('suppliers'),
    state => state
);

export const getProductSelector = createSelector(
    createFeatureSelector<CommonState>('products'),
    state => state
);

export const getCustomerSelector = createSelector(
    createFeatureSelector<CommonState>('customers'),
    state => state
);