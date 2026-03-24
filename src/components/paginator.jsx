/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import Button from "./button";

function Paginator({ perPage, areDisabled, productsCount }) {
  const {
    displayedProducts,
    searchText,
    availableProductsCount,
    disabledProductsCount,
    dispatchProducts,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    getProductsRangeForPagination,
    handleDisplayedProducts,
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
    async function pageRange() {
      // if the last item of the last page is deleted or restored then the paginator must display the
      // previous page products!
      if (productsCount && current > productsCount) {
        setCurrent((prevCurrent) => prevCurrent - perPage);
      }
      // if we type a keyword to search then the paginator must paginate the searched results and not
      // call the api to get the paginated data!
      if (searchText) {
        const result = displayedProducts.slice(start, end);
        dispatchProducts({ type: "displayedProducts", payload: result });
        return;
      } else {
        await getProductsRangeForPagination(start, end, areDisabled);
      }
    }

    // kai na sbiso an boro ta disabledProductsCount, availableProductsCount
    // na kano dinamiki tin edit form na rendaretai me ola ta pedia old + new, xoris
    // to prefix tis formas na apothikeuetai kai na balo tin idia forma kai sto add new product
    pageRange();
  }, [current, searchText, disabledProductsCount, availableProductsCount]);

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
