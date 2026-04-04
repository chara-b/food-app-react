/* eslint-disable no-unused-vars */
import { memo, useCallback, useRef } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import { Button } from "@headlessui/react";
import { useCustomModalContext } from "../contexts/CustomModalContext.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import { newProductForm } from "../constants/formNames.js";
import Form from "../components/form.jsx";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/product-form.jsx";
import { productData } from "../constants/productData.js";
import CardSection1 from "../components/card-section1.jsx";
import Product from "../components/product.jsx";

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

  const { getAvailableProducts } = useProductsContext();

  const handleSubmit = useCallback(
    async (e, formRef) => {
      const submitted = await submitNewProduct(e, formRef);
      if (submitted) {
        await getAvailableProducts();
        navigate(`/products`, { replace: true });
      }
    },
    [getAvailableProducts, navigate, submitNewProduct],
  );

  const handleCancel = useCallback(() => {
    navigate(`/products`, { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product editable={true}>
        <CardSection1 imgName={""} />
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
