import { Action } from '@ngrx/store';
import { SortByField } from '../../Models/SortByField';
export enum CommonActionTypes {
    Search = '[Common] Search words',
    Sort = '[Common] Set sort by field',
    Page = '[Common] Set pagination number',
}

export class SearchAction implements Action {
    readonly type = CommonActionTypes.Search;
    constructor(public payload: string) { }
}
export class SortAction implements Action {
    readonly type = CommonActionTypes.Sort;
    constructor(public payload: SortByField) { }
}

export class PageAction implements Action {
    readonly type = CommonActionTypes.Page;
    constructor(public payload: number) { }
}

export type CommonActions = SearchAction
    | SortAction
    | PageAction