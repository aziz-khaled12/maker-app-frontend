import React, { useState, useEffect } from "react";
import "./Filter.css";

const predefinedColors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
  "White",
];
const initialCategoryList = [
  "Men",
  "Women",
  "Boys",
  "Girls",
  "Kids",
  "Asian people",
  "Niggas",
];
const priceRanges = [
  { label: "0 - 1000", value: "0-1000" },
  { label: "1000 - 2500", value: "1000-2500" },
  { label: "2500 - 5000", value: "2500-5000" },
  { label: "5000 - 10000", value: "5000-10000" },
  { label: "Custom", value: "custom" },
  { label: "All", value: "all" },
];

const FilterComponent = ({ sendData, products }) => {
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    priceRanges: [],
    customPrice: { min: "", max: "" }, // Add custom price range object
  });
  const initialProducts = [...products];
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    setOriginalData(products); // Set original data when products prop changes
  }, [products]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      colors: [],
      priceRanges: [],
      customPrice: { min: "", max: "" },
    });
    sendData(initialProducts); // Send initial products back
    
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (filterType === "priceRanges" && value === "custom") {
        updatedFilters.priceRanges = [];
      } else if (
        filterType === "priceRanges" &&
        !prevFilters.priceRanges.includes("custom")
      ) {
        updatedFilters.priceRanges = [value];
      } else {
        updatedFilters[filterType] = prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value];
      }
      return updatedFilters;
    });
  };

  const handleCustomPriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      customPrice: {
        ...prevFilters.customPrice,
        [name]: value,
      },
    }));
  };

  const applyFilters = () => {
    let filteredProducts = [...originalData]; // Create a copy of the products array to avoid modifying the original

    // Apply category filter
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categories.some((category) =>
          product.categories.includes(category)
        )
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.colors.some((color) => product.colors.includes(color))
      );
    }

    // Apply price range filter
    if (filters.priceRanges.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = parseFloat(product.price);
        return filters.priceRanges.some((range) => {
          if (range === "all") return true;
          const [min, max] = range.split("-").map(parseFloat);
          return price >= min && price <= max;
        });
      });
    }

    // Apply custom price filter
    const { min, max } = filters.customPrice;
    if (min && max) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = parseFloat(product.price);
        return price >= parseFloat(min) && price <= parseFloat(max);
      });
    }

    sendData(filteredProducts); // Send filtered products to parent component
  };

  return (
    <>
      <div className="inside-filter-container">
        <div className="filter-content-wrapper">
          <h2>Filters</h2>

          <h3>Categories</h3>
          {initialCategoryList.map((category, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={category}
                checked={filters.categories.includes(category)}
                onChange={() => handleFilterChange("categories", category)}
              />
              {category}
            </label>
          ))}
          <h3>Colors</h3>
          {predefinedColors.map((color, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={color}
                checked={filters.colors.includes(color)}
                onChange={() => handleFilterChange("colors", color)}
              />
              {color}
            </label>
          ))}

          <h3>Price Range</h3>
          {priceRanges.map((range) => (
            <label key={range.value}>
              <input
                type="checkbox"
                value={range.value}
                checked={filters.priceRanges.includes(range.value)}
                onChange={(e) =>
                  handleFilterChange("priceRanges", e.target.value)
                }
              />
              {range.label}
            </label>
          ))}

          {filters.priceRanges.includes("custom") && (
            <div>
              <label htmlFor="minPrice">Min Price:</label>
              <input
                type="number"
                name="min"
                value={filters.customPrice.min}
                onChange={handleCustomPriceChange}
              />
              <label htmlFor="maxPrice">Max Price:</label>
              <input
                type="number"
                name="max"
                value={filters.customPrice.max}
                onChange={handleCustomPriceChange}
              />
            </div>
          )}
        </div>
        <div className="filter-btns-container">
            <div className="filter-btns-wrapper">

            
          <button className="filter-button" onClick={resetFilters}>
            reset
          </button>
          <button className="filter-button" onClick={applyFilters}>
            Apply Filters
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterComponent;
