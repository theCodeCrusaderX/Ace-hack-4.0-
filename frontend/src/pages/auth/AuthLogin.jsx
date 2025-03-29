import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

export default function AuthLogin() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("form data", data);

    dispatch(loginUser(data))
      .then((res) => {
        console.log("res :: ", res);

        if (res?.payload?.success) {
          alert(res?.payload?.message + "\nYou have successfully logged in");
          navigate("/problem");
        } else {
          alert("Error: " + (res?.payload?.data || "Login failed"));
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        alert("Error: " + (err.message || "Login failed"));
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1920x1080/?technology,login')",
      }}
    >
      <div className="w-full  p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-center text-gray-600">
          Please login to your account to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 space-y-2">
          <p>
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
            >
              Register
            </Link>
          </p>
          <p>
            Or{" "}
            <Link
              to="/auth/guest"
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
            >
              continue as guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}