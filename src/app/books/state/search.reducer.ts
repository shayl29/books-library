import { BookActionTypes, BookActions } from '../actions/book.actions';

export interface State {
  ids: string[];
  loaded: boolean;
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loaded: false,
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: BookActions): State {
  switch (action.type) {
    case BookActionTypes.Search: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loaded: true,
          loading: false,
          error: '',
          query,
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query,
      };
    }

    case BookActionTypes.SearchComplete: {
      return {
        ids: action.payload.map(book => book.id),
        loaded: true,
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case BookActionTypes.SearchError: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case BookActionTypes.Load: {
      return {
        ...state,
        loading: true,
      };
    }

    case BookActionTypes.LoadSuccess: {
      return {
        loaded: true,
        loading: false,
        error: '',
        ids: action.payload.map(book => book.id),
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;

export const getLoaded = (state: State) => state.loaded;
