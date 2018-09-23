import { Action } from '@ngrx/store';
import { Book } from '../../models/book';

export enum BookActionTypes {
    Search = '[Book] Search',
    SearchComplete = '[Book] Search Complete',
    SearchError = '[Book] Search Error',
    Select = '[Book] Select',
    AddBook = '[Book] Add Book',
    AddBookSuccess = '[Book] Add Book Success',
    AddBookFail = '[Book] Add Book Fail',
    RemoveBook = '[Book] Remove Book',
    RemoveBookSuccess = '[Book] Remove Book Success',
    RemoveBookFail = '[Book] Remove Book Fail',
    Load = '[Book] Load',
    LoadSuccess = '[Book] Load Success',
    LoadFail = '[Book] Load Fail',
}

export class AddBook implements Action {
    readonly type = BookActionTypes.AddBook;

    constructor(public payload: Book) { }
}

export class AddBookSuccess implements Action {
    readonly type = BookActionTypes.AddBookSuccess;

    constructor(public payload: Book) { }
}

export class AddBookFail implements Action {
    readonly type = BookActionTypes.AddBookFail;

    constructor(public payload: Book) { }
}

export class RemoveBook implements Action {
    readonly type = BookActionTypes.RemoveBook;

    constructor(public payload: Book) { }
}

export class RemoveBookSuccess implements Action {
    readonly type = BookActionTypes.RemoveBookSuccess;

    constructor(public payload: Book) { }
}

export class RemoveBookFail implements Action {
    readonly type = BookActionTypes.RemoveBookFail;

    constructor(public payload: Book) { }
}

export class LoadSuccess implements Action {
    readonly type = BookActionTypes.LoadSuccess;

    constructor(public payload: Book[]) { }
}

export class LoadFail implements Action {
    readonly type = BookActionTypes.LoadFail;

    constructor(public payload: any) { }
}

export class Search implements Action {
    readonly type = BookActionTypes.Search;

    constructor(public payload: string) { }
}

export class SearchComplete implements Action {
    readonly type = BookActionTypes.SearchComplete;

    constructor(public payload: Book[]) { }
}

export class SearchError implements Action {
    readonly type = BookActionTypes.SearchError;

    constructor(public payload: string) { }
}

export class Load implements Action {
    readonly type = BookActionTypes.Load;

    constructor(public payload: Book) { }
}

export class Select implements Action {
    readonly type = BookActionTypes.Select;

    constructor(public payload: string) { }
}

export type BookActions =
    | Search
    | SearchComplete
    | SearchError
    | Load
    | Select
    | AddBook
    | AddBookSuccess
    | AddBookFail
    | RemoveBook
    | RemoveBookSuccess
    | RemoveBookFail
    | Load
    | LoadSuccess
    | LoadFail;