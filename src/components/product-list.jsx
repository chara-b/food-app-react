/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Product from "./product.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import React, { useEffect } from "react";

const ProductList = React.memo(
  ({ actionBtns, searchText, colsCount, children }) => {
    const {
      filteredProducts,
      availableProducts,
      disabledProducts,
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
      if (actionBtn === "restore") {
        updateProductFn({
          id: product.id,
          propToUpdate: "disabled",
          newValue: false,
        });
        getDisabledProducts();
      }
      if (actionBtn === "edit") {
        handleEditedProduct(product);
      }
    };

    useEffect(
      function () {
        if (!searchText?.trim()) {
          handleFilteredProducts(availableProducts);
        }

        if (searchText?.trim()) {
          const lowCaseSearchText = searchText.toLowerCase();
          const filteredResults = availableProducts.filter((product) =>
            product.title.toLowerCase().includes(lowCaseSearchText),
          );
          handleFilteredProducts(filteredResults);
        }
      },
      [availableProducts, handleFilteredProducts, searchText],
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

export default ProductList;
