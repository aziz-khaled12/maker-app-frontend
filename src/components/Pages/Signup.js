import React from "react";
import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://maker-app-backend.vercel.app/api/register",
        { username, email, password, role }
      );
      console.log("User saved:", response.data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Username is already taken. Please choose another.");
      } else {
        console.error("Error saving user:", error);
      }
    }
  };

  return (
    <>
      <div className="big-wrapper-signup">
        <div className="big-container-signup">
          <container className="sign-up-container">
            <header>Sign up</header>
            {error && <p className="error-message">{error}</p>}
            <div className="signup-with-socials">
              <div className="head">
                <div className="line"></div>
                <div> Sign up with socials </div>
                <div className="line"></div>
              </div>
              <div className="btns">
                <button className="social-btn">
                  <FaGoogle /> Google
                </button>
                <button className="social-btn">
                  <FaFacebook /> Facebook
                </button>
              </div>
            </div>
            <div className="signup-with-email">
              <form className="signup-form">
                <div className="head">
                  <div className="line"></div>
                  <div> Sign up with Email </div>
                  <div className="line"></div>
                </div>

                <div className="signup-input-container">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    placeholder="Username"
                  ></input>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                  ></input>
                  <div className="Role">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option selected className="selected">
                        Choose your role
                      </option>
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                    </select>
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  ></input>
                  <input type="password" placeholder="Confirm Password"></input>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Sign up
                </button>
              </form>
            </div>
          </container>
        </div>
      </div>
    </>
  );
};

export default Signup;
