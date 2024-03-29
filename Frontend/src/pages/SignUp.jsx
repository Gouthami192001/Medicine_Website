import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const initialValues = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    
    // Perform validation
    const errors = validate(formData);
    setFormErrors(errors);
    
    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      // No errors, proceed with form submission
      try {
        const response = await axios.post(
          "http://localhost:4000/api/register",
          formData
        );
        console.log(response.data);
        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An error occurred during registration.");
        }
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.username.trim()) {
      errors.username = "Username is required";
    } else if (values.username.length < 6 || values.username.length > 15) {
      errors.username = "Username must be at least 6 characters long";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-200 to-blue-400 p-8 md:mt-20 md:ml-56 md:mb-16 drop-shadow-xl">
          <h1 className="text-white mt-7 ml-8 font-bold">MEDIMART</h1>
          <div className="text-center md:text-left">
            <h1 className="font-bold text-white text-5xl md:text-5xl mt-10 pt-20">
              Welcome
            </h1>
            <h1 className="font-bold text-white mb-[6rem] text-5xl md:text-5xl mt-7">
              To Medimart
            </h1>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white md:mt-20 md:mb-16 md:mr-56 drop-shadow-2xl p-8">
          <h1 className="text-black text-2xl font-bold mt-4 md:mt-14 md:ml-8">
            Sign up
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="text-black text-sm font-semibold mt-4 md:mt-5 md:ml-8">
                Username
              </h2>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`border border-slate-500 w-full md:w-80 h-8 mt-2 md:mt-3 md:ml-8 rounded ${formErrors.username && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.username && <p className="text-red-500 mt-1 md:ml-8">{formErrors.username}</p>}
            </div>

            <div>
              <h2 className="text-black text-sm font-semibold mt-4 md:mt-5 md:ml-8">
                Email
              </h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`border border-slate-500 w-full md:w-80 h-8 mt-2 md:mt-3 md:ml-8 rounded ${formErrors.email && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.email && <p className="text-red-500 mt-1 md:ml-8">{formErrors.email}</p>}
            </div>

            <div>
              <h2 className="text-black text-sm font-semibold mt-4 md:mt-5 md:ml-8">
                Password
              </h2>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`border border-slate-500 w-full md:w-80 h-8 mt-2 md:mt-3 md:ml-8 rounded ${formErrors.password && isSubmit ? 'border-red-500' : ''}`}
              />
              {isSubmit && formErrors.password && <p className="text-red-500 mt-1 md:ml-8">{formErrors.password}</p>}
            </div>

            {errorMessage && <p className="text-red-500 mt-2 md:ml-8">{errorMessage}</p>}

            <button className="text-white font-bold w-full md:w-80 h-10 mt-4 md:ml-8 md:mb-4 md:mt-8 rounded bg-gradient-to-r from-blue-200 to-blue-400">
              Sign up
            </button>
          </form>

          <div className="flex mt-2 md:ml-8">
            <p className="text-slate-400 mr-2">
              Already have an account?{" "}
            </p>
            <Link
              to="/login"
              style={{ color: "#90CCBA" }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;