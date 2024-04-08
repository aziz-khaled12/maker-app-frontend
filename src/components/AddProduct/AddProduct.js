import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";
import Select from "react-dropdown-select";

const predefinedColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "purple",
  "black",
  "white",
  "gray",
  "silver",
  "maroon",
  "navy",
  "teal",
  "olive",
  "lime",
  "fuchsia",
  "aqua",
  "magenta",
  "crimson",
  "sienna",
  "coral",
  "turquoise",
  "darkred",
  "darkorange",
  "darkyellow",
  "darkgreen",
  "darkblue",
  "darkindigo",
  "darkviolet",
  "darkpurple",
  "darkgray",
  "lightslategray",
  "lightsteelblue",
  "lavender",
  "pink",
  "lightpink",
  "hotpink",
  "lightcoral",
  "lightsalmon",
  "lightgoldenrodyellow",
  "palegoldenrod",
  "lightyellow",
  "beige",
  "whitesmoke",
  "mintcream",
  "ivory",
  "seashell",
  "floralwhite",
  "oldlace",
  "linen",
  "antiquewhite",
  "papayawhip",
  "blanchedalmond",
  "mistyrose",
  "gainsboro",
  "lightcyan",
  "lightblue",
  "skyblue",
  "lightskyblue",
  "steelblue",
  "aliceblue",
  "powderblue",
  "azure",
  "darkturquoise",
  "cadetblue",
  "cornflowerblue",
  "royalblue",
  "mediumblue",
  "midnightblue",
  "navyblue",
  "darkmagenta",
  "darkorchid",
  "brown",
  "firebrick",
  "indianred",
  "salmon",
  "darksalmon",
  "tomato",
  "orangered",
  "gold",
  "chartreuse",
  "palegreen",
  "greenyellow",
  "lawngreen",
  "limegreen",
  "forestgreen",
].map((name, index) => ({ name, id: index }));

const initialCategoryList = [
  "Men",
  "Women",
  "Gifts",
  "Decore",
  "Accessories",
  "Mats",
].map((name) => ({ name, selected: false }));

const initialSubCategories = {
  Men: [
    { name: "Shirts", selected: false },
    { name: "Pants", selected: false },
    { name: "Winter Clothes", selected: false },
    { name: "Pijamas", selected: false },
    { name: "Sports", selected: false },
  ],
  Women: [
    { name: "Shirts", selected: false },
    { name: "Pants", selected: false },
    { name: "Hijab", selected: false },
    { name: "Pijamas", selected: false },
    { name: "Sports", selected: false },
  ],
  Jeans: [
    { name: "triko", selected: false },
    { name: "alskj", selected: false },
    { name: "alkjsf", selected: false },
    { name: "alskfj", selected: false },
  ],
  Gifts: [
    { name: "For Him", selected: false },
    { name: "For Her", selected: false },
    { name: "For kids", selected: false },
    { name: "Official", selected: false },
  ],
  Decore: [
    { name: "House", selected: false },
    { name: "Office", selected: false },
    { name: "Other", selected: false },
  ],
  Accessories: [
    { name: "Phone & PC", selected: false },
    { name: "Keys", selected: false },
    { name: "Cars", selected: false },
    { name: "Other", selected: false },
  ],
  Mats: [
    { name: "Mats", selected: false },
    { name: "Curtains", selected: false },
    { name: "Carpets", selected: false },
  ],
};

const predefinedLetters = ["XS", "S", "M", "L", "XL", "XXL"].map(
  (name, index) => ({
    name,
    id: index,
  })
);
const predefinedNumbers = ["28", "30", "32", "34", "36", "38", "40", "42"].map(
  (name, index) => ({ name, id: index })
);

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
  const [letters, setLetters] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [custom, setCustom] = useState(false);
  const [selectedLetters, setSellectedLetters] = useState([]);
  const [selectedNumbers, setSellectedNumbers] = useState([]);
  const [selctedCutom, setSelectedCustom] = useState();
  const [categoryList, setCategoryList] = useState(initialCategoryList);
  const [subCategoriesToShow, setSubCategoriesToShow] = useState(initialSubCategories);
    

  const handleButtonClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
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

  const handleColorChange = (colors) => {
    console.log("colors: ", colors);
    const selectedColors = [];
    colors.map((color) => {
      if (!selectedColors.includes(color.name)) {
        selectedColors.push(color.name);
        setProductData({ ...productData, selectedColors });
      }
    });
  };


  const handleImageDelete = () => {};

  const handleSizeSelection = (sizes, type) => {
    const selectedLet = [];
    const selectedNum = [];
    if (type === "letters") {
      if (sizes.length === 0) {
        setSellectedLetters([]);
      } else {
        sizes.map((size) => {
          selectedLet.push(size.name);
          setSellectedLetters(selectedLet);
        });
      }
    } else if (type === "numbers") {
      if (sizes.length === 0) {
        setSellectedNumbers([]);
      } else {
        sizes.map((size) => {
          selectedNum.push(size.name);
          setSellectedNumbers(selectedNum);
        });
      }
    }
  };

  useEffect(() => {
    const selectedSizes = selectedLetters.concat(selectedNumbers);
    console.log("selected", selectedSizes);
    setProductData({ ...productData, selectedSizes });
  }, [selectedLetters, selectedNumbers]);

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

    const updatedSubCategories = subCategoriesToShow[clickedCategory.name].map(
      (subCat) => {
        if (clickedCategory.selected === true && subCat.selected === true) {
          return {
            ...subCat,
            selected: false,
          };
        }
        return subCat;
      }
    );

    console.log("updated sub:", updatedSubCategories);

    setSubCategoriesToShow({
      ...subCategoriesToShow,
      [clickedCategory.name]: updatedSubCategories,
    });
  };

  const handleSubCategoryClick = (subCategory, category) => {
    const updatedSubCategories = subCategoriesToShow[category.name].map(
      (subCat) => {
        if (subCat.name === subCategory.name) {
          return {
            ...subCat,
            selected: !subCat.selected,
          };
        }
        return subCat;
      }
    );

    setSubCategoriesToShow({
      ...subCategoriesToShow,
      [category.name]: updatedSubCategories,
    });
  };

  const updateProductCategories = () => {
    const selectedCategories = [];

    // Iterate over categoryList to include selected categories
    categoryList.forEach((category) => {
      if (category.selected) {
        selectedCategories.push(category.name);
      }

      // Check if subcategories of this category are selected
      if (subCategoriesToShow[category.name]) {
        subCategoriesToShow[category.name].forEach((subCategory) => {
          if (subCategory.selected) {
            selectedCategories.push(subCategory.name);
          }
        });
      }
    });

    setProductData((prevData) => ({
      ...prevData,
      categories: selectedCategories,
    }));
  };

  useEffect(() => {
    updateProductCategories();
  }, [subCategoriesToShow, categoryList]);

  console.log("last", productData.selectedSizes);

  return (
    <>
      <div className="huge-add-container">
        <div className="big-add-container">
          <h2>Add Product</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="add-datails">
              <label>
                <span className="text-inside-label">
                  <span>Price *</span>
                  <span>
                    Consider material, labor, and business expenses. Account for
                    shipping costs if offering free shipping to protect profits.
                  </span>
                </span>
                <input
                  className="theInput"
                  type="text"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                />
              </label>
              <br />
              <label>
                <span className="text-inside-label">
                  <span>Title *</span>
                  <span>
                    Include keywords that buyers would use to search for your
                    item.
                  </span>
                </span>
                <input
                  className="theInput"
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  placeholder="Product name"
                />
              </label>
              <br />

              <label>
                <span className="text-inside-label">
                  <span>Description *</span>
                  <span>
                    Begin with a concise summary highlighting your item's best
                    features. Shoppers initially view only the first few lines,
                    so make them impactful. Unsure what to add? Shoppers also
                    appreciate insights into your process and the story behind
                    the item.
                  </span>
                </span>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </label>
              <br />

              <label className="category-label">
                <span className="text-inside-label">
                  <span>Categories *</span>
                  <span>
                    Choose the main category of your product along side with the
                    sub categories to make it easy to reach
                  </span>
                </span>
                <ul>
                  {categoryList &&
                    categoryList.map((category) => (
                      <>
                        <div className="drop-cat">
                          <li
                            key={category.name}
                            className={category.selected ? "selected-cat" : ""}
                            onClick={() => handleCategoryClick(category)}
                          >
                            {category.name}
                          </li>
                          {category.selected &&
                            subCategoriesToShow &&
                            subCategoriesToShow[category.name] &&
                            subCategoriesToShow[category.name].map((subCat) => (
                              <li
                                key={subCat.name}
                                className={
                                  subCat.selected ? "selected-cat" : ""
                                }
                                onClick={() =>
                                  handleSubCategoryClick(subCat, category)
                                }
                              >
                                {subCat.name}
                              </li>
                            ))}
                        </div>
                      </>
                    ))}
                </ul>
              </label>
              <br />
              <br />
              <span className="text-inside-label">
                <span>Photos *</span>
                <span>
                  Use up to ten photos to show your item's most important
                  qualities.
                </span>
              </span>
              <label className="photos-label">
                <div className="input-photo">
                  <input
                    type="file"
                    name="photos"
                    onChange={handleFileChange}
                    multiple
                    id="file-upload"
                  />{" "}
                  <button
                    type="button"
                    onClick={() => {
                      handleButtonClick();
                    }}
                  >
                    choose files
                  </button>
                </div>

                {previewImages.map((image, index) => (
                  <div>
                    <img
                      key={index}
                      src={image}
                      alt="preview"
                      className="preview-image"
                    />
                    <button
                      className="image-delete"
                      onClick={handleImageDelete}
                    >
                      X
                    </button>
                  </div>
                ))}
              </label>
            </div>
            <div className="add-datails">
              <span className="text-inside-label">
                <span>Title *</span>
                <span>
                  Include keywords that buyers would use to search for your
                  item.
                </span>
              </span>

              <label className="color-label">
                <span className="text-inside-label">
                  <span>Colors *</span>
                  <span>
                    Display the available colors of your product clearly.
                    Customers rely on this information to make decisions. Keep
                    it brief but effective in showcasing the range of colors
                    available.
                  </span>
                </span>
                <div className="select-div">
                  <Select
                    className="select-colors"
                    dropdownHandle={true}
                    name="colors"
                    options={predefinedColors}
                    multi
                    searchable={true}
                    labelField="name"
                    valueField="name"
                    onChange={(value) => handleColorChange(value)}
                    color="#704731"
                    style={{
                      color: "black",
                      "min-height": "60px",
                      width: "100%",
                    }}
                  ></Select>
                </div>
              </label>
              <br />
              <label>
                <span className="text-inside-label">
                  <span>Materials *</span>
                  <span>
                    List the main materials used in your product upfront.
                    Customers seek this information to gauge quality and
                    suitability. Keep it concise yet impactful to highlight the
                    materials' significance.
                  </span>
                </span>
                <input
                  className="theInput"
                  type="text"
                  name="materials"
                  value={productData.materials}
                  onChange={handleInputChange}
                  placeholder="Enter materials (separated by comma, semicolon, or newline)..."
                />
              </label>
              <br />
              <div
                className="size-label"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <span className="text-inside-label">
                  <span>Sizes *</span>
                  <span>
                    Select what type of sizes your product have also you can add
                    your custom sizes
                  </span>
                </span>

                <div
                  className="dropdown"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <div className="checkbox-div">
                    <input
                      className="checkbox-size"
                      type="checkbox"
                      onClick={() => {
                        setLetters(!letters);
                      }}
                    />
                    Letters
                  </div>

                  <div
                    className="select-div"
                    onClick={(event) => {
                      // Prevent the click event from reaching the checkbox
                      event.stopPropagation();
                    }}
                  >
                    <Select
                      disabled={!letters}
                      className="select-letters"
                      dropdownHandle={true}
                      name="letters"
                      options={predefinedColors}
                      multi={true}
                      searchable={true}
                      labelField="name"
                      valueField="name"
                      onChange={(value) =>
                        handleSizeSelection(value, "letters")
                      }
                      color="#704731"
                      style={{
                        color: "black",
                        "min-height": "60px",
                        width: "100%",
                      }}
                    ></Select>
                  </div>
                </div>
                <div className="dropdown">
                  <div className="checkbox-div">                  
                    <input
                    className="checkbox-size"
                      type="checkbox"
                      onClick={() => setNumbers(!numbers)}
                    />
                    Numbers
                  </div>

                  <div className="select-div">
                    <Select
                      disabled={!numbers}
                      className="select-numbers"
                      dropdownHandle={true}
                      name="numbers"
                      options={predefinedNumbers}
                      multi={true}
                      searchable={true}
                      labelField="name"
                      valueField="name"
                      onChange={(value) =>
                        handleSizeSelection(value, "numbers")
                      }
                      color="#704731"
                      style={{
                        color: "black",
                        "min-height": "60px",
                        width: "100%",
                      }}
                    ></Select>

                  </div>

                  
                  
                </div>
                <div className="dropdown">
                  <div className="checkbox-div">                  
                    <input
                    className="checkbox-size"
                      type="checkbox"
                      onClick={() => setCustom(!custom)}
                    />
                    Custom
                  </div>

                  <input
                  disabled = {!custom}
                  className={custom ? "theInput" : "input-disabled"}
                  type="text"
                  name="materials"
                  value={productData.materials}
                  onChange={handleInputChange}
                  placeholder="Enter materials (separated by comma, semicolon, or newline)..."
                />
                  
                  
                </div>
              </div>
              <br />
            </div>

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
