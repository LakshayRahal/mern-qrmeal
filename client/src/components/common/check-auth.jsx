import { Navigate, useLocation } from "react-router-dom";
export default function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  // Debugging logs
  console.log("CheckAuth - isAuthenticated:", isAuthenticated);
  console.log("CheckAuth - User:", user);

  if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    console.log("User Role:", user?.role);
    if (user?.role === "staff") {
      return <Navigate to="/staff/dashboard" />;
    } else {
      console.log("student")
      return <Navigate to="/student/home" />;
    }
  }
  if (isAuthenticated && user?.role !== "staff" && location.pathname.includes("staff")) {
    return <Navigate to="/unauth-page" />;
  }

  if (isAuthenticated && user?.role === "staff" && location.pathname.includes("student")) {
    return <Navigate to="/staff/dashboard" />;
  }
  return <>{children}</>;
}
