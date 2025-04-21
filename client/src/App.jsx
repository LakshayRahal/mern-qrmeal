import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import CheckAuth from "./components/common/check-auth";
import StaffLayout from "./components/staff/layout";
import StudentLayout from "./components/student/layout";
import StudentHome from "./pages/student/home";
import { StaffHome } from "./components/staff/listing";
import UnauthPage from "./pages/un-auth/un-auth";
import NotFound from "./pages/not-found/not-found";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { useSelector } from "react-redux";
import { Skeleton } from "./components/ui/skeleton";
import { useEffect } from "react";
import ClaimHistory from "./pages/staff/claimed";
import { Navigate } from "react-router-dom";
import Rewards from "./pages/student/reward";
import StaffFeatures from "./pages/staff/features";
export default function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth || {}
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // if (isLoading)
  //   return <Skeleton className="w-[600px] bg-black h-[600px] rounded-full" />;
  // if (isLoading)
  //   return (
  //       <div className="relative w-[600px] h-[600px] rounded-full overflow-hidden">
  //           <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black animate-[shimmer_2s_infinite] rounded-full" />
  //           <div className="absolute inset-0 bg-black opacity-50 rounded-full" />
  //       </div>
  //   );


  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/staff"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StaffLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<StaffHome />} />
          <Route path="claimed" element={<ClaimHistory />} />
          <Route path="features" element={<StaffFeatures />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route
          path="/student"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StudentLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<StudentHome />} />
          <Route path="reward" element={<Rewards/>}/>
        </Route>
      </Routes>
    </div>
  );
}
