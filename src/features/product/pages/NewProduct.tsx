/* eslint-disable no-unused-vars */
import { memo, useCallback, useRef, useState } from "react";
import { useFormContext } from "../contexts/FormContext.js";
import { useProductsContext } from "../contexts/ProductsContext.js";
import { newProductForm } from "../constants/formNames.js";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/product-form.js";
import { productData } from "../constants/productData.js";
import CardSection1 from "../components/card-section1.js";
import Product from "../components/product.js";

const NewProduct = memo(() => {
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

  const { getAvailableProducts, imageFile, imageBase64, onImageFileChange } =
    useProductsContext();

  const handleSubmit = useCallback(
    async (e, formRef) => {
      const submitted = await submitNewProduct(e, formRef, imageBase64);
      if (submitted) {
        await getAvailableProducts();
        navigate(`/products`, { replace: true });
      }
    },
    [getAvailableProducts, imageBase64, navigate, submitNewProduct],
  );

  const handleCancel = useCallback(() => {
    navigate(`/products`, { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product editable={true}>
        <CardSection1
          imgName={""}
          imageFile={imageFile}
          allowUploadPhoto={true}
          onChange={onImageFileChange}
        />
        <ProductForm
          product={productData}
          formName={newProductForm}
          onClick={handleCancel}
          onSubmit={handleSubmit}
        />
      </Product>
    </div>
  );
});

export default NewProduct;
