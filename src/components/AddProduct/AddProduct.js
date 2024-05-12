import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";
import Select from "react-dropdown-select";
import Box from "@mui/material/Box";
import { FaRegCircleCheck } from "react-icons/fa6";
import Modal from "@mui/material/Modal";
import {Link} from "react-router-dom"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
};

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

const initialCategoryList = categoryList.map((name) => ({
  name,
  selected: false,
}));

const initialSubCategories = {
  Men: ["Men Shirts", "Men Pants", "Winter Clothes"].map((name) => ({
    name,
    selected: false,
  })),
  Women: [
    "Women Shirts",
    "Women Pants",
    "Hijab",
    "Dresses",
    "Pijamas",
    "Sports",
    "Prayer Sets & Rugs",
  ].map((name) => ({ name, selected: false })),
  Gifts: ["For Him", "For Her", "For kids", "Official"].map((name) => ({
    name,
    selected: false,
  })),
  Decore: ["House", "Office", "Other"].map((name) => ({
    name,
    selected: false,
  })),
  Accessories: ["Phone & PC", "Keys", "Cars", "Other"].map((name) => ({
    name,
    selected: false,
  })),
  Mats: ["Mats", "Curtains", "Carpets"].map((name) => ({
    name,
    selected: false,
  })),
  Aprons: ["For Kitchen", "For work", "For school"].map((name) => ({
    name,
    selected: false,
  })),
  embroidery: [].map((name) => ({ name, selected: false })),
  Kids: [].map((name) => ({ name, selected: false })),
  "Health & Beauty": [
    "Makeup",
    "Self Care",
    "Perfumes",
    "Oils",
    "Natural blends",
    "Care",
  ].map((name) => ({ name, selected: false })),
  "Bags & Purses": ["Bags", "Purses"].map((name) => ({
    name,
    selected: false,
  })),
  Toys: [].map((name) => ({ name, selected: false })),
  "Craft Supplies & Tools": ["House", "Office", "Other"].map((name) => ({
    name,
    selected: false,
  })),
  "Occasions Clothing": ["For Women", "Circumcision", "Other Occasions"].map(
    (name) => ({ name, selected: false })
  ),
  Art: ["Paint", "Sculpture", "Glass Art", "Ceramic Art", "Wood Art"].map(
    (name) => ({ name, selected: false })
  ),
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

  const [open, setOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [letters, setLetters] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [custom, setCustom] = useState(false);
  const [selectedLetters, setSellectedLetters] = useState([]);
  const [selectedNumbers, setSellectedNumbers] = useState([]);
  const [selctedCutom, setSelectedCustom] = useState([]);
  const [categoryList, setCategoryList] = useState(initialCategoryList);
  const [subCategoriesToShow, setSubCategoriesToShow] =
    useState(initialSubCategories);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
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
    const selectedColors = [];
    colors.map((color) => {
      if (!selectedColors.includes(color.name)) {
        selectedColors.push(color.name);
        setProductData({ ...productData, selectedColors });
      }
    });
  };

  const handleImageDelete = (index) => {
    const deletedPhoto = productData.photos.splice(index, 1);
    const deletedPreview = previewImages.splice(index, 1);
    const newPreview = [];
    const newPhotos = [];
    previewImages.map((photo) => {
      if (photo != deletedPreview) {
        newPreview.push(photo);
      }
    });
    productData.photos.map((photo) => {
      if (photo != deletedPhoto) {
        newPhotos.push(photo);
      }
    });
    setProductData({ ...productData, photos: newPhotos });
    setPreviewImages(newPreview);
  };

  const handleCustomSize = (e) => {
    const { value } = e.target;
    setSelectedCustom(value);
  };

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

    if (selctedCutom.length > 0) {
      const customSizes = selctedCutom.split(/[,\n;]/);
      customSizes.forEach((size) => {
        setProductData({ ...productData.selectedSizes.push(size) });
      });
    }

    productData.selectedSizes.forEach((sizes) => {
      formData.append("sizes", sizes);
    });

    productData.categories.forEach((categories) => {
      formData.append("categories", categories);
    });
    for (let i = 0; i < productData.photos.length; i++) {
      formData.append("photos", productData.photos[i]);
    }
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
      setOpen(true);
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
                  required
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
                  required
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
              <div className="photos-label">
                <div className="input-photo">
                  <input
                    type="file"
                    name="photos"
                    required
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
                  <div className="preview-container">
                    <img
                      key={index}
                      src={image}
                      alt="preview"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="image-delete"
                      onClick={() => handleImageDelete(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="add-datails">
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
                  required
                  value={productData.materials}
                  onChange={handleInputChange}
                  placeholder="Enter materials (separated by comma, semicolon, or newline)..."
                />
              </label>
              <br />
              <div className="size-label">
                <span className="text-inside-label">
                  <span>Sizes *</span>
                  <span>
                    Select what type of sizes your product have also you can add
                    your custom sizes
                  </span>
                </span>

                <div className="dropdown">
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

                  <div className="select-div">
                    <Select
                      disabled={!letters}
                      className="select-letters"
                      dropdownHandle={true}
                      name="letters"
                      options={predefinedLetters}
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
                    disabled={!custom}
                    className={custom ? "theInput" : "input-disabled"}
                    type="text"
                    name="custom-size"
                    value={selctedCutom}
                    onChange={handleCustomSize}
                    placeholder="Enter materials (separated by comma, semicolon, or newline)..."
                  />
                </div>
              </div>
              <br />
            </div>

            <button type="submit" className="add-btn">
              Add Product
            </button>
            <button className="add-btn" type="button" onClick={handleOpen}> trigger</button>
           
          </form>
        </div>
        <div className="big-preview-container"></div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="success-container">
            <div className="upper-suc">
            <FaRegCircleCheck />
            </div>
            <div className="lower-suc">
              <div className="suc-txt">
                <h1>Great!</h1>
                <p>Your Product has been created successfully.</p>
              </div>
              <Link className="suc-btn" to ="/">
                      Go to the home page
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ProductAdd;
