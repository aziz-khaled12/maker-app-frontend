import React from "react";
import "./Hero.css";
import ButtonLink from "../Button/button";
import { FaCut } from "react-icons/fa";


const Hero = () => {
  return (
    <>
      <div className="Back-ground" /*style={{backgroundImage: `url(${Image})`}}*/>
        <div className="Hero-container">
          <div className="Hero-left">
            <h1>Make it as you like it</h1>
            <h2>
              Discover the infinit choices and order what you need just with the
              right size and quality
            </h2>
            <ButtonLink to="/Discover" className="btn">
              
              <FaCut></FaCut>Discover
            </ButtonLink>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Hero;
