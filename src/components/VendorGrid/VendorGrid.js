import React, { useState, useEffect } from "react";
import Vendor from "../vendor/vendor";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./VendorGrid.css";
const VendorGrid = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://maker-app-backend.vercel.app/sellers"
        );
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  };

  return (
    <div className="grid-container-2">
      <Swiper
        pagination={true}
        breakpoints={breakpoints}
        modules={[Pagination]}
        className="mySwiper"
      >
        {sellers.length > 0 &&
          sellers.slice(0, 16).map((seller) => (
            <SwiperSlide style={{ width: "auto" }}>
              <Vendor key={seller._id} seller={seller} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default VendorGrid;
