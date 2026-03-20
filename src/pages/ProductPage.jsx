/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/product.jsx";
import { useCallback, useMemo } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";
import Button from "../components/button.jsx";

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
      <Product
        product={fetchedProduct}
        onClick={handleCancel}
        onSubmit={updateWholeProduct}
        editable={true}
      />
    </div>
  );
}

export default ProductPage;
