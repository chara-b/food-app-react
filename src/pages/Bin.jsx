/* eslint-disable no-unused-vars */
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import Paginator from "../components/paginator";
import ProductListBin from "../components/product-list-bin";
import Spinner from "../components/spinner/spinner";
import { useEffect, useMemo, useState } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import { perPage } from "../constants/paginator.js";

function Bin() {
  const disabledProductsLoaded = useLoaderData();
  console.log("binData", disabledProductsLoaded);

  const actionBtns = useMemo(
    () => [
      {
        actionBtn: "restore",
        buttonIcon: "fa-solid fa-arrow-rotate-left",
        type: "button",
      },
      {
        actionBtn: "remove",
        buttonIcon: "fa-solid fa-trash",
        type: "button",
      },
    ],
    [],
  );

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

  useEffect(
    function () {
      handleFilteredProducts(disabledProductsLoaded);
      setDisabledProducts(disabledProductsLoaded);
      console.log("disabledProductsSet", disabledProducts);
    },
    [
      disabledProducts,
      disabledProductsLoaded,
      handleFilteredProducts,
      setDisabledProducts,
    ],
  );

  const productsCount = disabledProductsCount
    ? disabledProductsCount
    : disabledProductsLoaded.length;

  return (
    <ProductListBin className="w-full" actionBtns={actionBtns} colsCount="1">
      <Paginator
        perPage={perPage}
        areDisabled={true}
        productsCount={productsCount}
      />
    </ProductListBin>
  );
}

export default Bin;
