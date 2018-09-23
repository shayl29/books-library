import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromBooks from './book.reducer';
import * as fromRoot from '../../store/reducers';

export interface BooksState {
    search: fromSearch.State;
    books: fromBooks.State;
}

export interface State extends fromRoot.State {
    books: BooksState;
}

export const reducers: ActionReducerMap<BooksState> = {
    search: fromSearch.reducer,
    books: fromBooks.reducer
};

export const getBooksState = createFeatureSelector<State, BooksState>('books');


export const getBookEntitiesState = createSelector(
    getBooksState,
    state => state.books
);

export const getSelectedBookId = createSelector(
    getBookEntitiesState,
    fromBooks.getSelectedId
);

export const {
    selectIds: getBookIds,
    selectEntities: getBookEntities,
    selectAll: getAllBooks,
    selectTotal: getTotalBooks,
} = fromBooks.adapter.getSelectors(getBookEntitiesState);

export const getSelectedBook = createSelector(
    getBookEntities,
    getSelectedBookId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getSearchState = createSelector(
    getBooksState,
    (state: BooksState) => state.search
);

export const getSearchBookIds = createSelector(
    getSearchState,
    fromSearch.getIds
);
export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);
export const getSearchError = createSelector(
    getSearchState,
    fromSearch.getError
);
export const getSearchResults = createSelector(
    getBookEntities,
    getSearchBookIds,
    (books, searchIds) => {
        return searchIds.map(id => books[id]);
    }
);

export const getBookState = createSelector(
    getBooksState,
    (state: BooksState) => state.books
);

export const getBookLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);
export const getBookLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);

export const getBookCollection = createSelector(
    getBookEntities,
    getSearchBookIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);