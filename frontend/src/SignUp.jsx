import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      name: formData.name,
      email: formData.email,
      aadhaar: formData.aadhaar,
      password: formData.password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Your CityZen Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign up to access citizen services
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

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
            placeholder="Email Address"
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
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default SignUp;
