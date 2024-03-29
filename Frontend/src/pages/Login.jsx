import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
//import CircleMouseFollower from "../Components/CircleMouseFollower";
//import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: inputValue }));

    // Clear error messages when input values change
    if (name === "email") {
      setEmailError("");
      setUserNotFound(false);
    } else if (name === "password") {
      setPasswordError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setPasswordError("");
    } else {
      // Email is valid, validate password
      if (!validatePassword(password)) {
        setPasswordError("Password must be at least 8 characters long.");
      } else {
        setPasswordError("");
      }

      // If both email and password are valid, proceed with login
      if (validateEmail(email) && validatePassword(password)) {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/login",
            formData
          );
          console.log(response.data); // Log the response from the backend
          navigate("/");
        } catch (error) {
          console.error("Error during login:", error);
          if (error.response && error.response.data && error.response.data.error) {
            if (error.response.data.error === "User not found") {
              setUserNotFound(true);
              setPasswordError("");
            } else if (error.response.data.error === "Incorrect password") {
              setPasswordError("Incorrect password");
              setUserNotFound(false);
            } else {
              setErrorMessage(error.response.data.error);
              setPasswordError("");
            }
          } else {
            setErrorMessage("An error occurred during login.");
            setPasswordError("");
          }
        }
      }
    }

// 
//     const { email, password } = formData;
  
//     // Validate email
//     if (!validateEmail(email)) {
//       setEmailError("Please enter a valid email address.");
//       setPasswordError("");
//     } else {
//       // Email is valid, validate password
//       if (!validatePassword(password)) {
//         setPasswordError("Password must be at least 8 characters long.");
//       } else {
//         setPasswordError("");
//       }
  
//       // If both email and password are valid, proceed with login
//       if (validateEmail(email) && validatePassword(password)) {
//         try {
//           const response = await axios.post(
//             "http://localhost:4000/api/login",
//             formData
//           );
//           console.log(response.data); // Log the response from the backend
//           navigate("/");
//         } catch (error) {
//           console.error("Error during login:", error);
//           if (error.response && error.response.data && error.response.data.error) {
//             if (error.response.data.error === "User not found") {
//               setUserNotFound(true);
//               setPasswordError("");
//             } else if (error.response.data.error === "Incorrect password") {
//               setPasswordError("Incorrect password");
//               setUserNotFound(false);
//             } else {
//               setErrorMessage(error.response.data.error);
//               setPasswordError("");
//             }
//           } else {
//             setErrorMessage("An error occurred during login.");
//             setPasswordError("");
//           }
//         }
//       }
//     }

  };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col md:flex-row  h-screen">
        {/* 1st half */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-200 to-blue-400 p-8 md:mt-20 md:ml-56 md:mb-16 drop-shadow-xl">
          <h1 className="text-white mt-7 ml-8 font-bold">MEDIMART</h1>
          <h1 className="font-bold text-white text-5xl mt-10 pt-20 ml-8">
            Welcome
          </h1>
          <h1 className="font-bold text-white text-5xl mt-7 mb-[6rem] ml-8">Back!</h1>
        </div>

        {/* 2nd Half */}
        <div className="w-full md:w-1/2 bg-white md:mt-20 md:mb-16 md:mr-56 drop-shadow-2xl p-8">
          <h1 className="text-black text-2xl font-bold mt-14">Login</h1>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <h2 className="text-black text-sm font-semibold mt-5">
              Email/Username
            </h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-slate-500 w-full h-8 mt-3 rounded"
              required
            />
            {emailError && (
              <p className="text-red-500 mt-1">{emailError}</p>
            )}

            {/* Password */}
            <h2 className="text-black text-sm font-semibold mt-5">Password</h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-slate-500 w-full h-8 mt-3 rounded"
              required
            />
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}

            {/* CheckBox */}
            <div className="flex flex-col md:flex-row">
              <div className="flex">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="bg-teal-200 mt-4 mb-5 mr-2"
                />
                <h3 className="mt-6 text-slate-400 text-sm">Remember me</h3>
              </div>
              <h3 className="mt-2 mb-8 text-slate-400 text-sm ml-auto">
                Forgot Password?
              </h3>
            </div>

            {/* Log in Button */}
            <button
              type="submit"
              className="text-white font-bold py-2 px-20 w-full h-10 rounded bg-gradient-to-r from-blue-200 to-blue-400"
              disabled={!formData.email || !formData.password}
            >
              Log in
            </button>
          </form>
          {userNotFound && (
            <div className="mt-4">
              <p className="text-red-500">
                User not found. Please Signup instead.
              </p>
            </div>
          )}
          {/* ... */}
          <div className="flex mt-2">
            <h3 className="text-slate-400 mr-2">New User?</h3>
            <Link to="/SignUp" style={{ color: "#90CCBA" }}>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;