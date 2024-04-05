import { useState, React, useEffect } from "react";
import "./Card.css";
import { FaBagShopping } from "react-icons/fa6";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const MyCard2 = ({ product }) => {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState();
  const token = localStorage.getItem("token");
  if (token) {
    setDecodedToken(JSON.parse(atob(token.split(".")[1])));
    const userId = decodedToken.userId;
  }
  
  
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async (productId) => {
    try {
      const response = await axios.put(
        `https://maker-app-backend.vercel.app/user/${userId}/liked/${productId}`
      );
      console.log(response.data);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking product :", error);
    }
  };
  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const response = await axios.get(
          `https://maker-app-backend.vercel.app/users/${userId}`
        );
        const isLiked = response.data.liked.includes(product._id);
        if (isLiked) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    checkLikedStatus();
  }, [product._id]);

  const handleBuyNowClick = async (productId) => {
    try {
      const response = await axios.get(`/products/${productId}`);
      if (response.status === 200) {
        console.log("Product details:", response.data);
        navigate(`/products/${productId}`);
      } else {
        console.error("Error fetching product details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const imageUrl =
    product.photos && product.photos.length > 0
      ? `https://maker-app-backend.vercel.app/photos/${product.photos[0]}`
      : "";

  return (
    <div className="main-container">
      <div className="grid-container">
        <Link to={`/products/${product._id}`}>
          <Image style={{ backgroundImage: `url(${imageUrl})` }} />
        </Link>
        <button
          className={liked ? "like liked" : "like"}
          onClick={() => handleLikeClick(product._id)}
        >
          <div className="inside">
            <FaHeart />
          </div>
        </button>
        <div className="info-container">
          <h3>{product.name}</h3>
          <h4>{`${product.price} DZD`}</h4>
          <div className="btn-container">
            <button
              onClick={() => handleBuyNowClick(product._id)}
              className="act-btn"
            >
              <div className="inside-text-wrapper">
                <FaBagShopping />
                Buy now
              </div>
            </button>
            <button className="act-btn">
              <div className="inside-text-wrapper">
                <FaShoppingCart />
                Add to cart
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCard2;

const Image = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 20px;
  background-size: cover;
  display: flex;
  justify-content: end;
`;
