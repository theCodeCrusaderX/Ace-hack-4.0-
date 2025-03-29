import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";

export default function App() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);

    dispatch(registerUser(data))
      .then((res) => {
        console.log(res);

        if (res?.payload?.success) {
          alert(res?.payload?.data + "\nYou have successfully registered. Please log in to continue.");
          navigate("/auth/login");
        } else {
          alert("Error: " + (res?.payload?.data || "Registration failed"));
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        alert("Error: " + (err.message || "Registration failed"));
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}