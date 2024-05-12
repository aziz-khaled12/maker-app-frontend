import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileDrop from "../ProfileDrop/ProfileDrop";
import CategorieList from "../CategotyLIst/CategorieList";
import MakerLogo from "../../assets/MakerLogo.png";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setSearchQuery("");
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (!location.pathname.startsWith("/search/searched")) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  const handleClick = () => {
    setClicked(true);
  };

  const handleOutsideClick = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery !== "") {
      navigate(`/search/searched/${searchQuery}`);
    }
  };

  console.log(isLoggedIn);

  return (
    <>
      <nav className="Navbar">
        <div className="container">
          <Link className="logo" to="/">
            <div className="logo-container">
              {/* <img src={MakerLogo} alt="logo" /> */}
            </div>
            <h2>Maker dz</h2>
          </Link>
          <form
            onSubmit={handleSearchSubmit}
            className={`Search ${clicked ? "active" : ""}`}
            ref={searchRef}
          >
            <input
              type="text"
              placeholder="Search for anything"
              className="search-space"
              onClick={handleClick}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon
              icon="search"
              className="search-icon"
              onClick={handleSearchSubmit}
            />
          </form>

          {isLoggedIn ? (
            <>
              <div className="prof-drop-container">
                <ProfileDrop />
              </div>
            </>
          ) : (
            <>
              <div className="Sign">
                <Link to={"/Login"} className="log">
                  Log in
                </Link>
                <Link to={"/Signup"} className="log">
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
        <CategorieList />
      </nav>
    </>
  );
};

export default Navbar;
