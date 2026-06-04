import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (email === "" || password === "") {

      alert("Please fill all fields");
      return;
    }

    try {

      const response = await API.post("/auth/login", {

        email,
        password
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", email);

      alert("Login Successful");

      // ROLE BASED NAVIGATION

      if (email.endsWith("@citizen.com")) {

        navigate("/citizen");

      } else if (email.endsWith("@municipal.com")) {

        navigate("/municipal");

      } else if (email.endsWith("@admin.com")) {

        navigate("/admin");

      } else {

        navigate("/");
      }

    } catch (error) {

      console.log(error);

      alert("Invalid Email or Password");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 flex justify-center items-center px-4 py-10">

      {/* MAIN CONTAINER */}

      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

        {/* LEFT IMAGE SECTION */}

        <div className="md:w-1/2 relative">

          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop"
            alt="Smart City"
            className="w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-black/35 flex flex-col justify-center items-center px-8 text-center">

            <h1 className="text-white text-5xl font-bold leading-tight mb-6 drop-shadow-lg">
              Welcome to <br /> CityZen
            </h1>

            <p className="text-gray-200 text-lg leading-8 max-w-md">
              Smart Citizen Complaint & Municipal Service Management Platform
            </p>

          </div>

        </div>

        {/* RIGHT LOGIN SECTION */}

        <div className="md:w-1/2 bg-white flex justify-center items-center p-10">

          <div className="w-full max-w-md">

            {/* TITLE */}

            <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">
              Login
            </h2>

            <p className="text-center text-gray-500 mb-10">
              Login to access your dashboard
            </p>

            {/* EMAIL */}

            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 rounded-2xl bg-gray-100 border border-gray-200 outline-none focus:ring-2 focus:ring-sky-300 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-8">

              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-2xl bg-gray-100 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white p-4 rounded-2xl text-lg font-bold shadow-lg transition duration-300 hover:scale-105"
            >
              Login
            </button>

            {/* SIGNUP */}

            <p className="text-center text-gray-600 mt-8">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="text-sky-600 font-bold hover:underline"
              >
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;

