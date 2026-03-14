/* eslint-disable no-unused-vars */
import React from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import Button from "./button";
import CardSection1 from "./card-section1.jsx";
import CardSection2 from "./card-section2.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import { useNavigate } from "react-router-dom";

const Product = React.memo(({ product, onClick, editable, actionBtns }) => {
  const navigate = useNavigate();

  const {
    formState,
    formErrors,
    isFormValid,
    onChange,
    user,
    isAuthenticated,
    logout,
    submitLogin,
    submitNewProduct,
    updateProductDetails,
    submitNewInputFields,
  } = useFormContext();

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

  const handleEditedProduct = (editedProduct) => {
    console.log("editedProduct: ", editedProduct);
    navigate(`product/${editedProduct.id}`);
  };

  const handleProduct = async (actionBtn, product) => {
    if (actionBtn === "delete") {
      updateProductDetails({
        id: product.id,
        propToUpdate: "disabled",
        newValue: true,
      });
      getAvailableProducts();
    }
    if (actionBtn === "restore") {
      updateProductDetails({
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

  return (
    <li className="flex items-center gap-4 rounded-lg bg-blue-100 p-6 shadow-md outline outline-black/5">
      <CardSection1 imgName={product.imgName} />
      <CardSection2
        editable={editable}
        product={product}
        onClick={onClick}
        actionBtns={actionBtns}
      />
      {actionBtns.length &&
        !editable &&
        actionBtns?.map(({ actionBtn, buttonIcon }, i) => {
          return (
            <Button
              id={`${actionBtn}-${i}`}
              styles="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              key={i}
              onClick={() => handleProduct(actionBtn, product)}
              type="button"
            >
              <i className={buttonIcon}></i>
            </Button>
          );
        })}
    </li>
  );
});
export default Product;
