import * as fromRoot from '../../state/app.state'
import { createFeatureSelector, createSelector } from '@ngrx/store';
export function reducer(state:SuppliersState={searchWords:""},action):SuppliersState{
    console.info(JSON.stringify(state));
    console.info(action.payload);
    switch(action.type){
        case 'Search':
        return {
            ...state,
            searchWords:action.payload
        };
        default:
        return state;
    }
}

export interface State extends fromRoot.State{
    searchWords:SuppliersState;
}

export interface SuppliersState {
    searchWords:string;
}

//selector
const getSuppliersState = createFeatureSelector<SuppliersState>('suppliers');

export const getSupplierSearchWords = createSelector(
    getSuppliersState,
  state => state.searchWords
);