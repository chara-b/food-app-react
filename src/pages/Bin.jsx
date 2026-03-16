/* eslint-disable no-unused-vars */
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import Paginator from "../components/paginator";
import ProductListBin from "../components/product-list-bin";
import Spinner from "../components/spinner/spinner";
import { useEffect, useMemo, useState } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import { perPage } from "../constants/paginator.js";

function Bin() {
  const [current, setCurrent] = useState(0);

  function handleNext() {
    setCurrent((curr) => curr + perPage);
  }
  function handlePrevious() {
    setCurrent((curr) => curr - perPage);
  }

  const disabledProductsLoaded = useLoaderData();
  console.log("binData", disabledProductsLoaded);

  // const navigation = useNavigation();
  // const isLoading = navigation.state === "loading";

  // const location = useLocation();

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

  return (
    <ProductListBin className="w-full" actionBtns={actionBtns} colsCount="1">
      <Paginator
        count={disabledProductsLoaded.length}
        perPage={perPage}
        next={handleNext}
        previous={handlePrevious}
        current={current}
      />
    </ProductListBin>
  );
}

export default Bin;
