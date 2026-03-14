/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/product.jsx";
import { useCallback, useMemo } from "react";
import { useFormContext } from "../contexts/FormContext.jsx";
import { useProductsContext } from "../contexts/ProductsContext.jsx";

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

  const submitProduct = useCallback(
    async (e, formRef) => {
      const submitted = await updateProductDetails(e, formRef);
      if (submitted) {
        navigate(`/mainpage/${user.email.split("@")[0]}`);
        await getAvailableProducts();
      }
    },
    [getAvailableProducts, navigate, updateProductDetails, user.email],
  );

  function handleCancel() {
    navigate(`/mainpage/${user.email.split("@")[0]}`);
  }

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product
        product={fetchedProduct}
        onClick={handleCancel}
        onSubmit={submitProduct}
        editable={true}
      />
    </div>
  );
}

export default ProductPage;
