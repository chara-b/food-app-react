import Button from "./button";

function Paginator({ count, perPage, next, previous, current }) {
  return (
    <div className="flex justify-between items-center bg-white">
      <p>{`Showing page ${current + 1}-${current + perPage} of ${count}`}</p>
      <div className="flex gap-4">
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={previous}
          disabled={current + 1 === 1 ? true : false}
        >
          <i className="fa-solid fa-angles-left"></i>
          Previous
        </Button>
        <Button
          type="button"
          styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={next}
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
