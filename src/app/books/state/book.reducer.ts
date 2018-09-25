import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../../models/book';
import { BookActions, BookActionTypes } from '../actions/book.actions';

export interface State extends EntityState<Book> {
    ids: string[] | null;
    bookAdded: boolean;
    bookUpdated: boolean;
    bookRemoved: boolean;
    selectedBookId: string | null;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false,
});
export const initialState: State = adapter.getInitialState({
  selectedBookId: null,
  bookAdded: false,
  bookUpdated: false,
  bookRemoved: false,
  ids: []
});

export function reducer(
    state = initialState,
    action: BookActions
  ): State {
    switch (action.type) {
      case BookActionTypes.SearchComplete:
      case BookActionTypes.LoadSuccess: {
        const newState = adapter.addMany(action.payload, state);
        return {
          ...newState,
          bookAdded: false,
          bookUpdated: false,
          bookRemoved: false
        };
      }

      case BookActionTypes.Load: {
        return adapter.addOne(action.payload, state);
      }

      case BookActionTypes.Select: {
        return {
          ...state,
          selectedBookId: action.payload,
        };
      }

      case BookActionTypes.EditBookSuccess: {
        const newState = adapter.updateOne({id: action.payload.id, changes: action.payload}, state);
        return {
          ...newState,
          bookAdded: false,
          bookUpdated: true,
          bookRemoved: false
        };
      }

      case BookActionTypes.AddBookSuccess: {
        const newState = adapter.addOne(action.payload, state);
        return {
          ...newState,
          bookAdded: true,
          bookUpdated: false,
          bookRemoved: false
        };
      }

      case BookActionTypes.RemoveBookSuccess: {
        const newState = adapter.removeOne(action.payload.id, state);
        return {
          ...newState,
          bookAdded: false,
          bookUpdated: false,
          bookRemoved: true
        };
      }

      default: {
        return state;
      }
    }
}

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedBookId;

export const isBookAdded = (state: State) => state.bookAdded;

export const isbookUpdated = (state: State) => state.bookUpdated;

export const isBookRemoved = (state: State) => state.bookRemoved;
