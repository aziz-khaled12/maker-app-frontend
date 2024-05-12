import React from "react";
import "./Hero.css";
import ButtonLink from "../Button/button";
import { FaCut } from "react-icons/fa";
import Image from "../../assets/maker-background4.jpg"


const Hero = () => {

const smoothScroll = () =>{
  document.getElementById('popular').scrollIntoView({
    behavior: 'smooth'
  });
}
  


  return (
    <>
      
      <div className="Back-ground" style={{backgroundImage: `url(${Image})`}}>
        <div className="overlay-hero"></div>
        <div className="Hero-container">
          <div className="Hero-left">
            <h1>Make it as you like it</h1>
            <h2>
              Discover the infinit choices and order what you need just with the
              right size and quality
            </h2>
            <button className="btn" onClick={smoothScroll}>
              
              <FaCut></FaCut>Discover
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Hero;
