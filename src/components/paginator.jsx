import { useState } from "react";
import Button from "./button";

function Paginator({ count, perPage }) {
  const [current, setCurrent] = useState(0);

  function handleNext() {
    setCurrent((curr) => curr + perPage);
  }
  function handlePrevious() {
    setCurrent((curr) => curr - perPage);
  }

  return (
    <div className="flex justify-between items-center">
      <p>{`Showing page ${current + 1}-${current + perPage} of ${count}`}</p>
      <div className="flex gap-4">
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevious}
          disabled={current + 1 === 1 ? true : false}
        >
          <i className="fa-solid fa-angles-left"></i>
          Previous
        </Button>
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
          disabled={current + 1 + perPage - 1 === count ? true : false}
        >
          Next
          <i className="fa-solid fa-angles-right"></i>
        </Button>
      </div>
    </div>
  );
}

export default Paginator;
