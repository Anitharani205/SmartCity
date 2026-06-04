import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./services/api";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aadhaar: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // password check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        aadhaar: formData.aadhaar,
        password: formData.password
      });

      console.log("SUCCESS RESPONSE:", response.data);

      alert(response.data?.message || "Signup Successful");

      navigate("/login");

    } catch (error) {
      console.log("FULL ERROR:", error.response?.data);

      const msg =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        "Something went wrong";

      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-2xl font-bold text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          <input
            name="name"
            placeholder="Name"
            className="w-full p-3 bg-gray-200"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-200"
            onChange={handleChange}
            required
          />

          <input
            name="aadhaar"
            placeholder="Aadhaar"
            className="w-full p-3 bg-gray-200"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-200"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 bg-gray-200"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default SignUp;