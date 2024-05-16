import { FullUser } from '@/services/constants/user';

export interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  user: FullUser | null;
}

interface Action {
  type: string;
  value?: any;
}

const initialState: AuthState = {
  loading: true, // True while fetching user info from cache. False else case.
  isLoggedIn: false,
  user: null,
};

const reducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case 'login':
      return { ...state, loading: false, isLoggedIn: true, user: action.value };
    case 'logout':
      return { ...initialState, loading: false };
    case 'loaded':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export { reducer, initialState };
