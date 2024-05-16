import { useAppContext } from '../context';
import { Auth } from './useAuthState';

/**
 * Provides global shared state and methods related to user auth.
 * Shared state is available throughout application.
 */
const useLoginContext = () => {
  const auth: Auth | null = useAppContext();
  return auth;
};

export default useLoginContext;
