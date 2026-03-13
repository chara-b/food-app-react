/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Product from "./product.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import React, { useEffect } from "react";

const ProductList = React.memo(({ actionBtns, colsCount, children }) => {
  const {
    filteredProducts,
    availableProducts,
    searchText,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
  } = useProductsContext();

  const navigate = useNavigate();

  const handleEditedProduct = (editedProduct) => {
    console.log("editedProduct: ", editedProduct);
    navigate(`product/${editedProduct.id}`);
  };

  const handleProduct = async (actionBtn, product, updateProductFn) => {
    if (actionBtn === "delete") {
      updateProductFn({
        id: product.id,
        propToUpdate: "disabled",
        newValue: true,
      });
      getAvailableProducts();
    }

    if (actionBtn === "edit") {
      handleEditedProduct(product);
    }
  };

  useEffect(
    function () {
      handleFilteredProducts(availableProducts);
      // the app runs 2 pages with products list! one the main page and one for the bin !
      // so all if conditions here are necessary to distinguish between these 2 pages and their lists !
      if (searchText && !searchText?.trim()) {
        handleFilteredProducts(availableProducts);
      }

      // if (!searchText?.trim() && location.pathname.includes("bin")) {
      //   // filtered products get the all kind of fltered products even the disabled ones are meant to be
      //   // considered as filtered ! so we have 2 products state ! one for the available and one for the
      //   // all kind of filtered products either by searching via search bar or via the bin page !
      //   handleFilteredProducts(filteredProducts);
      // }

      if (searchText && searchText?.trim()) {
        const lowCaseSearchText = searchText.toLowerCase();
        const filteredResults = availableProducts.filter((product) =>
          product.title.toLowerCase().includes(lowCaseSearchText),
        );
        handleFilteredProducts(filteredResults);
      }

      // if (searchText?.trim() && location.pathname.includes("bin")) {
      //   const lowCaseSearchText = searchText.toLowerCase();
      //   const filteredResults = filteredProducts.filter((product) =>
      //     product.title.toLowerCase().includes(lowCaseSearchText),
      //   );
      //   handleFilteredProducts(filteredResults);
      // }
    },
    [availableProducts, filteredProducts, handleFilteredProducts, searchText],
  );

  let productsNum = filteredProducts.length;

  return productsNum ? (
    <>
      <ul
        className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
      >
        {filteredProducts.map((product) => {
          return (
            <Product
              product={product}
              key={product.id}
              onClick={handleProduct}
              actionBtns={actionBtns}
            />
          );
        })}
      </ul>
      {children}
    </>
  ) : (
    <ul
      className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
    >
      <li> "No Products found !"</li>
    </ul>
  );
});

export default ProductList;
