import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log('20301',location);
  

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      return <Navigate to="/problem" />;
    }
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/guest"))
  ) {
    return <Navigate to="/problem" />;
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/guest")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }


  // Allow guest users to access only shop pages
  // if (
  //   user?.role === "guest" &&
  //   !location.pathname.includes("shop") &&
  //   !location.pathname.includes("/guest")
  // ) {
  //   return <Navigate to="/shop/home" />;
  // }

  return <>{children}</>;
}

export default CheckAuth;
