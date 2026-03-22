/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import Button from "./button";

function Paginator({ perPage, areDisabled, productsCount }) {
  const {
    filteredProducts,
    availableProducts,
    searchText,
    availableProductsCount,
    disabledProductsCount,
    dispatchProducts,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    getProductsRangeForPagination,
    handleFilteredProducts,
    setDisabledProducts,
  } = useProductsContext();

  const [current, setCurrent] = useState(1);

  const isLastPage = current + perPage > productsCount;
  const isFirstPage = current === 1 ? true : false;
  const start = current - 1;
  const end = !isLastPage
    ? current + perPage - 1
    : current + (productsCount - current);

  useEffect(() => {
    async function firstPage() {
      await getProductsRangeForPagination(start, end, areDisabled);
    }
    firstPage();
  }, [current, disabledProductsCount, availableProductsCount]);

  async function handleNext() {
    setCurrent((prevCurrent) => prevCurrent + perPage);
  }

  async function handlePrevious() {
    setCurrent((prevCurrent) => prevCurrent - perPage);
  }

  return (
    <div className="flex justify-between items-center bg-white">
      <p>{`Showing page ${current}-${end} of ${productsCount}`}</p>
      <div className="flex gap-4">
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevious}
          disabled={isFirstPage}
        >
          <i className="fa-solid fa-angles-left"></i>
          Previous
        </Button>
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
          disabled={isLastPage}
        >
          Next
          <i className="fa-solid fa-angles-right"></i>
        </Button>
      </div>
    </div>
  );
}

export default Paginator;
