import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // name state 
  const [name, setName] = useState("");
  // email state 
  const [email, setEmail] = useState("");
  // password state 
  const [password, setPassword] = useState("");
  // For toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  //  categories state 
  const [categories, setCategories] = useState([]);
  // error state for display to the user 
  const [error, setError] = useState(null);
  // for navigation 
  const navigate = useNavigate();
  //  array of video categories 
  const videoCategories = [
    "Sports",
    "News",
    "Entertainment",
    "Gaming",
    "Music",
    "Movies",
    "Arts",
    "Fashion",
    "Foods",
    "Vlogs",
    "Comedy",
    "Shopping",
    "Cartoons",
    "Education",
    "Health",
    "Programming",
    "Travels",
    "Motivations",
  ];

  // handle category change
  const handleCategoryChange = (category) => {
    // set the category from the checkbox 
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e) => {
    // prevent default behaviour 
    e.preventDefault();
    //  if category not provide 
    if (categories.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    const user_data = {
      name,
      email,
      password,
      categories,
    };

    try {
      // axios post request for signup 
      const response = await axios.post("http://localhost:1000/signup", user_data);
      // when successfully signup 
      if (response.status === 201) {
        alert("Successfully signed up");
        // clear the error 
        setError(null);
        // navigate to sign in 
        navigate("/signin");
      }
    } catch (error) {
      // handle the error, display error if occur 
      if (error.response) {
        setError(error.response.data?.message);
        console.log(error);
      } else {
        console.log("Error:", error.message);
        setError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl mt-5">Sign up</h1>
      <div className="flex items-center w-full h-screen flex-col mt-10 p-2">
        <div className="sm:w-3/4 lg:w-1/2 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Your Full Name"
              className="mt-4 border-slate-400 border-2 p-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email" className="mt-4">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="mt-4 border-slate-400 border-2 p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
            />

            <label htmlFor="password" className="mt-4">Password:</label>
            <div className="relative mt-4">
              <input
                id="password"
                // toggle password visibility 
                type={showPassword ? "text" : "password"}
                minLength={8}
                placeholder="Create Password"
                className="border-slate-400 border-2 p-1 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* if password available then show toggle password button  */}
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

            <h2 className="mt-6 font-bold">Select the categories of videos you like:</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {/* select unselect the categories  */}
              {videoCategories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    value={category}
                    checked={categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 mt-4 p-1 w-full md:w-1/2 lg:w-1/3 md:mx-auto my-0 rounded-md font-serif"
            >
              Sign up
            </button>
          </form>
          {/* dispplay error if occur  */}
          {error && <p className="text-red-600 text-center mt-3">{error}</p>}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to={"/signin"} className="text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
