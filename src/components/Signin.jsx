import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  // for navigation 
  const navigate = useNavigate();
  // email state 
  const [email, setEmail] = useState("");
  // password state 
  const [password, setPassword] = useState("");
  // error state 
  const [error, setError] = useState(null);
  // toggle password visibility 
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    // stop default behaviour pf submission like refresh page
    e.preventDefault();

    const user_data = {
      email,
      password
    };
    try {
      // axios post request for signin
      const response = await axios.post('http://localhost:1000/signin', user_data);
      // take the token 
      const { token } = response.data;
      // save to local storage 
      localStorage.setItem("token", token);
      if (response.status == 200) {
        // clear the error
        setError(null);
        // navigate to the home page 
        navigate('/');
      }
    } catch (error) {
      // handle the error display to the user 
      if (error.response) {
        setError(error.response.data?.message || "unable to sign in, try again");
      } else {
        console.log("Error:", error.message);
        setError("Unexpected error occurred.");
      }
    }
  }

  return (
    <div>
      <h1 className="text-center text-3xl mt-5"> Sign in </h1>
      <div className="flex items-center w-full h-screen flex-col mt-10">
        <div className="sm:w-1/2 lg:w-1/4 w-full">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mt-4"> Email:</label>
            <input type="email" placeholder="Enter Email" className="mt-4 border-slate-400 border-2 p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required />
            <label htmlFor="password" className="mt-4">Password:</label>
            <div className="relative mt-4">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                minLength={8}
                placeholder="Create Password"
                className="border-slate-400 border-2 p-1 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>

            <button className="bg-blue-400 hover:bg-blue-600 mt-4 p-1 w-full md:w-1/2 
            lg:w-1/3 md: mx-auto my-0 rounded-md font-serif"
              type="submit"
            >sign in</button>
          </form>
          {error && <p className="text-red-600 text-center mt-3">{error}</p>}
          <p className="mt-3 text-center">  Don't have an account? <Link to={'/signup'} className="text-blue-600"> Sign up</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default Signin;