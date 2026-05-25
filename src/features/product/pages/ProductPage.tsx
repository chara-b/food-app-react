/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/product.js";
import { useCallback, useMemo } from "react";
import { useFormContext } from "../contexts/FormContext.js";
import { useProductsContext } from "../contexts/ProductsContext.js";
import ProductForm from "../components/product-form.js";
import CardSection1 from "../components/card-section1.js";
import { editProductForm } from "../constants/formNames.js";

function ProductPage() {
  const fetchedProduct = useLoaderData();

  const navigate = useNavigate();

  const { updateWholeProductDetails } = useFormContext();

  const { getAvailableProducts, imageFile, imageBase64, onImageFileChange } =
    useProductsContext();

  const handleSubmit = useCallback(
    async (e, formRef) => {
      const submitted = await updateWholeProductDetails(
        e,
        formRef,
        imageBase64,
        fetchedProduct
      );
      if (submitted) {
        navigate(`/products`, { replace: true });
        await getAvailableProducts();
      }
    },
    [
      fetchedProduct,
      getAvailableProducts,
      imageBase64,
      navigate,
      updateWholeProductDetails,
    ]
  );

  const handleCancel = useCallback(() => {
    navigate(`/products`, { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product product={fetchedProduct} editable={true}>
        <CardSection1
          imgName={fetchedProduct.imgName}
          imageFile={imageFile}
          allowUploadPhoto={true}
          onChange={onImageFileChange}
        />
        <ProductForm
          product={fetchedProduct}
          formName={editProductForm}
          onClick={handleCancel}
          onSubmit={handleSubmit}
        />
      </Product>
    </div>
  );
}

export default ProductPage;
