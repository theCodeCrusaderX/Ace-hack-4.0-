import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginAsGuest } from "../../store/auth-slice";

export default function GuestLogin() {
  const dispatch = useDispatch();

  const handleGuestLogin = () => {
    dispatch(loginAsGuest())
      .then((res) => {
        if (res?.payload?.success) {
          alert("Welcome Guest!\nYou have successfully logged in as a guest");
        } else {
          alert("Error: Failed to login as guest");
        }
      })
      .catch((err) => {
        console.error("Error during guest login:", err);
        alert("Error: Failed to login as guest");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Continue as Guest
        </h2>
        
        <div className="space-y-6">
          <p className="text-center text-sm text-gray-600">
            Browse and shop without creating an account
          </p>
          
          <button
            onClick={handleGuestLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enter as Guest
          </button>
          
          <div className="text-sm text-center text-gray-600 space-y-2">
            <p>
              Want to create an account?{" "}
              <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                Register
              </Link>
            </p>
            <p>
              Already have an account?{" "}
              <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}