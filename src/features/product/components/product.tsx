/* eslint-disable no-unused-vars */
import React, { type PropsWithChildren } from "react";
import { useFormContext } from "../../../app/providers/FormContext.tsx";
import Button from "../../../shared/components/button.tsx";
import { useProductsContext } from "../../../app/providers/ProductsContext.tsx";
import { useNavigate } from "react-router-dom";
import { permanentlyRemoveProduct } from "../../../api/productsHTTPRequests.ts";
import type { ProductProps } from "../types.js";

const Product: React.FC<PropsWithChildren<ProductProps>> = React.memo(
  ({ product, editable, actionBtns, children }) => {
    const navigate = useNavigate();

    const { setFormState, setFormErrors, updateProductDetails } =
      useFormContext();

    const { getDisabledProducts, getAvailableProducts } = useProductsContext();

    const handleEditedProduct = (editedProduct) => {
      setFormState({});
      setFormErrors({});
      console.log("editedProduct: ", editedProduct);
      navigate(`product/${editedProduct.id}`, { replace: true });
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
      <li
        className={`${
          editable ? "flex-col md:flex-row" : ""
        } flex items-center gap-4 rounded-lg bg-blue-100 p-6 shadow-md outline outline-black/5`}
      >
        {children}

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
  }
);
export default Product;
