import Paginator from "../components/paginator";

function Bin() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full h-screen">Bin</div>
      <Paginator count={10} perPage={5} />
    </>
  );
}

export default Bin;
