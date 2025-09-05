import { Navigate, useLocation } from 'react-router-dom';

export default function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Redirect if not authenticated and not on login/register page
    if (location.pathname === "/") {
        if (!isAuthenticated) {
          return <Navigate to="/layout/login" />;
        } else {
          if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
          } else {
            return <Navigate to="/shop/home" />;
          }
        }
      }
    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to="/layout/login" />;
    }


    // Redirect authenticated users away from login/register page
       if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }

    if (
        isAuthenticated &&
        (location.pathname.includes("/login") ||
            location.pathname.includes("/register"))
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }



    // Restrict non-admin users from accessing admin pages
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />;
    }

    // Restrict admin users from accessing shop pages
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to="/admin/dashboard" />;
    }

    // If no redirection is needed, render children
    return <>{children}</>;
}
