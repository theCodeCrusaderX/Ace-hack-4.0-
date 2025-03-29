import { Outlet } from "react-router-dom"; //outlet means children of layout.jsx


function AuthLayout() {

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Hello & Welcome !
          </h1>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
