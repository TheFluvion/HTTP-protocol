import { useReducer, useEffect } from 'react';
import { reducer, initialState, AuthState } from './reducer';
import AuthServices from '@/services/AuthServices';
import UserService from '@/services/UserServices';
import LoginServices from '@/services/LoginServices';
import { Form } from '@/services/constants/login';
import { FullUser, User } from '@/services/constants/user';

interface Actions {
  login: (form: Form) => any;
  refreshUser: () => any;
  loadUser: (sessionToken: string) => any;
  userHasRole: (
    role: string,
    index: number,
    validationUser: string[]
  ) => boolean;
}

export interface Auth extends Actions, AuthState {}

/**
 * Returns state and methods related to user auth.
 * @WARN ONLY USE this hook in a CONTEXT PROVIDER.
 * Otherwise you won't be able to share this state between screens or components.
 */
const useAuthState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Formats the user object received from the API to a friendlier structure. */
  const formatUser = (
    apiUser: User | null,
    apiFullProfile: FullUser | null
  ) => {
    const user = { ...apiUser, ...apiFullProfile };
    return user;
  };

  /**
   * Receives a sessionToken and retrieves the user session from that token.
   * @param {string} sessionToken - The sessionToken to use to retrieve the user.
   * @returns {Promise<{ok, data}>} - ok is true if the user was retrieved successfully.
   */
  const loadUser = (sessionToken: string) => {
    sessionStorage.setItem('sessionToken', sessionToken);
    return refreshUser();
  };

  /** Retrieves user information using the available sessionToken.
   * @returns {Promise<{ok, data}>} - ok is true if the user was retrieved successfully.
   */
  const refreshUser = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) return { ok: false };
    const { ok, data }: { ok: boolean; data: User | null } =
      await AuthServices.refreshUser(); // Get user info from API.

    if (ok && data) {
      // If user was retrieved successfully, get full profile.
      const {
        ok: okExtra,
        data: fullProfile,
      }: { ok: boolean; data: FullUser | null } = await UserService.getUser(
        data?.ID
      );

      // If full profile was retrieved successfully, format user and save it to state.
      if (okExtra) {
        const user = formatUser(data, fullProfile);
        dispatch({ type: 'login', value: user });
      }
      return { ok: okExtra };
    }
    return { ok };
  };

  const login = async (form: Form) => {
    const { ok, data } = await LoginServices.login(form);
    if (ok && data?.access_token) {
      sessionStorage.setItem('sessionToken', data.access_token);
      refreshUser();
      return { ok: true, data: {} };
    } else {
      return { ok: false, data: {} };
    }
  };

  /** Returns true if current user has the provided role.
   * If no user is provided, it uses the current user in the state.
   * If no user is in the state, it returns false.
   */
  const userHasRole = (
    role: string,
    index: number,
    validationUser: string[]
  ): boolean => {
    const user = validationUser[index] || state.user;
    if (!validationUser && !state.isLoggedIn) return false;
    return user.roleId === role;
  };

  useEffect(() => {
    /** Restores previous session from cache if available. */
    const restorePreviousSession = async () => {
      if (!state.isLoggedIn) {
        await refreshUser();
      }
      dispatch({ type: 'loaded' });
    };
    restorePreviousSession();
  }, []);

  const actions: Actions = {
    login,
    refreshUser,
    loadUser,
    userHasRole,
  };

  return { ...state, ...actions };
};

export default useAuthState;
