/* eslint-disable no-unused-vars */
import Product from "./product.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import React, { useEffect } from "react";

const ProductListBin = React.memo(
  ({ disabledProducts, actionBtns, colsCount, children }) => {
    const {
      filteredProducts,
      availableProducts,
      searchText,
      handleChangedSearchText,
      getDisabledProducts,
      getAvailableProducts,
      handleFilteredProducts,
    } = useProductsContext();

    const handleProduct = async (actionBtn, product, updateProductFn) => {
      if (actionBtn === "restore") {
        updateProductFn({
          id: product.id,
          propToUpdate: "disabled",
          newValue: false,
        });
        getDisabledProducts();
      }
    };

    useEffect(
      function () {
        handleFilteredProducts(disabledProducts);

        if (searchText && !searchText?.trim()) {
          // filtered products get the all kind of fltered products even the disabled ones are meant to be
          // considered as filtered ! so we have 2 products state ! one for the available and one for the
          // all kind of filtered products either by searching via search bar or via the bin page !
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
  },
);

export default ProductListBin;
