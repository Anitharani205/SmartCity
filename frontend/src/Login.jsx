import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    if(email === "citizen@gmail.com" && password === "1234"){
      navigate("/citizen");
      return;
    }

    if(email === "municipal@gmail.com" && password === "1234"){
      navigate("/municipal");
      return;
    }

    if(email === "admin@gmail.com" && password === "1234"){
      navigate("/admin");
      return;
    }

    alert("Invalid Login");
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">

      <div className="w-[900px] h-[520px] bg-white rounded-xl shadow-2xl flex overflow-hidden">

      

        <div className="w-1/2 p-10 flex flex-col justify-center text-white bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

          <h1 className="text-4xl font-bold mb-4">
            Welcome to CityZen
          </h1>

          <p className="text-sm leading-6">
            Smart civic complaint management system that allows citizens
            to report issues easily and helps municipalities solve them
            efficiently for better city living.
          </p>

        </div>


        

        <div className="w-1/2 bg-gray-50 flex items-center justify-center">

          <div className="w-[320px]">

            <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
              Login to Your Account
            </h2>


            

            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 mb-4">
              <Mail size={18} className="text-gray-500"/>
              <input
                type="text"
                placeholder="Email / Aadhaar Number"
                className="ml-3 bg-transparent outline-none w-full"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>


           

            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 mb-4">
              <Lock size={18} className="text-gray-500"/>
              <input
                type="password"
                placeholder="Password"
                className="ml-3 bg-transparent outline-none w-full"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Eye size={18} className="text-gray-500 cursor-pointer"/>
            </div>


          

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-full mb-3 transition"
            >
              Login
            </button>


          

            <p className="text-right text-xs text-gray-500 mb-4 cursor-pointer">
              Forgot Password?
            </p>


          

            <div className="flex items-center mb-4">
              <hr className="flex-grow border-gray-300"/>
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <hr className="flex-grow border-gray-300"/>
            </div>


          

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full mb-3 transition">
              Login with Aadhaar
            </button>


           
            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-full transition"
            >
              New User? Aadhaar Sign Up
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;
