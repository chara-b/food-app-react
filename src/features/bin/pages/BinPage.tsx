import { useBin } from "../hooks/useBin";
import Bin from "../components/bin";

function BinPage() {
  const { actionBtns, displayedProducts, searchText, disabledProductsCount } =
    useBin();

  return (
    <Bin
      actionBtns={actionBtns}
      displayedProducts={displayedProducts}
      searchText={searchText}
      disabledProductsCount={disabledProductsCount}
    ></Bin>
  );
}

export default BinPage;
