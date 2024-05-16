import { useContext, createContext } from 'react';
import { Auth } from '../auth/useAuthState';

const INITIAL_CONTEXT = {
  login: () => {},
  refreshUser: () => {},
  loadUser: () => {},
  userHasRole: () => false,
  loading: false,
  isLoggedIn: false,
  user: null,
};

export interface AppContextState extends Auth {}

/** General purpose context */
const AppContext = createContext<AppContextState>(INITIAL_CONTEXT);

/** Returns app global shared state. */
export const useAppContext = (): AppContextState => useContext(AppContext);

export default AppContext;
