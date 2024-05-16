import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useLoginContext } from '.';
import { isDevelopment } from '@/services/constants';
import { NextComponentType, NextPageContext } from 'next';

/** Set to true to disable authentication DURING DEVELOPMENT.
 * This will allow you to access any page without being logged in.
 * Remember to set it back to FALSE before committing your changes.
 */
const DISABLE_AUTH = isDevelopment && false;

/**
 * Validates user is authenticated and has permission to access the requested page.
 *
 * Renders the page if the user is allowed to access it.
 *
 * Stays in an eternal loading screen if user is not authenticated (login must be done on Flutter app).
 *
 * Redirects to Error page if user is authenticated but is not allowed to access the page.
 *
 * @param {Element} Component Page to be rendered if access is allowed.
 * @param {string[]} roles Array of allowed roles. All roles are allowed if not present.
 */

const withAuth = (
  Component: NextComponentType<NextPageContext, any, any>,
  roles: string[] = []
) =>
  function AuthWrapper(props: any) {
    const auth = useLoginContext();
    const { loading, isLoggedIn, user, userHasRole } = auth || {
      userHasRole: () => {},
    };
    const router = useRouter();
    /** True if user is logged in. Guarantees consistency with user object. */
    const isAuthenticated = isLoggedIn && !!user;
    /** True if logged in user is authorized to access the page. */
    const isAuthorized = useMemo(
      () => isLoggedIn && (!roles.length || roles.some(userHasRole)),
      [isLoggedIn, user, roles]
    );

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          router.replace('/login'); // User not allowed.
        }
      }
    }, [loading && user]);

    if (DISABLE_AUTH) return <Component {...props} />; // Disable authentication during development.
    if (loading || !isAuthenticated) return <div>Screen Loading</div>; // User not logged in.
    return isAuthorized && <Component {...props} />; // User logged in and authorized. */
  };

export default withAuth;
