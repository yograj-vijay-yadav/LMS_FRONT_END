import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Route guard preserving the intended destination in `location.state.from`
 * so Login can return the user to where they were heading.
 */
function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoggedIn && allowedRoles.find((myRole) => myRole === role)) {
    return <Outlet />;
  }

  if (isLoggedIn) {
    return <Navigate to="/denied" replace />;
  }

  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

export default RequireAuth;
