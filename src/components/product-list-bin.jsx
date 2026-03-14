/* eslint-disable no-unused-vars */
import Product from "./product.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import React, { useEffect } from "react";

const ProductListBin = React.memo(({ actionBtns, colsCount, children }) => {
  const {
    filteredProducts,
    availableProducts,
    disabledProducts,
    searchText,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
  } = useProductsContext();

  useEffect(
    function () {
      // handleFilteredProducts(disabledProducts);

      if (searchText && !searchText?.trim()) {
        handleFilteredProducts(disabledProducts);
      }

      if (searchText && searchText?.trim()) {
        const lowCaseSearchText = searchText.toLowerCase();
        const filteredResults = disabledProducts.filter((product) =>
          product.title.toLowerCase().includes(lowCaseSearchText),
        );
        handleFilteredProducts(filteredResults);
      }
    },
    [disabledProducts, filteredProducts, handleFilteredProducts, searchText],
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

export default ProductListBin;
