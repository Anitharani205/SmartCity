import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if(email === "" || password === ""){
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

      if(email.endsWith("@citizen.com")){

        navigate("/citizen");
      }

      else if(email.endsWith("@municipal.com")){

        navigate("/municipal");
      }

      else if(email.endsWith("@admin.com")){

        navigate("/admin");
      }

      else{

        navigate("/");
      }

    } catch(error){

      console.log(error);

      alert("Invalid Email or Password");
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-blue-500">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 rounded-lg bg-gray-200 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 rounded-lg bg-gray-200 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            Login
          </button>

          <p className="text-center text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-blue-600 font-semibold"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;