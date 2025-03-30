import React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckAuth from "./components/common/CheckAuth";
import { checkAuth } from "./store/auth-slice";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import GuestLogin from "./pages/auth/GuestLogin";
import Problem from "./pages/problem/Problem";
import DoubtDetails from "./pages/doubt/DoubtDetails";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        {/* Auth Routes */}
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
          <Route path="guest" element={<GuestLogin />} />
        </Route>

        {/* Problem Route */}
        <Route path="/problem" element={<Problem />} />

        {/* Doubt Details Route */}
        {/* <Route path="/doubt/:id" element={<DoubtDetails />} /> */}
        <Route path="/doubt/:doubtId" element={<DoubtDetails />} />

        {/* dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
