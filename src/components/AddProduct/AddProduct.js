import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

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
  "Gifts",
  "Decore",
  "Accessories",
  "Mats",
].map((name) => ({ name, selected: false }));

const subCategories = {
  Men: ["Shirts", "Pants", "Winter Clothes", "Pijamas", "Sports"],
  Women: ["Shirts", "Pants", "Hijab", "Pijamas", "Sports"],
  Jeans: ["triko", "alskj", "alkjsf", "alskfj"],
  Gifts: ["For Him", "For Her", "For kids", "Official"],
  Decore: ["House", "Office", "Other"],
  Accessories: ["Phone & PC", "Keys", "Cars", "Other"],
  Mats: ["Mats", "Curtains", "Carpets"],
};

const ProductAdd = () => {
  const [productData, setProductData] = useState({
    sellerId: "",
    name: "",
    description: "",
    selectedColors: [],
    materials: [],
    selectedSizeType: "",
    selectedSizes: [],
    photos: [],
    categories: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(initialCategoryList);
  const [subCategoriesToShow, setSubCategoriesToShow] = useState([]);

  const handleButtonClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryClick = (clickedCategory) => {
    const updatedCategories = categoryList.map((category) => {
      if (category.name === clickedCategory.name) {
        return {
          ...category,
          selected: !category.selected,
        };
      }
      return category;
    });

    setCategoryList(updatedCategories);

    // Toggle visibility of subcategories
    if (clickedCategory.selected) {
      setSubCategoriesToShow(subCategories[clickedCategory.name]);
    } else {
      setSubCategoriesToShow([]);
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    const updatedSubCategories = subCategoriesToShow.map((subCat) => {
      if (subCat === subCategory) {
        return {
          ...subCat,
          selected: !subCat.selected,
        };
      }
      return subCat;
    });

    setSubCategoriesToShow(updatedSubCategories);
  };

  const updateProductCategories = (updatedCategories) => {
    const selectedCategories = updatedCategories
      .filter((category) => category.selected)
      .map((category) => category.name);
    setProductData({ ...productData, categories: selectedCategories });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedPhotos = [...productData.photos];
    for (let i = 0; i < files.length; i++) {
      if (selectedPhotos.length < 10) {
        selectedPhotos.push(files[i]);
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewImages((prevImages) => [
            ...prevImages,
            event.target.result,
          ]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
    setProductData({ ...productData, photos: selectedPhotos });
  };

  const handleColorChange = (color) => {
    const selectedColors = [...productData.selectedColors];

    if (selectedColors.includes(color)) {
      const index = selectedColors.indexOf(color);
      selectedColors.splice(index, 1);
    } else {
      selectedColors.push(color);
    }

    setProductData({ ...productData, selectedColors });
  };

  const handleSizeTypeChange = (type) => {
    setProductData({
      ...productData,
      selectedSizeType: type,
      selectedSizes: [],
    });
    setIsOpen(false);
  };

  const handleSizeSelection = (size) => {
    const selectedSizes = [...productData.selectedSizes];
    if (selectedSizes.includes(size)) {
      selectedSizes.splice(selectedSizes.indexOf(size), 1);
    } else {
      selectedSizes.push(size);
    }
    setProductData({ ...productData, selectedSizes });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("price", productData.price);
    formData.append("name", productData.name);
    formData.append("description", productData.description);

    productData.selectedColors.forEach((color) => {
      formData.append("colors", color);
    });

    const materialArray = productData.materials
      .split(/[,\n;]/)
      .map((material) => material.trim())
      .filter((material) => material !== "");
    materialArray.forEach((material) => {
      formData.append("materials", material);
    });

    productData.selectedSizes.forEach((sizes) => {
      formData.append("sizes", sizes);
    });
    productData.categories.forEach((categories) => {
      formData.append("categories", categories);
    });
    for (let i = 0; i < productData.photos.length; i++) {
      formData.append("photos", productData.photos[i]);
    }
    // Include the seller's ID from the token
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    formData.append("sellerId", decodedToken.userId);

    try {
      const response = await axios.post(
        "https://maker-app-backend.vercel.app/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div className="huge-add-container">
        <div className="big-add-container">
          <h2>Add Product</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              <input
                type="text"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="Product name"
              />
            </label>
            <br />
            <label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
            </label>
            <br />
            <label>
              Colors:
              <div className="color-circles">
                {predefinedColors.map((color) => (
                  <div
                    key={color}
                    className={`color-circle ${
                      productData.selectedColors.includes(color)
                        ? "selected-color"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </label>
            <br />
            <label>
              <input
                type="text"
                name="materials"
                value={productData.materials}
                onChange={handleInputChange}
                placeholder="Enter materials (separated by comma, semicolon, or newline)..."
              />
            </label>
            <br />
            <label className="size-label">
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Select Size Type
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li onClick={() => handleSizeTypeChange("letters")}>
                        Letters (XS, S, M, L, XL, XXL)
                      </li>
                      <li onClick={() => handleSizeTypeChange("numbers")}>
                        Numbers (28 to 46)
                      </li>
                    </ul>
                    {productData.selectedSizeType && (
                      <div className="available-sizes">
                        <div>Available Sizes:</div>
                        <label className="letters-label">
                          {productData.selectedSizeType === "letters"
                            ? ["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                <label
                                  key={size}
                                  style={{ marginRight: "10px", width: "80%" }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={productData.selectedSizes.includes(
                                      size
                                    )}
                                    onChange={() => handleSizeSelection(size)}
                                  />
                                  {size}
                                </label>
                              ))
                            : Array.from(
                                { length: 10 },
                                (_, i) => 28 + i * 2
                              ).map((size) => (
                                <label
                                  key={size}
                                  style={{ marginRight: "10px" }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={productData.selectedSizes.includes(
                                      size
                                    )}
                                    onChange={() => handleSizeSelection(size)}
                                  />
                                  {size}
                                </label>
                              ))}
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </label>
            <br />
            <br />
            Photos:
            <label className="photos-label">
              <input
                type="file"
                name="photos"
                onChange={handleFileChange}
                multiple
                id="file-upload"
              />

              {previewImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="preview"
                  className="preview-image"
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  handleButtonClick();
                }}
              >
                choose files
              </button>
            </label>
            <br />
            <label className="category-label">
              Categories:
              <ul>
                {categoryList.map((category) => (
                  <>
                    <li
                      key={category.name}
                      className={category.selected ? "selected-cat" : ""}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </li>
                    {category.selected &&
                      subCategories[category.name].map((subCat) => (
                        <li
                          key={subCat}
                          className={subCat.selected ? "selected-cat" : ""}
                          onClick={() => handleSubCategoryClick(subCat)}
                        >
                          {subCat}
                        </li>
                      ))}
                  </>
                ))}
              </ul>
            </label>
            <button type="submit" className="add-btn">
              Add Product
            </button>
          </form>
        </div>
        <div className="big-preview-container"></div>
      </div>
    </>
  );
};

export default ProductAdd;
