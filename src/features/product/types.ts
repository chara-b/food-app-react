import type { ActionBtn, DisplayedProduct } from "../../shared/types/types";

export type ProductListBinProps = {
  className: string;
  actionBtns: ActionBtn[];
  colsCount: string;
};

export type ProductListProps = { actionBtns: ActionBtn[]; colsCount: string };

export type ProductProps = {
  product: DisplayedProduct;
  editable?: boolean;
  actionBtns: ActionBtn[];
};
