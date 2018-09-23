import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../../models/book';
import { BookActions, BookActionTypes } from '../actions/book.actions';

export interface State extends EntityState<Book> {
    ids: string[] | null;
    selectedBookId: string | null;
}  
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false,
});
export const initialState: State = adapter.getInitialState({
  selectedBookId: null,
  ids: []
});

export function reducer(
    state = initialState,
    action: BookActions
  ): State {
    switch (action.type) {
      case BookActionTypes.SearchComplete:
      case BookActionTypes.LoadSuccess: {
        return adapter.addMany(action.payload, state);
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

      case BookActionTypes.AddBookSuccess:
      case BookActionTypes.RemoveBookFail: {
        if (state.ids.indexOf(action.payload.id) > -1) {
          return state;
        }
  
        return {
          ...state,
          ids: [...state.ids, action.payload.id],
        };
      }
  
      case BookActionTypes.RemoveBookSuccess:
      case BookActionTypes.AddBookFail: {
        return {
          ...state,
          ids: state.ids.filter(id => id !== action.payload.id),
        };
      }
  
      default: {
        return state;
      }
    }
}

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedBookId;