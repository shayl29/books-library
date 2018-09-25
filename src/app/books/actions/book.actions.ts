import { Action } from '@ngrx/store';
import { Book } from '../../models/book';
import { Update } from '@ngrx/entity';

export enum BookActionTypes {
    Search = '[Book] Search',
    SearchComplete = '[Book] Search Complete',
    SearchError = '[Book] Search Error',
    Select = '[Book] Select',
    AddBook = '[Book] Add Book',
    AddBookSuccess = '[Book] Add Book Success',
    EditBook = '[Book] Edit Book',
    EditBookSuccess = '[Book] Edit Book Success',
    RemoveBook = '[Book] Remove Book',
    RemoveBookSuccess = '[Book] Remove Book Success',
    Load = '[Book] Load',
    LoadSuccess = '[Book] Load Success',
    LoadFail = '[Book] Load Fail',
    ClearFlags = '[Book] Clear Flags',
    ToggleResetList = '[Book] Toggle Reset List',
}

export class AddBook implements Action {
    readonly type = BookActionTypes.AddBook;

    constructor(public payload: Book) { }
}

export class AddBookSuccess implements Action {
    readonly type = BookActionTypes.AddBookSuccess;

    constructor(public payload: Book) { }
}

export class EditBook implements Action {
  readonly type = BookActionTypes.EditBook;

  constructor(public payload: Update<Book>) { }
}

export class EditBookSuccess implements Action {
  readonly type = BookActionTypes.EditBookSuccess;

  constructor(public payload: Update<Book>) { }
}

export class RemoveBook implements Action {
    readonly type = BookActionTypes.RemoveBook;

    constructor(public payload: Book) { }
}

export class RemoveBookSuccess implements Action {
    readonly type = BookActionTypes.RemoveBookSuccess;

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

export class ClearFlags implements Action {
    readonly type = BookActionTypes.ClearFlags;

    constructor(public payload: any) { }
}

export class ToggleResetList implements Action {
    readonly type = BookActionTypes.ToggleResetList;

    constructor(public payload: boolean) { }
}

export type BookActions =
    | Search
    | SearchComplete
    | SearchError
    | Load
    | Select
    | AddBook
    | AddBookSuccess
    | EditBook
    | EditBookSuccess
    | RemoveBook
    | RemoveBookSuccess
    | Load
    | LoadSuccess
    | LoadFail
    | ClearFlags
    | ToggleResetList;
