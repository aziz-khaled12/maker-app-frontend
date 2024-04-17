import React, { useEffect } from "react";
import Hero from "../Hero/Hero";
import Popular from "../PopularProducts/Popular";
import TopVendors from "../TopVendors/TopVendors";
import Slideshow from "../ProductSlider/Slideshow";

const token = localStorage.getItem("token");
if (token) {
  console.log("Token:", token);
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log("Decoded Token:", decodedToken);
  localStorage.setItem("userId", decodedToken.userId);
  console.log("userId:", decodedToken.userId);
} else {
  console.log("Token does not exist");
}

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      <Hero></Hero>
      <Popular></Popular>
      <Slideshow></Slideshow>
      <TopVendors></TopVendors>           
    </>
  );
};

export default Home;
