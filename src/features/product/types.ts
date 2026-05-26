import type { ActionBtn, DisplayedProduct } from "../../shared/types/types";

export type ProductFormProps = {
  product: DisplayedProduct;
  formName: string;
  onClick: () => void;
  onSubmit: () => void;
};

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

export type NewInputDetails = {
  label: string;
  value: string;
  type: string;
};
