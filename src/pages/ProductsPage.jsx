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
    displayedProducts,
    searchText,
    availableProductsCount,

    dispatchProducts,
  } = useProductsContext();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const location = useLocation();

  const availableDataLoaded = useLoaderData();
  console.log("availableDataLoaded ProductsPage", availableDataLoaded);

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
        type: "displayedProducts",
        payload: availableDataLoaded,
      });
      dispatchProducts({
        type: "availableProductsCount",
        payload: availableDataLoaded.length,
      });
    },
    [dispatchProducts, availableDataLoaded],
  );

  return (
    <>
      {!isLoading && location.pathname === "/products" && (
        <ProductList className="w-full" actionBtns={actionBtns} colsCount="1">
          <Paginator
            perPage={perPage}
            areDisabled={false}
            productsCount={
              searchText ? displayedProducts.length : availableProductsCount
            }
          />
        </ProductList>
      )}
      {isLoading && <Spinner />}
    </>
  );
}

export default ProductsPage;
