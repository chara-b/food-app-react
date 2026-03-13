/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/product.jsx";
import { useCallback, useMemo } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";

function ProductPage() {
  const fetchedProduct = useLoaderData();

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

  const actionBtns = useMemo(
    () => [
      {
        actionBtn: "save",
        buttonIcon: "fa-solid fa-floppy-disk",
        type: "submit",
      },
      { actionBtn: "cancel", buttonIcon: "fa-solid fa-x", type: "button" },
    ],
    [],
  );

  const handleSaveProduct = useCallback(
    (product) => {
      console.log("savedProduct: ", product);
      navigate(`mainpage/${user.email}`);
    },
    [navigate, user.email],
  );

  const handleCancelProduct = useCallback(
    (product) => {
      console.log("cancelProduct: ", product);
      navigate(`mainpage/${user.email}`);
    },
    [navigate, user.email],
  );

  const handleProduct = useCallback(
    (actionBtn, product) => {
      if (actionBtn === "save") handleSaveProduct(product);
      if (actionBtn === "cancel") handleCancelProduct(product);
    },
    [handleSaveProduct, handleCancelProduct],
  );

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product
        product={fetchedProduct}
        onClick={handleProduct}
        editable={true}
        actionBtns={actionBtns}
      />
    </div>
  );
}

export default ProductPage;
