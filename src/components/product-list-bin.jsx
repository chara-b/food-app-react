/* eslint-disable no-unused-vars */
import Product from "./product.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import React, { useEffect, useRef } from "react";

const ProductListBin = React.memo(({ actionBtns, colsCount, children }) => {
  const {
    filteredProducts,
    availableProducts,
    disabledProducts,
    searchText,
    dispatchProducts,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
    setDisabledProducts,
  } = useProductsContext();

  const listRef = useRef(null);

  let productsNum = filteredProducts.length;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [filteredProducts]);

  return productsNum ? (
    <>
      <ul
        ref={listRef}
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
