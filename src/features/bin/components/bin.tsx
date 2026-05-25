import type { BinProps } from "../types";

import Paginator from "../../paginator/components/paginator.js";

import { perPage } from "../../../constants/paginator.js";
import ProductListBin from "../../product/components/product-list-bin.tsx";

const Bin: React.FC<BinProps> = (props) => {
  return (
    <ProductListBin
      className="w-full"
      actionBtns={props.actionBtns}
      colsCount="1"
    >
      <Paginator
        perPage={perPage}
        areDisabled={true}
        productsCount={
          props.searchText
            ? props.displayedProducts.length
            : props.disabledProductsCount
        }
      />
    </ProductListBin>
  );
};

export default Bin;
