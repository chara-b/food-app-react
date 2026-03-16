/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import Button from "./button";
import CardSection1 from "./card-section1.jsx";
import CardSection2 from "./card-section2.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import { useNavigate } from "react-router-dom";
import { permanentlyRemoveProduct } from "../services/productsHTTPRequests.js";

const Product = React.memo(
  ({ product, onClick, onSubmit, editable, actionBtns }) => {
    const navigate = useNavigate();

    const {
      formState,
      setFormState,
      formErrors,
      setFormErrors,
      isFormValid,
      onChange,
      user,
      isAuthenticated,
      logout,
      submitLogin,
      submitNewProduct,
      updateProductDetails,
      updateWholeProductDetails,
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
      setFormState({});
      setFormErrors({});
      console.log("editedProduct: ", editedProduct);
      navigate(`product/${editedProduct.id}`);
    };

    const handleProduct = async (actionBtn, product) => {
      if (actionBtn === "delete") {
        await updateProductDetails({
          id: product.id,
          propToUpdate: "disabled",
          newValue: true,
        });
        await getAvailableProducts();
      }
      if (actionBtn === "restore") {
        await updateProductDetails({
          id: product.id,
          propToUpdate: "disabled",
          newValue: false,
        });
        await getDisabledProducts();
      }
      if (actionBtn === "edit") {
        handleEditedProduct(product);
      }
      if (actionBtn === "remove") {
        console.log("permanently removed product:", product);
        await permanentlyRemoveProduct(product);
        await getDisabledProducts();
      }
    };

    return (
      <li className="flex items-center gap-4 rounded-lg bg-blue-100 p-6 shadow-md outline outline-black/5">
        <CardSection1 imgName={product.imgName} />
        <CardSection2
          editable={editable}
          product={product}
          onClick={onClick}
          onSubmit={onSubmit}
          actionBtns={actionBtns}
        />
        {actionBtns?.length &&
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
  },
);
export default Product;
