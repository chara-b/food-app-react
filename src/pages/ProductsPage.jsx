/* eslint-disable no-unused-vars */
// react
import { useEffect, useMemo } from "react";
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
// components

import ProductList from "../components/product-list.jsx";
import Spinner from "../components/spinner/spinner.jsx";
import Paginator from "../components/paginator.jsx";

// constants
import { perPage } from "../constants/paginator.js";
import { useProductsContext } from "../contexts/ProductsContext.jsx";

function ProductsPage() {
  const {
    filteredProducts,
    availableProducts,
    disabledProducts,
    searchText,
    availableProductsCount,
    disabledProductsCount,
    dispatchProducts,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
    setDisabledProducts,
  } = useProductsContext();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const location = useLocation();

  const fetchedDataLoaded = useLoaderData();
  console.log("fetchedDataLoaded ProductsPage", fetchedDataLoaded);

  const actionBtns = useMemo(
    () => [
      { actionBtn: "delete", buttonIcon: "fa-solid fa-trash", type: "button" },
      { actionBtn: "edit", buttonIcon: "fa-solid fa-edit", type: "button" },
    ],
    [],
  );

  useEffect(
    function () {
      dispatchProducts({
        type: "filteredProducts",
        payload: fetchedDataLoaded,
      });
    },
    [dispatchProducts, fetchedDataLoaded],
  );

  const productsCount = availableProductsCount
    ? availableProductsCount
    : fetchedDataLoaded.length;

  return (
    <>
      {!isLoading && location.pathname === "/products" && (
        <ProductList className="w-full" actionBtns={actionBtns} colsCount="1">
          <Paginator
            perPage={perPage}
            areDisabled={false}
            productsCount={productsCount}
          />
        </ProductList>
      )}
      {isLoading && <Spinner />}
    </>
  );
}

export default ProductsPage;
