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
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
  } = useProductsContext();

  const updateWholeProduct = useCallback(
    async (e, formRef) => {
      const submitted = await updateWholeProductDetails(
        e,
        formRef,
        fetchedProduct,
      );
      if (submitted) {
        navigate(`/mainpage/${user.email.split("@")[0]}`);
        await getAvailableProducts();
      }
    },
    [
      fetchedProduct,
      getAvailableProducts,
      navigate,
      updateWholeProductDetails,
      user.email,
    ],
  );

  const handleCancel = useCallback(() => {
    navigate(`/mainpage/${user.email.split("@")[0]}`);
  }, [navigate, user.email]);

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
