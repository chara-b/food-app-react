/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/product.jsx";
import { useCallback, useMemo } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import EditProductForm from "../components/edit-product-form.jsx";
import CardSection1 from "../components/card-section1.jsx";

function ProductPage() {
  const fetchedProduct = useLoaderData();

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

  const updateWholeProduct = useCallback(
    async (e, formRef) => {
      const submitted = await updateWholeProductDetails(
        e,
        formRef,
        fetchedProduct,
      );
      if (submitted) {
        navigate(`/products`, { replace: true });
        await getAvailableProducts();
      }
    },
    [fetchedProduct, getAvailableProducts, navigate, updateWholeProductDetails],
  );

  const handleCancel = useCallback(() => {
    navigate(`/products`, { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product product={fetchedProduct} editable={true}>
        <CardSection1 imgName={fetchedProduct.imgName} />
        <EditProductForm
          product={fetchedProduct}
          onClick={handleCancel}
          onSubmit={updateWholeProduct}
        />
      </Product>
    </div>
  );
}

export default ProductPage;
