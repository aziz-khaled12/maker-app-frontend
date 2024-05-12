import DropList from "../DropList/DropList";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "./CategorieList.css";
const CategorieList = () => {
  const categoryList = [
    "Men",
    "Women",
    "Gifts",
    "Decore",
    "Accessories",
    "Mats",
    "embroidery",
    "Aprons",
    "Kids",
    "Health & Beauty",
    "Bags & Purses",
    "Toys",
    "Craft Supplies & Tools",
    "Occasions Clothing",
    "Art",
  ];
  const subCategories = {
    Men: ["Men Shirts", "Men Pants", "Winter Clothes"],
    Women: [
      "Women Shirts",
      "Women Pants",
      "Hijab",
      "Dresses",
      "Pijamas",
      "Sports",
      "Prayer Sets & Rugs",
    ],
    Gifts: ["For Him", "For Her", "For kids", "Official"],
    Decore: ["House", "Office", "Other"],
    Accessories: ["Phone & PC", "Keys", "Cars", "Other"],
    Mats: ["Mats", "Curtains", "Carpets"],
    Aprons: ["For Kitchen", "For work", "For school"],
    embroidery: [],
    Kids: [],
    "Health & Beauty": [
      "Makeup",
      "Self Care",
      "Perfumes",
      "Oils",
      "Natural blends",
      "Care",
    ],
    "Bags & Purses": ["Bags", "Purses"],
    Toys: [],
    "Craft Supplies & Tools": ["House", "Office", "Other"],
    "Occasions Clothing": ["For Women", "Circumcision", "Other Occasions"],
    Art: ["Paint", "Sculpture", "Glass Art", "Ceramic Art", "Wood Art"],
  };

  const breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };

  return (
    <>
      <div className="category-container">
         <Swiper 
        navigation={true}
          breakpoints={breakpoints}
          modules={[Navigation]}
          className="mySwiper"
        >
          <div className="cats-inner-container">
            {categoryList.map((category) => {
              return (
                <SwiperSlide style={{ width: "auto" }} key={category}>
                  <DropList
                    key={category}
                    title={category}
                    items={subCategories[category]}
                  />
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper> 

      </div>
    </>
  );
};
export default CategorieList;
