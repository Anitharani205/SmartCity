import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./services/api";

function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    aadhaar: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  if(formData.password !== formData.confirmPassword){
    alert("Passwords do not match");
    return;
  }

  try {

    console.log(formData);

    const response = await API.post("/auth/register", {

      name: formData.name,
      email: formData.email,
      password: formData.password,
      aadhaar: formData.aadhaar
    });

    console.log(response.data);

    alert("Signup Success");

    navigate("/login");

  } catch(error){

    console.log(error);

    if(error.response){
      alert(error.response.data);
    }
    else{
      alert("Backend not running");
    }
  }
};

  return (

    <div className="min-h-screen flex items-center justify-center bg-blue-500">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Your CityZen Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-200"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-200"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="aadhaar"
            placeholder="Aadhaar Number"
            className="w-full p-3 rounded-lg bg-gray-200"
            value={formData.aadhaar}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-200"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg bg-gray-200"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center mt-5 text-gray-600">

          Already have an account?{" "}

          <Link to="/login" className="text-blue-600">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default SignUp;