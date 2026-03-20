/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import Button from "./button";

function Paginator({ perPage }) {
  const [current, setCurrent] = useState(1);

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

  const count = filteredProducts.length;
  const isLastPage = current + perPage > count;
  const start = current - 1;
  const end = !isLastPage ? current + perPage - 1 : current + (count - current);

  function handleNext() {
    setCurrent((curr) => curr + perPage);
    getAvailableProducts();
    const slicedProducts = filteredProducts.slice(start, end);
    dispatchProducts({ type: "filteredProducts", payload: slicedProducts });
  }

  function handlePrevious() {
    setCurrent((curr) => curr - perPage);
    getAvailableProducts();
    const slicedProducts = filteredProducts.slice(start, end);
    dispatchProducts({ type: "filteredProducts", payload: slicedProducts });
  }

  return (
    <div className="flex justify-between items-center bg-white">
      <p>{`Showing page ${current}-${end} of ${count}`}</p>
      <div className="flex gap-4">
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevious}
          disabled={current === 1 ? true : false}
        >
          <i className="fa-solid fa-angles-left"></i>
          Previous
        </Button>
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
          disabled={current + perPage - 1 >= count ? true : false}
        >
          Next
          <i className="fa-solid fa-angles-right"></i>
        </Button>
      </div>
    </div>
  );
}

export default Paginator;
