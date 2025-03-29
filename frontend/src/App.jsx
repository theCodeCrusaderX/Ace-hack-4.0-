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
import DoubtDetails from "./pages/doubt/DoubtDetails.jsx";

function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  //using useEffect it prevent api to call in infinite loop
  //we put dispatch as dependency arr if it gets changes which
  //is not regularly happen for more complex project
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        ></Route>
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
          <Route path="doubt/:id" element={<DoubtDetails />} />
        </Route>
        <Route
          path="/problem"
          element={
            <checkAuth isAuthenticated={isAuthenticated} user={user}>
              <Problem />
            </checkAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
